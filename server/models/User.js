/**
 * Mongoose User-model for local passport authentication
 */

var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

/**
 * Generate a random string from a collection of characters
 * @param {Number} len (default: 10) the string length
 * @return {String} Random string
 */
function makeToken(len) {
    len = len || 10;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var User = new mongoose.Schema({
    "email": { type: mongoose.SchemaTypes.Email, required: true },
    "created": { type: Date, default: Date.now },
    "verified": { type: Boolean, default: false },
    "token": { type: String, default: makeToken }
});

// this model provides mongoose passport authentication
User.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

User.methods.updateToken = function(len){
    this.token = makeToken(len);
}

module.exports = mongoose.model('User', User);