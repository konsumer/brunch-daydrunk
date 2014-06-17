var express = require('express'),
    session = require('express-session'),
    app = express(),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongostore')(session),
    path = require('path'),
    fs = require('fs'),
    serveStatic = require('serve-static'),
    flash= require('connect-flash'),
    logger = require('morgan');

// load config
if (fs.existsSync(path.join(__dirname, '..', '.env'))) {
    var env = require('node-env-file');
    env('.env');
}

if (!process.env.SITE_NAME){
    process.env.SITE_NAME='Demo Site';
    console.log('Set SITE_NAME environment variable to configure the name of your site for for server-side things.');
}
app.locals.site_name = process.env.SITE_NAME;

// mongoose models
var models = require('./models');

// express basics needed by others
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());

require('./templates')(app);

// configure session
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

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

//  static service
app.use(serveStatic(path.join(__dirname, '..', 'generated')));

// dynamic routes
var routes = require('./routes');
for (var i in routes) {
    routes[i](app);
}

module.exports.startServer = function() {
    var port = Number(process.env.PORT || 5000);
    app.listen(port, function() {
        console.log('Listening on ' + chalk.underline(chalk.blue('http://0.0.0.0:' + port)));
    });
}

if (require.main === module)
    module.exports.startServer();