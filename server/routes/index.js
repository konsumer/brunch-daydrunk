module.exports.index = function(app){
	/**
	 * Basic site-index
	 * @param  {Request}  req Express request object
	 * @param  {Response} res Express response object
	 */
	app.get('/', function(req, res){
		res.render('index');
	});
}

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        module.exports[name] = require('./' + file);
    }
});