
3 - Konkatenacija
=================================

1. Napravite update npm modula

		npm install

2. Instalirajte concat task
		
		npm install --save-dev grunt-contrib-concat

3. U gruntfile.js dodajte

        grunt.loadNpmTasks('grunt-contrib-concat');

4. Dodajte u config init

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

5. Dodajte dva taska 
        grunt.registerTask('debug', ['clean', 'copy:original','copy:jsconcat', 'concat']);
        grunt.registerTask('prod', ['clean', 'copy:original', 'uglify:jsconcat', 'concat', 'clean:tmp']);


6. Promjenite css i script reference u main.html


7. pokrenite grunt (u client direktoriju)

        cd client
        grunt prod
        
8. restart servera (u server direktoriju)

        node server

9. U browseru otvorite

        http://localhost:1337/main.html

10. Ponovite 7-8-9, ali sa komandom 'grunt' (bez prod)
