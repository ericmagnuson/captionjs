module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					'require': true,
					'document': true,
					'window': true
				}
			},
			all: ['Gruntfile.js', 'jquery.caption.js']
		},

		uglify: {
			minify: {
				options: {
					preserveComments: 'some'
				},
				files: {
					'jquery.caption.min.js': ['jquery.caption.js']
				}
			}
		},

		cssmin: {
			minify: {
				options: {
					keepSpecialComments: 1
				},
				files: {
					'captionjs.min.css': ['captionjs.css']
				}
			}
		}
	});

	// Load the plugins that provide the tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
