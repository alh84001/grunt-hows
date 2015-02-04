
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');


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
        }

    });

    grunt.registerTask('default', ['debug']);
};
