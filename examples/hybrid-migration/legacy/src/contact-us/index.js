'use strict';

var angular = require('angular');

module.exports = angular
  .module('contact-us', [require('angular-ui-router')])

  .config(require('./contact-us.config')).name;
