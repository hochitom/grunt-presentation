var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-open');

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
                files: [{'app/styles/main.min.css': 'scss/**/*.scss'}]
            }
        },
        watch: {
            scripts: {
                files: ['app/styles/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass:default']
            },
            livereload: {
                files: ['app/styles_dev/*.css'],
                options: {
                    livereload: true
                }
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
                            require('connect-livereload')({
                                src: "http://localhost:35729/livereload.js?snipver=1"
                            }),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
        },
        open: {
            default: {
                path: 'http://localhost:9000',

            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'app/images'
                }]
            }
        },
        modernizr: {
            devFile: "app/scripts/vendor/modernizr.js",
            outputFile: "app/scripts/vendor/modernizr.min.js",
            extra: {
                shiv: false,
                printshiv: true,
                load: true,
                mq: false,
                cssclasses: true
            }
        }
    });

    grunt.registerTask('default', ['uglify:default', 'sass:default', 'connect:default', 'open', 'watch']);
    grunt.registerTask('build', ['uglify:default', 'sass:build', 'imagemin:build', 'modernizr']);
};