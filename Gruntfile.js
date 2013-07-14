module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        shim: {
          'pixi': {path: 'bower_components/pixi/bin/pixi.dev.js', exports: 'PIXI'},
          'KeyboardJS': {path: 'bower_components/KeyboardJS/keyboard.js', exports: 'KeyboardJS'}
        }
      },
      'build/monki-run.js': ['src/main.js']
    },
    express: {
      default: {
        options: {
          port: 3000,
          bases: '.'
        }
      }
    },
    watch: {
      default: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('server', ['browserify', 'express', 'watch']);
};