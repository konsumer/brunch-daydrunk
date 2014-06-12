var ejs = require('ejs'),
	ejsLocals = require('ejs-locals'),
	path = require('path');

module.exports = function(app){
	// Use EJS-locals for server-side templates
	app.engine('ejs', ejsLocals);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	// here is how you add custom EJS filters
	ejs.filters.basename = function(file, ext) {
		return path.basename(file, ext);
	};
};