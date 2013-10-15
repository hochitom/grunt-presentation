module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

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
        }
    });

    grunt.registerTask('default', ['watch']);
};