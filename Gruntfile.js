/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      noWebRTC: ['test/run-TestNoWebRTC.html']
    },
    browserify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.js': 'src/JsSIP.js'
        }
      },
      devel: {
        files: {
          'dist/<%= pkg.name %>-devel.js': 'src/JsSIP.js'
        }
      }
    }
  });

  // Load Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-browserify');

  // Task for building JsSIP Grammar.js and Grammar.min.js files.
  grunt.registerTask('grammar', function(){
    var done = this.async();  // This is an async task.
    var sys = require('sys');
    var exec = require('child_process').exec;
    var child;

    // First compile JsSIP grammar with PEGjs.
    console.log('"grammar" task: compiling JsSIP PEGjs grammar into Grammar.js ...');
    child = exec('if [ -x "./node_modules/pegjs/bin/pegjs" ] ; then PEGJS="./node_modules/pegjs/bin/pegjs"; else PEGJS="pegjs" ; fi && $PEGJS src/Grammar/src/Grammar.pegjs src/Grammar/dist/Grammar.js', function(error, stdout, stderr) {
      if (error) {
        sys.print('ERROR: ' + stderr);
        done(false);  // Tell grunt that async task has failed.
      }
      console.log('OK');

      // Then modify the generated Grammar.js file with custom changes.
      console.log('"grammar" task: applying custom changes to Grammar.js ...');
      var fs = require('fs');
      var grammar = fs.readFileSync('src/Grammar/dist/Grammar.js').toString();
      var modified_grammar = grammar.replace(/throw new this\.SyntaxError\(([\s\S]*?)\);([\s\S]*?)}([\s\S]*?)return result;/, 'new this.SyntaxError($1);\n        return -1;$2}$3return data;');
      fs.writeFileSync('src/Grammar/dist/Grammar.js', modified_grammar);
      console.log('OK');
      done();  // Tell grunt that async task has succeeded.

    });
  });

  grunt.registerTask('build', ['browserify:dist']);
  grunt.registerTask('devel', ['browserify:devel']);

  // Test tasks.
  grunt.registerTask('testNoWebRTC', ['devel','qunit:noWebRTC']);
  grunt.registerTask('test', ['testNoWebRTC']);

  // Travis CI task.
  // Doc: http://manuel.manuelles.nl/blog/2012/06/22/integrate-travis-ci-into-grunt/
  grunt.registerTask('travis', ['grammar', 'build', 'test']);

  // Default task is an alias for 'build'.
  grunt.registerTask('default', ['build']);

};
