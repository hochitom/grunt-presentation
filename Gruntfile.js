module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            default: {
                src: ['app/scripts/main.js'],
                dest: 'app/scripts/main.min.js'
            }
        }
    });

    grunt.registerTask('default', ['uglify']);
};