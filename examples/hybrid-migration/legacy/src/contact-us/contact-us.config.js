'use strict';

/* @ngInject */
function contactUsConfig($stateProvider) {
	$stateProvider.state('contact-us', {
		url: '/contact-us',
		template: require('./contact-us.html').default
	});

	console.log('contactUsConfig loaded');
}

module.exports = contactUsConfig;
