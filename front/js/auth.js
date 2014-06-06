'use strict';

/**
 * this handles server-side static pages for authenication
 */

require('./betterErrors');

angular.module('controllers', []);
require('./controllers/login');
require('./controllers/register');

angular.module('directives', []);

angular.module('filters', []);

angular.module('services', []);

angular.module('app', [
    'controllers',
    'directives',
    'filters',
    'services'
])