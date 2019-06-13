// @ts-check

/**
 @license
 Copyright (c) 2018 Multiple Contributors (see: https://github.com/frontyjs/fronty/blob/master/.all-contributorsrc)
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import AppContext from './app-context.js';
import { MFEContainer } from './mfe-container.js';

export { MFEContainer };
  
export class AppShellBase extends HTMLElement {
	constructor() {
		super();

		/**
		 * @type string
		 */
		this.currentRoute;

		window.addEventListener('hashchange', e => this.onRouteChange(e));
	}

	/**
	 * @abstract
	 * @param {HashChangeEvent|undefined} e
	 */
	async onRouteChange(e = undefined) {
		e && e.preventDefault();
		await shellReady;
		/** @type {Promise<void>[]} */
		const loadingStatus = [];
		const newHash = window.location.hash;
		const routeIndex = newHash.indexOf('#/') + 1 || newHash.indexOf('#') + 1;
		if (routeIndex) {
			let newRoute;
			const fullRoute = newHash.slice(routeIndex + 1);
			const nextSlashIndicator = fullRoute.indexOf('/');
			newRoute = fullRoute.slice(
				0,
				nextSlashIndicator >= 0 ? nextSlashIndicator : undefined
			);
			if (this.currentRoute === newRoute) {
				return;
			}
			this.currentRoute = newRoute;
		}

		// get configuration
		const routes = AppContext.getRoutes();
		const routeInfo = routes[this.currentRoute || '*'] ||
			routes['*'] || { apps: [] };
		const activeAppsNames = routeInfo.apps;
		const allAppContainers = this.appContainers;
		const appFrames = allAppContainers.reduce(
			(info, container) => {
				const appId = String(container.getAttribute('app-id'));
				if (activeAppsNames.includes(appId)) {
					info.active.push(container);
				} else {
					info.inactive.push(container);
				}
				return info;
			},
			{
				/** @type {MFEContainer[]} */
				active: [],
				/** @type {MFEContainer[]} */
				inactive: []
			}
		);
		appFrames.inactive.forEach(container => {
			container.setAttribute('route', '---');
		});
		appFrames.active.forEach(container => {
			const appName = container.getAttribute('app-id');
			if (appName) {
				const appInfo = AppContext.getApp(appName);
				loadingStatus.push(
					container.load(appInfo.url, newHash, appInfo.external)
				);
				container.setAttribute('route', this.currentRoute);
			}
		});
		Promise.all(loadingStatus).then(() => this.syncRoutes(e));
		this.setAttribute('route', this.currentRoute);
		document.body.setAttribute('route', this.currentRoute);
	}

	/**
	 * @param {HashChangeEvent|undefined} e
	 */
	syncRoutes(e) {
		if (e) {
			this.appContainers.forEach((/** @type MFEContainer */ container) => {
				if (container._isLoaded) {
					container.setHash(window.location.hash);
				}
			});
		}
	}

	/**
	 * @returns {InstanceType<MFEContainer>[]}
	 */
	get appContainers() {
    return Array
      .from(this.querySelectorAll('iframe[app-id]'))
      .filter(element => element instanceof MFEContainer);
	}

	/**
	 * @param {string} routeBase
	 * @param {import('./app-context.js').RouteInfo} routeInfo
	 */
	addRoute(routeBase, routeInfo) {
		AppContext.getRoutes()[routeBase] = routeInfo;
	}

	connectedCallback() {
		setTimeout(() => {
			window.onmessage = (/** @type MessageEvent */ messageEvent) => {
				try {
					const { newURL } = messageEvent.data.payload;
					const hashIdx = newURL.indexOf('#');
					if (hashIdx > 0) {
						const locationHash = newURL.slice(hashIdx);
						window.location.hash = locationHash;
					} else {
						window.location = newURL;
					}
				} catch (err) {}
			};
			shellReady();
			this.onRouteChange();
		});
	}
}

customElements.define('fronty-shell-application', AppShellBase);

/**
 * @type {Function}
 */
let shellReady;

// @ts-ignore
window.appShellReady = new Promise(resolve => {
	shellReady = resolve;
});
