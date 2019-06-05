'use strict';

var angular = require('angular');

module.exports = angular
	.module('home', [require('angular-ui-router')])

	.config(require('./home.config'))

	.controller('HomeCtrl', require('./home.ctrl')).name;
