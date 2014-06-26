'use strict';

/**
 * Main site app
 */

require('./betterErrors');

var app = angular.module('app', [
    'ui.bootstrap',
    'ui.gravatar',
    'ngRoute',
]);

app.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'IndexCtl'
    })

    .otherwise({
        redirectTo: '/'
    });
});

app.controller('HeaderCtl', require('./controllers/header'));
app.controller('MainCtl', require('./controllers/main'));
app.controller('IndexCtl', require('./controllers/index'));
app.controller('ModalLoginCtl', require('./controllers/modal_login'));
app.controller('ModalRegisterCtl', require('./controllers/modal_register'));