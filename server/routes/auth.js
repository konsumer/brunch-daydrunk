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

    app.get('/register', function(req, res) {
        res.render('register', {});
    });

    app.post('/register', function(req, res) {
        models.User.register(new models.User({
            email: req.body.email
        }), req.body.password, function(err, account) {
            if (req.xhr) {
                if (err) {
                    return res.render('register', {
                        account: account
                    });
                }
                res.redirect('/');
            } else {
                if (err) {
                    return res.send(err);
                }
                res.send(account);
            }
        });
    });

    app.get('/login', function(req, res) {
        res.render('login', {
            user: req.user
        });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        if (req.xhr) {
            res.send(req.user);
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        if (req.xhr) {
            res.send(req.user);
        } else {
            res.redirect('/');
        }
    });

}