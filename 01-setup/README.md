
1 - Postavljanje grunt-a
=============================================

Što je grunt?

- node.js aplikacija za pokretanje taskova
- taskovi su definirani u gruntFile-u
- svaki pojedini task je npm modul
- svaki task treba instalirati sa **--save-dev** opcijom

[http://gruntjs.com/](http://gruntjs.com/)


Kako postaviti grunt
---------------------------------------------

1. U konzoli instalirajte grunt bootstrapper (globalno)
        npm install -g grunt-cli

2. Napravite client/package.json

        {
            "author": "Jimmy McNulty",
            "name": "episode_1x01",
            "description": "The Target",
            "homepage": "http://en.wikipedia.org/wiki/The_Target_%28The_Wire%29",
            "version": "0.0.1"
        }

3. U client direktoriju instalirajte (dev) dependencye
        npm install --save-dev grunt
        npm install --save-dev grunt-contrib-copy
        npm install --save-dev grunt-contrib-clean

4. Napravite client/gruntFile.js...

        module.exports = function (grunt) {

            // ucitavanje npm taskova
            grunt.loadNpmTasks('grunt-contrib-clean');
            grunt.loadNpmTasks('grunt-contrib-copy');

            // inicijalizacija
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

            // default task
            grunt.registerTask('default', ['clean', 'copy']);

        };

5. ...ili client/gruntFile.coffee
    
        module.exports = (grunt) =>
            grunt.loadNpmTasks('grunt-contrib-copy')

            grunt.config.init
                copy:
                    main:
                        src: ['./scripts/**', './styles/**', './images/**', './*.html', './bower_components/**']
                        dest: '../dist/'

            
            copyDest = 'main'
            if grunt.option('copyDest')
                copyDest = 'custom'
                copy = grunt.config.get('copy')
                copy[copyDest] =
                    src: copy['main'].src
                    dest: grunt.option('copyDest')
                grunt.config.set('copy', copy)

            
            grunt.registerTask('default', ['copy:' + copyDest])

6. cd u client direktorij, i pokrenite grunt

        cd client
        grunt
        grunt copy
        // javascript
        grunt clean
        // coffescript
        grunt --copyDest=../custom

7. restart servera

        cd server
        npm start
        node server ../server/root/path

8. U browseru otvorite

        http://localhost:1337/main.html
