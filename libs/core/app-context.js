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

/**
 * @typedef AppInfo
 * @property {string} url
 * @property {boolean} [external]
 */

/**
 * @typedef RouteInfo
 * @property {string[]} apps
 * @property {any} [data]
 */

/**
 * @type {Object<string, RouteInfo>}
 */
const routes = {};

/**
 * @type {Object<string, any>}
 */
const config = {};

/**
 * @type {Object<string, AppInfo>}
 */
const apps = {};

/**
 * @singleton
 */
const AppContext = {
	getRoutes: () => routes,

	/**
	 * @param {string} key
	 * @return {object}
	 */
	getConfig: key => config[key],

	/**
	 * @param {string} key
	 * @param {*} value
	 * @return {object}
	 */
	config: (key, value) => (config[key] = value),

	/**
	 * @param {string} name
	 * @param {AppInfo} data
	 * @return {object}
	 */
	addApp: (name, data) => (apps[name] = data),

	/**
	 * @param {string} name
	 * @return {AppInfo}
	 */
	getApp: name => apps[name],

	listApps: () => Object.keys(apps)
};

// noinspection JSUnusedGlobalSymbols
export default AppContext;
