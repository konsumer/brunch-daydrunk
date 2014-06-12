/**
 * Simple MIME emails from templates using mailgun
 */

var fs = require('fs'),
	path = require('path'),
	glob = require('glob'),
	Handlebars = require('handlebars'),
	extend = require('util')._extend,
	Mailgun = require('mailgun-js');

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN){
	console.log('Please set MAILGUN_API_KEY & MAILGUN_DOMAIN environment variables.');
	process.exit(1);
}

var mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

// pre-cache message templates
var messages = {};
glob(path.join(__dirname, 'views', 'email', '*'), function(er, files){
	if (er) return console.log(er);
	files.forEach(function(file){
		fs.readFile(file, function read(er, data) {
			if (er) return console.log(er);
			var name = path.basename(file).split('.').slice(0,-1).join('');
			messages[ name ] = messages[ name ] || {};
			messages[ name ][ path.extname(file).replace('.','') ] = Handlebars.compile(data + '');
		});
	});
});

/**
 * Send an email using mailgun & a template
 * @param  {Object}   options from, to, and template are mandatory. template is the basename of the templates in views/email
 * @param  {Function} cb      callback(error, response, body)
 */
module.exports = function(options, cb){
	var message = {
		from: options.from || process.env.MAIL_FROM_ADDRESS || process.env.MAILGUN_SMTP_LOGIN,
		to: options.to,
		subject: options.subject,
		body: messages[options.template].txt(options),
		html: messages[options.template].html(options)
	};
	console.log('sent email', options)
	mailgun.messages().send(message, cb);
}

/**
 * add a user to a mailgun mailing-list
 * @param  {String} list Email address of the list
 * @param  {String} to   Recipient email
 * @param  {String} name Recipient name
 * @param  {Object} vars extra stuff to store with the transaction
 * @param  {Function} cb callback(error, response, body)
 */
module.exports.list = function(list, to, name, vars, cb){
	mailgun.lists(list).members().create({address:to, name:name, subscribed:true, vars:vars}, cb);
}
