/**
 * brunch config
 */

exports.config = {
    paths: {
        'public': 'generated',
        'watched': ['front']
    },

    files: {
        javascripts: {
            defaultExtension: 'js',
            joinTo: {
                'js/app.js': /^front\/js/,
                'js/ie.js': /^bower_components[\\/](?=json3|es5-shim)/,
                'js/vendor.js': /^bower_components[\\/](?!json3|es5-shim)/,
            }
        },

        stylesheets: {
            defaltExtension: 'less',
            joinTo: {
                'css/site.css': /^front\/less\/site.less/,
            }
        }
    },

    framework: 'AngularJS',

    server: {
        path: 'server/index.js'
    }

};