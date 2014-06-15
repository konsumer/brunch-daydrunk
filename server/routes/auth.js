/**
 * provides basic passport-based mongoose local authentication
 */

var passport = require('passport'),
// uncomment for mailgun
//   email = require('../email'),
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
function registerHandle(req, res){
    models.User.register(new models.User({
        email: req.body.email
    }), req.body.password, function(err, account) {
        // dummy-stub, if you are not using email
        if (!email){
            email = function(options, cb){
                console.log('Email not sent. Make sure you go enable email in server/routes/auth.js.', options);
                cb(null, "Email not sent.");
            }
        }

        var options = {
            to: account.email,
            subject: 'Verify your ' + process.env.SITE_NAME + ' account',
            template: 'register',
            account: account,
            urlbase: req.protocol + '://' + req.get('host')
        };


        if (req.xhr) {
            if (err) {
                return res.send(500, err);
            }
            email(options, function(err, body){
                if (err) {
                    return res.send(500, err);
                }
                res.send('OK');
            });
        }

        if (err) {
            return res.render('auth', {
                user: account,
                title: 'Register',
                error: err.message
            });
        }
        
        email(options, function(err, body){
            if (err) {
                return res.render('auth', {
                    user: account,
                    title: 'Register',
                    error: err.message
                });
            }
            res.redirect('/');
        });
        
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
function loginHandle(req, res){
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
    models.User.findOneAndUpdate({ token: req.params.token }, { verified: true }, function(er, user) {
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

function check(req, res, next){
    if (req.user && req.user.verified) {
        next();
    }else{
        res.redirect('/login');
    }
}


module.exports = function(app) {
    // init passport
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(models.User.createStrategy());
    passport.serializeUser(models.User.serializeUser());
    passport.deserializeUser(models.User.deserializeUser());

    // setup routes
    app.get('/register', registerForm);
    app.post('/register', registerHandle);
    app.get('/login', loginForm);
    app.post('/login', passport.authenticate('local'), loginHandle);
    app.get('/logout', logout);
    app.post('/logout', logout);
    app.get('/user', user);
    app.get('/verify/:token', verify);

    // public interface
    return {
        check: check
    };
}