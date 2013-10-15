var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var lrSnippet = require('connect-livereload')({port: 87656});

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    
    //require('connect-livereload');

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            default: {
                src: ['app/scripts/main.js'],
                dest: 'app/scripts/main.min.js'
            }
        },
        sass: {
            options: {
                style: 'expanded',
                debugInfo: true,
                lineNumbers: true,
                sourcemap: true
            },
            default: {
                files: [{'app/styles_dev/main.css': 'scss/**/*.scss'}]
            },
            build: {
                options: {
                    style: 'compressed',
                    debugInfo: false,
                    lineNumbers: false,
                    sourcemap: false
                },
                files: [{'app/styles/main.css': 'scss/**/*.scss'}]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['app/styles/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass:default']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            default: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'app'),
                            lrSnippet
                        ];
                    }
                }
            }
        },
        open: {
            default: {
                path: 'http://localhost:3000'
            }
        }
    });

    grunt.registerTask('default', ['connect:default', 'open', 'watch']);
};