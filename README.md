# brunch-daydrunk

Sometimes you don't need tests, you just need to get your drunken idea up there before you sober up. You don't want a bunch of other people's code in your repo, just the basic stuff to get your hipster-app in teh wild for immediate consumption. You want just enough boilerplate to not have to look stuff up, but not so much you have to delete a bunch of crap. This is the skeleton for you, day-drunk hipster.

I use this on [Heroku](http://www.heroku.com/) for a nice local build & reload dev server, and it builds itself on deploy. With simple modification you can easily use it with [AppFog](https://www.appfog.com/) & other deployment methods, too.

## opinionated

I have opinions on things. These opinions are related to performance, ease-of-use, and other factors. You can use this skeleton if you don't share all those opinions, but you will have to change stuff around. I like using the underlying web-tech, for the most part. I like structure & reusability, and hate repeating myself. I kept [notes](https://github.com/konsumer/brunch-daydrunk/wiki), just in case you aren't super-familiar, but don't mind my opinions.

I make these choices:

*  I like polyfills for making IE work right. I target the latest version of Chrome's CSS&JS (without vendor-prefixes), and then use polyfills to add support for everyone else. You may lose a tiny bit of performance, but also you gain code that will eventually work fast in any browser that decides to play nice with others.
*  I choose LESS over SASS (it's more like CSS, with a few extras)
*  I choose JS over Coffeescript
*  I chose CommonJS over AMD.
*  I choose EJS over Jade. It's easier to work with Angular than Handlebars, but is basically HTML + javascript. Nice.
*  [AngularJS](https://angularjs.org/), no jQuery
*  [LESS](http://lesscss.org/)
*  [Bootstrap](http://getbootstrap.com/) & [Angular UI's bootstrap directives](http://angular-ui.github.io/bootstrap/)
*  [express 4](http://expressjs.com/) it's way more modular than express 3, which is a blessing (lighter npm install) and a curse (badly documented)
*  [Mongoose](http://mongoosejs.com/) for storing server-side data
*  [passport](http://passportjs.org/) for auth
*  [EJS locals](https://github.com/RandomEtc/ejs-locals) templates for server-side stuff.
*  I like to do most things client-side with REST, but keep my options open for static HTML. For example, I make a `get('/login')` that serves an HTML login form & `post('/login')` that handles the form POST & JSON AJAX POST requests, both.
*  I try to make things easy to disable by deleting files, and easy to drop into new projects. For example, if you don't need passport auth, just delete server/routes/auth.js.
*  Unit tests are good practice, but I delete them when I need to get something up quick and the tests are totally bogus, like in the case of yeoman. You should probably add some tests once you get things fleshed out. I recommend [mocha](http://visionmedia.github.io/mocha/)+[chai](http://chaijs.com/)+[karma](http://karma-runner.github.io/), so you can be all easy-breazy about testing style, and not lock your fellow devs (or your daydrunk-self) into a particular style. This will make it so everyone can write TDD, BDD, QUnit, assert, expect, should, etc tests in whatever style makes them happy.

## new app setup

*  `mkdir PROJECT && cd !$`
*  `brunch new gh:konsumer/brunch-daydrunk`
*  `npm install`
*  drink mimosas till you puke, while coding the next useful thing

In your project, you can delete everything above this line, and get a pro-looking README, with no reference to this skeleton, that should be a enough for even a fresh-on-the-project developer to get started and understand how stuff fits together.

# <-- SNIP -->

## installation

Make sure [node](http://nodejs.org/) is installed. `npm install` in the project directory will do all the installation of dependencies, server-side & client-side.

## read more

You will need to know about these things to be super-effective with this codebase:

*  [brunch](http://brunch.io/) to build the minified production version & to continuosly build the app to `generated/` from it's source files in `front/`
*  [express 4](http://expressjs.com/) the server uses this. See files in `server/` to work out how it all goes together.
*  [Mongoose](http://mongoosejs.com/) for working with mongodb
*  [passport](http://passportjs.org/) for auth
*  [bower](http://bower.io/) to track client-side dependencies
*  [LESS](http://lesscss.org/) extends CSS with dynamic behavior such as variables, mixins, operations and functions. I use it to build an optimized [Bootstrap](http://getbootstrap.com/) and quickly & semantically generate the styles for this app.  I added some useful mixins. Be sure to check out files in `front/less/`
*  [AngularJS](https://angularjs.org/) Superheroic JavaScript MVW Framework.
*  [Bootstrap](http://getbootstrap.com/) This app uses Bootstrap 3, with [Angular UI's bootstrap directives](http://angular-ui.github.io/bootstrap/). I added a few cool things like file input & checkbox/radio styling.

## structure

All these are further documented in a README.md in each directory.

```
front/         - All frontend files.
	 js/       - All javascript. This will be combined into site.js.
	 less/     - All LESS files. `site.less` gets built into site.css.
	 assets/   - Anything else. This gets translated into the webroot. This is where you should put images, fonts, etc.

server/        - All server-side code.
	  models/  - All mongoose models. They are auto-included from index.js. I included [URL & Email field-types](https://github.com/bnoguchi/mongoose-types)
	  routes/  - All express routes. They are auto-included from index.js.
	  views/   - Server-side EJS templates go in here. I use [EJS locals](https://github.com/RandomEtc/ejs-locals) so you can use layouts, if you want to.
```

## configuration

This app uses environment variables for settings. You can set them with the settings panel on heroku, or edit the local file `.env` for your dev server.

*  You can set your heroku app to use all the local settings with `heroku config:push --overwrite --interactive`
*  you can pull the heroku app's settings into  your `.env` file with `heroku config:pull --overwrite --interactive`.
*  You can read more about [Heroku Configuration](https://devcenter.heroku.com/articles/config-vars).

Here is what a sensible `.env` file looks like, for this app:

```
<YOUR DEMO ENVIRONMENT VARIABLES HERE>
MONGO_URI=mongodb://<YADAYADA>
SESSION_SECRET=keyboardcat
```

