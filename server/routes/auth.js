/**
 * provides basic passport-based mongoose local authentication
 */

// mongoose models
var passport = require('passport'),
    models = require('../models');

module.exports = function(app) {
    passport.use(models.User.createStrategy());
    passport.serializeUser(models.User.serializeUser());
    passport.deserializeUser(models.User.deserializeUser());

    // show register form
    app.get('/register', function(req, res) {
        res.render('auth', {
            title: 'Register'
        });
    });

    // handle user register
    app.post('/register', function(req, res) {
        console.log('register', req.body);

        models.User.register(new models.User({
            email: req.body.email
        }), req.body.password, function(err, account) {
            if (!err) {
                // send email here, link to verify is http://URL/token/<req.user.token>
            }

            if (req.xhr) {
                if (err) {
                    return res.send(err);
                }
                res.send(account);
            } else {
                if (err) {
                    return res.render('auth', {
                        user: account,
                        title: 'Register',
                        error: err.message
                    });
                }
                res.redirect('/');
            }
        });
    });

    // show login form
    app.get('/login', function(req, res) {
        res.render('auth', {
            user: req.user,
            title: 'Login'
        });
    });

    // handle login
    app.post('/login', passport.authenticate('local'), function(req, res) {
        if (req.xhr) {
            res.send(req.user);
        } else {
            res.redirect('/');
        }
    });

    // handle logout
    app.get('/logout', function(req, res) {
        req.logout();
        if (req.xhr) {
            res.send(req.user);
        } else {
            res.redirect('/');
        }
    });

    // send JSON of current user
    app.get('/user', function(req, res) {
        res.send(req.user);
    });

    // allow user to verify account
    app.get('/verify/:token', function(req, res) {

    });

}