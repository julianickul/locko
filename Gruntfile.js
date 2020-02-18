module.exports = function(grunt) {
	'use strict';

	var path = require('path');
	var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

	Object.keys(configBridge.paths).forEach(function (key) {
		configBridge.paths[key].forEach(function (val, i, arr) {
			arr[i] = path.join('./docs/assets', val);
		});
	});


	require('time-grunt')(grunt); // displays time esteemation
	require('load-grunt-tasks')(grunt); // load all the tasks from dev dependencies

	//require('load-grunt-config')(grunt);


	// Project configuration.
	grunt.initConfig({
		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> ',

		less: {
			compileCore: {
				src: 'src/less/bootstrap.less',
				dest: 'prod/css/bootstrap.css'
			},
			compileTheme: {
				src: 'src/less/theme.less',
				dest: 'prod/css/<%= pkg.name %>-theme.css'
			},
			compileIE8: {
				src: 'src/less/theme-ie8.less',
				dest: 'prod/css/<%= pkg.name %>-theme-ie8.css'
			}
		},
		autoprefixer: {
			options: {
				browsers: configBridge.config.autoprefixerBrowsers
			},
			core: {
				src: 'prod/css/bootstrap.css'
			},
			theme: {
				src: 'prod/css/<%= pkg.name %>-theme.css'
			}
		},
		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			minifyCore: {
				src: 'prod/css/bootstrap.css',
				dest: 'prod/css/bootstrap.min.css'
			},
			minifyTheme: {
				src: 'prod/css/<%= pkg.name %>-theme.css',
				dest: 'prod/css/<%= pkg.name %>-theme.min.css'
			},
			minifyThemeIE8: {
				src: 'prod/css/<%= pkg.name %>-theme-ie8.css',
				dest: 'prod/css/<%= pkg.name %>-theme-ie8.min.css'
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true
				},
				files: [ {
					cwd: "src/pages",
					src: "*.jade",
					dest: "prod",
					expand: true,
					ext: ".html"
				} ]
			}
		},
		concat: {
			options: {
				banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
				stripBanners: false
			},
			bootstrap: {
				src: [
					'src/js/transition.js',
					'src/js/alert.js',
					'src/js/button.js',
					'src/js/carousel.js',
					'src/js/collapse.js',
					'src/js/dropdown.js',
					'src/js/modal.js',
					'src/js/tooltip.js',
					'src/js/popover.js',
					'src/js/scrollspy.js',
					'src/js/tab.js',
					'src/js/affix.js'
				],
				dest: 'prod/js/bootstrap.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some'
			},
			core: {
				src: '<%= concat.bootstrap.dest %>',
				dest: 'prod/js/bootstrap.min.js'
			}
			/*customize: {
				src: configBridge.paths.customizerJs,
				dest: 'docs/assets/js/customize.min.js'
			},
			docsJs: {
				src: configBridge.paths.docsJs,
				dest: 'docs/assets/js/docs.min.js'
			}*/
		},

		watch: {
			src: {
				files: 'src/js/*.js',
				tasks: ['concat','uglify']
			},
			/*test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},*/
			jade: {
				files: "src/pages/**/*.jade",
				tasks: "jade",
				options: {
					livereload: true
				}
			},
			less: {
				files: 'src/less/**/*.less',
				tasks: 'prod-css'
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		}
	});



	grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme', 'less:compileIE8']);
	grunt.registerTask('css-minify', ['cssmin:minifyCore', 'cssmin:minifyTheme', 'cssmin:minifyThemeIE8']);
	grunt.registerTask('prod-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'css-minify']);
	grunt.registerTask('prod-js', ['concat', 'uglify']);
	grunt.registerTask('default', [
		'connect',
		'watch'
	]);
	grunt.registerTask('run', [ 'prod-css', 'jade', 'prod-js']);
};