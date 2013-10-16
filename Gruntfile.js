module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
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
                    base:'app'
                }
            }
        },
        open: {
            default: {
                path: 'http://localhost:9000'
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
        }
    });

    grunt.registerTask('default', ['connect:default', 'open', 'watch']);
    grunt.registerTask('build', ['uglify:default', 'sass:build', 'imagemin:build']);
};