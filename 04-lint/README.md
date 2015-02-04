
4 - Linting
=================================

1. Napravite update npm modula

        npm install

2. Instalirajte concat task
        
        npm install --save-dev grunt-contrib-jshint

3. U gruntfile.js dodajte

        grunt.loadNpmTasks('grunt-contrib-jshint');

4. Dodajte u config init

        jshint: {
            options: {
              // eqeqeq: true
            },
            beforeconcat: ['scripts/**'],
            afterconcat: [DIST_PATH + 'app.js']
        }

5. Izmjenite dva taska 
        grunt.registerTask('debug', ['clean', 'jshint:beforeconcat', 'copy:original','copy:jsconcat', 'concat', 'jshint:afterconcat']);
        grunt.registerTask('prod', ['clean', 'jshint:beforeconcat', 'copy:original', 'uglify:jsconcat', 'concat', 'clean:tmp']);

6. Pokrenite grunt

7. Otkomentarijate opciju i u client/scripts/app.js na pocetak dodajte dle navedenu liniju i pokrenite grunt ponovno
        if (0 == 1) return;
