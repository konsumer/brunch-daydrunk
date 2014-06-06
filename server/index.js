var express = require('express'),
    session = require('express-session'),
    app = express(),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),
    ejsLocals = require('ejs-locals'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongostore')(session),
    path = require('path'),
    serveStatic = require('serve-static'),
    logger = require('morgan');

// mongoose models
var models = require('./models');

// express basics needed by others
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());

// Use EJS-locals for the few server-side templates
app.engine('ejs', ejsLocals);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// configure session
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

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