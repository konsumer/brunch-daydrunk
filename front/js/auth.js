'use strict';

/**
 * app that handles server-side static pages for authenication stuff
 */

require('./betterErrors');
require('./modalLinks');

angular.module('controllers', []);
require('./controllers/main');
require('./controllers/header');
require('./controllers/login');
require('./controllers/register');
require('./controllers/token');
require('./controllers/modal_login');
require('./controllers/modal_register');

angular.module('directives', []);

angular.module('filters', []);

angular.module('services', []);

angular.module('app', [
	'ui.bootstrap',
	'ui.gravatar',
    'controllers',
    'directives',
    'filters',
    'services'
])