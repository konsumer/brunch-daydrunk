/**
 * provides basic passport-based mongoose local authentication
 */

var passport = require('passport'),
// uncomment for mailgun
//   email = require('../email'),
    models = require('../models');

// dummy-stub, if you are not using email
if (!email){
    var email = function(options, cb){
        console.log('Email not sent. Make sure you go enable email in server/routes/auth.js.', options);
        cb(null, "Email not sent.");
    }
}


/**
 * Middleware that requires auth & verified
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 * @param  {Function} next Next-in-express-chain
 */
function check(req, res, next){
    if (req.user){
        if (req.user.verified){
            return res.message('User not verified. Please check your email.', 'error', '/login');
        }
    }else{
        return res.message('Login is required.', 'error', '/login');
    }
    next();
}

// get user JSON
function getUser(req, res){
    res.send(req.user);
}

// GET /login - login form
function getLogin(req, res){
    res.render('auth', { title: 'Login', messages:req.flash() });
}

// POST /login - process form, return form or redirect to /
function postLogin(req, res){
    if (!req.user.verified){
        return res.message('User not verified. Please check your email.', 'error', '/login');
    }
    res.message('Logged in.', 'success', '/');
}

// GET /register - register form
function getRegister(req, res){
    res.render('auth', { title: 'Register', messages:req.flash() });
}

// POST /register - process form, return form
function postRegister(req, res){
    models.User.register(new models.User({
        email: req.body.email
    }), req.body.password, function(er, account) {
        if (er) {
            return res.message(err.message, 'error', '/register');
        }

        var options = {
            to: account.email,
            subject: 'Verify your ' + process.env.SITE_NAME + ' account',
            template: 'register',
            account: account,
            urlbase: req.protocol + '://' + req.get('host')
        };
        
        email(options, function(er, body){
            if (er) {
                return res.message(er.message, 'error', '/register');
            }
            return res.message('User registered. Go check your email for email-verification link.', 'success');
        });
    });
}

// GET/POST /logout - logout, redir to /
function logout(req, res){
    req.logout();
    return res.message('User logged out.', 'success');
}

// GET /verify/:token - check token from email
function getVerify(req, res){
    models.User.findOneAndUpdate({ token: req.params.token }, { verified: true }, function(er, user) {
        if (er) {
            return res.message(er.message, 'error', '/login');
        }
        if (!user) {
            return res.message('Verification code not found.', 'error', '/login');
        }
        
        res.message('User verified. Please login.', 'success', '/login');
    });
}

// GET /forgot - ask user for email address
// GET /forgot/:token - check token, ask user for new password
function getForgot(req, res){
    if(req.params.token){
        models.User.findOne({ token: req.params.token }, function(er, user) {
            if (er) {
                return res.message(er.message, 'error', '/forgot');
            }
            if (!user) {
                return res.message('Verification code not found, please try again.', 'error', '/forgot');
            }
            res.render('forgot_password', {token: req.params.token, messages:req.flash()});
        });
    }else{
        res.render('forgot_email', {messages:req.flash()});
    }
}

// POST /forgot - check email address, send forgot email
// POST /forgot/:token - check token, update password
function postForgot(req, res){
    if(req.params.token){
        models.User.findOne({ token: req.params.token }, function(er, user){
            if (er) {
                return res.message(er.message, 'error', '/forgot');
            }
            if (!user) {
                return res.message('Token not found, please try again.', 'error', '/forgot');
            }
            user.setPassword(req.body.password, function(er, user){
                if (er) {
                    return res.message(er.message, 'error', '/forgot');
                }
                return res.message('Your password has been updated.', 'success', '/login');
            });
        });
    }else{
        models.User.findOne({ email: req.body.email }, function(er, user){
            if (er) {
                return res.message(er.message, 'error', '/forgot');
            }
            if (!user) {
                return res.message('User not found, please try again.', 'error', '/forgot');
            }
            
            // reset the token
            user.updateToken();
            user.save();

            var options = {
                to: user.email,
                subject: 'Reset your ' + process.env.SITE_NAME + ' password',
                template: 'forgot',
                account: user,
                urlbase: req.protocol + '://' + req.get('host')
            };
            email(options, function(er, body){
                if (er) {
                    return res.message(er.message, 'error', '/forgot');
                }
                return res.message('Email sent. Go check your email for a link to update your password.', 'success', '/forgot');
            });
        });
    }
}

module.exports = function(app) {
    // init passport
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(models.User.createStrategy());
    passport.serializeUser(models.User.serializeUser());
    passport.deserializeUser(models.User.deserializeUser());

    // add user to template-accessible vars
    app.use(function check(req, res, next){
        if (req.user){
            res.locals.user = req.user;
        }
        next();
    });

    // setup routes
    app.get('/login', getLogin);
    app.post('/login', passport.authenticate('local'), postLogin);
    app.get('/register', getRegister);
    app.post('/register', postRegister);
    app.get('/logout', logout);
    app.post('/logout', logout);
    app.get('/user', getUser);
    app.get('/verify/:token', getVerify);
    app.get('/forgot', getForgot);
    app.get('/forgot/:token', getForgot);
    app.post('/forgot', postForgot);
    app.post('/forgot/:token', postForgot);

    // public interface
    return {
        check: check
    };
}