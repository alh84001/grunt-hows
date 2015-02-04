module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({

        clean: {
            options: {
                force: true
            },
            main: ['<%= copy.main.dest %>']
        },

        copy: {
          main: {
            src: ['./scripts/**', './styles/**', './images/**', './*.html', './bower_components/**'],
            dest: '../dist/'
          }
        }

    });

    grunt.registerTask('default', ['clean', 'copy']);

};