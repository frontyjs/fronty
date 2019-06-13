import AppContext from './app-context.js';

const hashChangePostMessageScript = /** js */ `
  ;(function () {
    let HASH_IN_SYNC = false;
    if (window.parent) window.addEventListener('hashchange', (e) => {
      if (HASH_IN_SYNC) return;
      window.parent.postMessage({
        type: 'hashchange',
        payload: {
          oldURL: e.oldURL,
          newURL: e.newURL
        }
      }, '*');
    });

    window.addEventListener('message', (messageEvent) => {
      if (messageEvent && messageEvent.data && messageEvent.data.type === 'internal-route-changed') {
        const newRoute = messageEvent.data.payload.route;
        HASH_IN_SYNC = true;
        window.location.hash = newRoute;
        HASH_IN_SYNC = false;
      }
    });
    
    window.addEventListener('mousedown', () => {
      window.parent.postMessage({
        type: 'frame-mouse-down'
      }, '*');
    });
  })();
  `;
const hashChangeNotifierSnippet = document.createElement('script');
hashChangeNotifierSnippet.appendChild(
	document.createTextNode(hashChangePostMessageScript)
);

export class MFEContainer extends HTMLIFrameElement {
	constructor() {
		super();

		this.injections = {};

		/**
		 * @private
		 * @type {boolean}
		 */
		this._isLoaded = false;

		/**
		 * @private
		 * @type {boolean}
		 */
		this._isLoading = false;

		this.sandbox.add('allow-same-origin');
		this.sandbox.add('allow-scripts');
		this.sandbox.add('allow-popups');
		this.sandbox.add('allow-forms');

		/**
		 * @type {boolean}
		 */
		this.allowFullscreen = true;

		this._isFriendly = false;

		/**
		 * @type {object}
		 */
		this.resource = undefined;

		/** @type {string|undefined} */
		this._currentBaseUrl = undefined;

		this.addEventListener('mousedown', () =>
			window.dispatchEvent(new Event('frame-mouse-down'))
		);
	}

	static get Injections() {
		return {
			AppContext
		};
	}

	async unload() {
		if (!this.contentDocument || !this.contentWindow) {
			return;
		}
		this._isLoading = true;
		this.contentDocument.body.innerHTML = this.contentDocument.head.innerHTML =
			'';
		this._isLoading = false;
		this._isLoaded = false;
		this._currentBaseUrl = undefined;
	}

	/**
	 *
	 * @param {string} url
	 * @param {string} windowHash
	 * @param {boolean} strict
	 */
	async load(url, windowHash, strict = false) {
		const { contentDocument, contentWindow } = this;
		if (!contentDocument || !contentWindow) {
			return;
		}
		// @ts-ignore
		await window.appShellReady;
		this._isFriendly = !strict;
		if (this._currentBaseUrl === url || !url) {
			return;
		}
		this._currentBaseUrl = url;
		if (this._isLoading || !this._currentBaseUrl) {
			return;
		}
		this._isLoading = true;
		if (strict) {
			contentWindow.location.replace(url);
			this._isLoaded = true;
			return;
		}
		if (url) {
			const payload = await fetch(url, {
				mode: 'cors',
				referrerPolicy: 'origin-when-cross-origin'
			});
			const text = await payload.text();
			const doc = document.implementation.createHTMLDocument();
			doc.documentElement.innerHTML = text;
			const baseEl = doc.createElement('base');
			baseEl.href = url;
			doc.head.insertBefore(baseEl, doc.head.firstElementChild);
			doc.head.appendChild(hashChangeNotifierSnippet.cloneNode(true));
			if (windowHash) {
				contentWindow.location.hash = windowHash;
			}
			try {
				contentDocument.write(doc.documentElement.innerHTML);
				contentDocument.close();
				setTimeout(() => {
					contentWindow.location.hash = window.location.hash;
				});
				const injections = {
					...this.injections,
					// @ts-ignore
					...this.constructor.Injections
				};
				Object.entries(injections).forEach(([key, value]) => {
					try {
						// @ts-ignore
						contentWindow[key] = value;
					} catch (err) {
						console.warn('Could not inject ' + key);
						console.info(err);
					}
				});
			} catch (err) {}
			contentWindow.addEventListener('hashchange', e => {
				e.preventDefault();
				e.stopPropagation();
				this.dispatchEvent(
					new CustomEvent('internal-route-changed', {
						bubbles: true,
						detail: e
					})
				);
			});
			contentWindow.onbeforeunload = e => {
				this.dispatchEvent(
					new CustomEvent('internal-route-changed', {
						bubbles: true,
						detail: e
					})
				);
			};
			setTimeout(() => {
				this._isLoading = false;
				this._isLoaded = true;
			});
		}
	}

	/**
	 *
	 * @param {string} hash
	 */
	setHashByPostMessage(hash) {
		const { contentWindow } = this;
		contentWindow &&
			contentWindow.postMessage(
				{
					type: 'internal-route-changed',
					payload: {
						route: hash
					}
				},
				'*'
			);
	}

	/**
	 *
	 * @param {string} hash
	 */
	setHash(hash) {
		const { contentWindow } = this;
		if (!contentWindow) return;
		if (!this._isLoaded) {
			return;
		}
		if (this._isFriendly) {
			try {
				contentWindow.location.hash = hash;
			} catch (err) {
				this.setHashByPostMessage(hash);
			}
		} else {
			this.setHashByPostMessage(hash);
		}
	}

	get isLoaded() {
		return this._isLoaded;
	}
}

customElements.define('fronty-app-base-container', MFEContainer);
