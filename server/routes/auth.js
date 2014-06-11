/**
 * provides basic passport-based mongoose local authentication
 */

// mongoose models
var passport = require('passport'),
    models = require('../models');


/**
 * GET register form
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function registerForm(req, res){
    res.render('auth', {
        title: 'Register'
    });
}

/**
 * POST register form
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function registerPost(req, res){
    models.User.register(new models.User({
        email: req.body.email
    }), req.body.password, function(err, account) {
        if (!err) {
            // comment this for verification email
            return res.send(account);

            /*
            // it is recommended to set MAIL_DOMAIN & MAIL_FROM environment variables
            // otherwise I try to guess from heroku environment variables for Mailgun
            var Mailgun = require('mailgun-js'),
                fs = require('fs'),
                path = require('path'),
                ejs = require('ejs');

            var domain = process.env.MAIL_DOMAIN || process.env.MAILGUN_SMTP_LOGIN.split('@').pop();
            var from = process.env.MAIL_FROM || process.env.MAILGUN_SMTP_LOGIN;
            var mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: domain});
            var urlbase = req.protocol + '://' + req.get('host');

            var message = {
                from: from,
                to: account.email,
                subject: "Account verification",
                body: ejs.render(fs.readFileSync(path.join(__dirname, '..', 'views', 'email', 'register_txt')), {account:account, urlbase:urlbase}),
                html: ejs.render(fs.readFileSync(path.join(__dirname, '..', 'views', 'email', 'register_html')), {account:account, urlbase:urlbase})
            };
            
            console.log('sent verfication email', account.email, account.token);
            mailgun.messages().send(message, function(err, body){
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
            */
        }

        if (req.xhr) {
            if (err) {
                return res.send(err);
            }
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
}

/**
 * GET login form
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function loginForm(req, res){
    res.render('auth', {
        title: 'Login'
    });
}

/**
 * POST login form - happens after auth
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function loginPost(req, res){
    if (req.xhr) {
        res.send(req.user);
    } else {
        res.redirect('/');
    }
}

/**
 * logout user
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function logout(req, res){
    req.logout();
    if (req.xhr) {
        res.send(req.user);
    } else {
        res.redirect('/');
    }
}

/**
 * get user JSON
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function user(req, res){
    res.send(req.user);
}



/**
 * Verify user account
 * @param  {Request}  req Express request object
 * @param  {Response} res Express response object
 */
function verify(req, res){
    var token = token: req.params.token;
    models.User.findOneAndUpdate({ token: token }, { verified: true }, function(er, user) {
        if (er) {
            return res.send(500, er);
        }
        if (!user) {
            return res.send(404, {
                message: "Token not found."
            });
        }

        res.render('token', {
            user: {
                _id: user['_id'],
                email: user.email,
                verified: user.verified,
                created: user.created
            }
        });
    });
}


module.exports = function(app) {
    // init passport
    passport.use(models.User.createStrategy());
    passport.serializeUser(models.User.serializeUser());
    passport.deserializeUser(models.User.deserializeUser());

    // setup routes
    app.get('/register', registerForm);
    app.post('/register', registerPost);
    app.get('/login', loginForm);
    app.post('/login', passport.authenticate('local'), loginPost);
    app.get('/logout', logout);
    app.post('/logout', logout);
    app.get('/user', user);
    app.get('/verify/:token', token);

    // public interface
    return {};
}