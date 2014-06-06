var mongoose = require("mongoose"),
    mongooseTypes = require("mongoose-types"),
    chalk = require('chalk');

// check configuration

// add Email & Url types
mongooseTypes.loadTypes(mongoose);


// pre-configure mongoose
mongoose.connect(process.env.MONGOLAB_URI);
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