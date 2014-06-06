var mongoose = require("mongoose"),
    mongooseTypes = require("mongoose-types"),
    chalk = require('chalk');

// check configuration

// add Email & Url types
mongooseTypes.loadTypes(mongoose);

if (!process.env.MONGOHQ_URL && !process.env.MONGOLAB_URI && !process.env.MONGOSOUP_URL && !process.env.MONGO_URI) {
    console.log('You need to set MONGOHQ_URL, MONGOLAB_URI, MONGOSOUP_URL, or MONGO_URI environment variables. Please see README.md, under "configuration", for more info.')
    process.exit(1);
}

var mongo_url = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL || process.env.MONGO_URI;

// pre-configure mongoose
mongoose.connect(mongo_url);
mongoose.connection.on('error', function(e) {
    console.log(chalk.red('Mongoose Error:'), e)
});

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        module.exports[name] = require('./' + file);
    }
});