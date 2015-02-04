module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    var DIST_PATH = '../dist/';
    var CONCAT_SOURCE_PATH = '../.preconcattmp/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            main: [DIST_PATH + '**'],
            tmp: '../.*'
        },

        copy: {
            original: {
                files: [{ src: ['./images/**', './*.html', './bower_components/**'], dest: DIST_PATH }]
            },
            jsconcat: {
                files: [{ src: './scripts/**/*.js', dest: CONCAT_SOURCE_PATH }]
            }
        },

        uglify: {
            jsconcat: {
                files: [{ expand: true, src: './scripts/**/*.js', dest: CONCAT_SOURCE_PATH }]
            }
        },

        concat: {
            options: {
              stripBanners: true,
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            original: {
                src: ['./styles/splash.css', './styles/fileSelector.css', './styles/app.css'],
                dest: DIST_PATH + 'app.css'
            },
            js: {
                src: ['scripts/uiFX.js', 'scripts/uiFileSelector.js', 'scripts/SRTParser.js', 'scripts/app.js'].map(function(filename) {
                    return CONCAT_SOURCE_PATH + filename;
                }),
                dest: DIST_PATH + 'app.js'
            }
        }

    });


    grunt.registerTask('debug', ['clean', 'copy:original','copy:jsconcat', 'concat']);
    grunt.registerTask('prod', ['clean', 'copy:original', 'uglify:jsconcat', 'concat', 'clean:tmp']);

    grunt.registerTask('default', ['debug']);
};
