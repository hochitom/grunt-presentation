var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-modernizr');

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            default: {
                options: {
                    beautify: true
                },
                src: ['app/scripts/main.js', 'app/scripts/scripts.js'],
                dest: 'app/scripts/main.ck.js'
            },
            build: {
                src: ['app/scripts/main.js', 'app/scripts/scripts.js'],
                dest: 'app/scripts/main.min.js'
            }
        },
        sass: {
            options: {
                style: 'expanded',
                debugInfo: true,
                lineNumbers: true
            },
            files: [{
                    'app/styles/main.css': 'scss/*.scss'
                }]
        },
        watch: {
            scripts: {
                files: ['app/scripts/**/*.js', '!app/scripts/**/*.min.js'],
                tasks: ['uglify:build']
            },
            livereload: {
                files: ['app/styles/*.css'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 3000,
                hostname: 'localhost'
            },
            default: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')({
                                src: 'http://localhost:35729/livereload.js?snipver=1'
                            }),
                            mountFolder(connect, 'app')
                        ]
                    }
                }
            }
        },
        open: {
            default: {
                path: 'http://localhost:3000'
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '**/*.{png,jpg,jpeg}',
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

    grunt.registerTask('default', ['uglify:default', 'connect', 'open', 'watch']);
    grunt.registerTask('build', ['uglify:build', 'imagemin', 'modernizr']);
};