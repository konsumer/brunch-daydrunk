'use strict';

/**
 * Main site app
 */

require('./betterErrors');

angular.module('controllers', []);
require('./controllers/header');
require('./controllers/index');

angular.module('directives', []);

angular.module('filters', []);

angular.module('services', []);

angular.module('app', [
    'ui.bootstrap',
    'ngRoute',
    'controllers',
    'directives',
    'filters',
    'services'
])

.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl'
    })

    .otherwise({
        redirectTo: '/'
    });
})