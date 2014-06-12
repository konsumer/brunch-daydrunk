/**
 * Simple MIME/text emails from templates using mailgun
 */

var fs = require('fs'),
	path = require('path'),
	ejs = require('ejs'),
	Mailgun = require('mailgun-js');

if (!process.env.MAILGUN_DOMAIN && process.env.MAILGUN_SMTP_LOGIN){
	process.env.MAILGUN_DOMAIN = process.env.MAILGUN_SMTP_LOGIN.split('@').pop();
	console.log('Mail domain inferred as ' + process.env.MAILGUN_DOMAIN + ', set MAILGUN_DOMAIN environment variable to override this.');
}

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN){
	console.log('Please set MAILGUN_API_KEY & MAILGUN_DOMAIN environment variables. If you are using heroku, the command is: heroku addons:add mailgun && heroku config:pull --overwrite --interactive');
	process.exit(1);
}

if (!process.env.MAIL_FROM_ADDRESS){
	console.log('MAIL_FROM_ADDRESS environment variable is set to ' + process.env.MAILGUN_SMTP_LOGIN + '.  Feel free to override MAIL_FROM_ADDRESS, to customize the email address that mail is sent from.');
	process.env.MAIL_FROM_ADDRESS = process.env.MAILGUN_SMTP_LOGIN;
}

var mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

// pre-cache message templates as functions
var messages = {};
fs.readdirSync(path.join(__dirname, 'views', 'email')).forEach(function(file) {
    fs.readFile(path.join(__dirname, 'views', 'email', file), function read(er, data) {
		if (er) return console.log(er);
		var fname = path.basename(file, '.ejs').split('.');
		var name = fname.shift();
		var type = fname.pop();
		messages[ name ] = messages[ name ] || {};
		messages[ name ][ type ] = ejs.compile(data.toString());
	});
});


/**
 * Send an email using mailgun & a template
 * @param  {Object}   options `to`, and `template` are mandatory. `from` defaults to `MAIL_FROM_ADDRESS`
 *                            `template` is the basename of the templates in views/email
 *                            everything else is usable as template-vars
 * @param  {Function} cb      callback(error, response, body)
 */
module.exports = function(options, cb){
	var message = {
		from: options.from || process.env.MAIL_FROM_ADDRESS,
		to: options.to,
		subject: options.subject || 'No Subject',
		body: messages[options.template].txt(options),
		html: messages[options.template].html(options)
	};
	console.log('sent email to', message.to, '"' + message.subject + '"');
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
