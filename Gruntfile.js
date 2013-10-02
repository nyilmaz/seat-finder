module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

	});

	// Default task(s).
	//grunt.registerTask('default', ['uglify']);

	// A very basic default task.
	grunt.registerTask('default', 'Log some stuff.', function() {
	  grunt.log.write('Logging some stuff...').ok();
	});
}