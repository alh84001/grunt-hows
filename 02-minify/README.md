
2 - Minifikacija
=================================

1. Napravite update npm modula

		npm install

2. Instalirajte minify task
		
		npm install --save-dev grunt-contrib-uglify

3. U gruntfile.js dodajte

        grunt.loadNpmTasks('grunt-contrib-uglify');

4. Definirajte konstantu
		
		var UGLIFY_TMP_DIR_PATH = '../.uglifytmp/';

5. Dodajte u config init

        uglify: {
            scripts: {
                files: [{ expand: true, src: './scripts/**/*.js', dest: UGLIFY_TMP_DIR_PATH }]
            }
        }

6. Izmjenite u config init

		clean: {
            options: {
                force: true
            },
            main: ['<%= copy.original.dest %>'],
            uglifytmp: UGLIFY_TMP_DIR_PATH
        },

        copy: {
          original: {
            src: ['./scripts/**', './styles/**', './images/**', './*.html', './bower_components/**'],
            dest: '../dist/'
          },
          uglified: {
            files: [
                { expand: true, cwd: UGLIFY_TMP_DIR_PATH, src: ['**'], dest: '../dist/'},
                { expand: true, src: ['./styles/**', './images/**', './*.html', './bower_components/**'], dest: '../dist/'}
            ]
          }
        },

7. Registrirajte dva nova taska

        grunt.registerTask('debug', ['clean', 'copy:original']);
    	grunt.registerTask('prod', ['clean', 'uglify', 'copy:uglified', 'clean:uglifytmp']);

8. Izmjenite defaultni task

        grunt.registerTask('default', ['debug']);

9. pokrenite grunt (u client direktoriju)

        cd client
        grunt prod
        
10. restart servera (u server direktoriju)

        node server

11. U browseru otvorite

        http://localhost:1337/main.html

12. Ponovite 9-10-11, ali sa komandom 'grunt' (bez prod)
