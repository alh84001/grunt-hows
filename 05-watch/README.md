
5 - Watching
=================================

1. Napravite update npm modula

		npm install

2. Instalirajte watch task
		
		npm install --save-dev grunt-contrib-watch

3. U gruntfile.js dodajte

        grunt.loadNpmTasks('grunt-contrib-watch');

4. Dodajte u config init

        watch: {
            scripts: {
                files: ['./scripts/**'],
                tasks: ['jshint:beforeconcat'],
            },
            styles: {
                files: ['./styles/**'],
                tasks: ['default']
            }
        }

5. Pokrenite server

        cd server
        node server

6. Pokrenite watch task

        cd client
        grunt watch:styles

7. Igranje :)






EOF - što još postoji?
=================================

- jsdoc
- depndency handling -> browserify, bower
- promjena jezika
    - styling -> Stylus, Less,...
    - html -> templating, grunt-consolidate, jade
    - i js je zamjenjiv -> Coffeescript
- google closure
- testing - mocha, jasmine, karma, phantomjs
- deployment
- roll your own
