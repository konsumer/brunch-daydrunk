'use strict';

/**
 * app that handles server-side static pages for authenication stuff
 */

require('./betterErrors');

angular.module('app', [
	'ui.bootstrap',
	'ui.gravatar'
])

app.controller('HeaderCtl', require('./controllers/header'));
app.controller('MainCtl', require('./controllers/main'));
app.controller('ModalLoginCtl', require('./controllers/modal_login'));
app.controller('ModalRegisterCtl', require('./controllers/modal_register'));
app.controller('LoginCtl', require('./controllers/login'));
app.controller('RegisterCtl', require('./controllers/register'));
app.controller('TokenCtl', require('./controllers/token'));