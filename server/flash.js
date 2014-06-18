var flash = require('connect-flash')

module.exports = function(app){
	// flash messages
	app.use(flash());

	// flash message & redirect or send JSON
	app.use(function(req, res, next){
	    res.message = function(message, type, redirect){
	        type = type || 'info';
	        if (req.xhr) {
	            if (type == 'error'){
	                return res.send(500, {message:{type:type, text:message}});
	            }
	            return res.send({message:{type:type, text:message}});
	        }

	        req.flash(type, message);

	        if (redirect !== ''){
	            res.redirect(redirect || '/');
	        }
	    };
	    next();
	});
};