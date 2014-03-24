module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-cov');
	grunt.loadNpmTasks('grunt-shell');

	var buildDir = 'build',
		testDir = 'test',
		srcDir = 'src',
		gameplay = buildDir + '/gameplay',
		pkgSrc = 'node_modules/byu-catan';

	var frameworkJsOutput = gameplay + '/js/framework.js',
		testJsOutput = gameplay + '/js/test.js',
		browserifyOutput = gameplay + '/js/app.js',
		yuiOutput = buildDir + '/docs/javascript';

	var frameworkFiles = [
		'Core.js', 'view_basics/BasicController.js', 'view_basics/BasicDefs.js', 'view_basics/BasicDisplayElement.js', 'display_elements/AmountChangeDisplayElement.js', 'display_elements/ButtonDisplayElement.js', 'display_elements/ChooserDisplayElement.js', 'display_elements/ComboDisplayElement.js', 'display_elements/PointDisplayElement.js', 'display_elements/RobDisplayElement.js', 'display_elements/TrackerDisplayElement.js', 'display_elements/CommDisplayElement.js', 'model/hexgrid.js', 'view_basics/BasicOverlay.js', 'trading/AcceptOverlay.js', 'view_basics/WaitOverlay.js', 'development_cards/CardOverlay.js', 'development_cards/BuyOverlay.js', 'development_cards/CardController.js', 'map/MapOverlay.js', 'discard/DiscardOverlay.js', 'roll/RollOverlay.js', 'roll/RollResultOverlay.js', 'discard/DiscardController.js', 'points/GameOverOverlay.js', 'roll/RollController.js', 'turn_tracker/TrackerView.js', 'turn_tracker/TrackerController.js', 'resources/ResourcesView.js', 'resources/ResourcesController.js', 'points/PointsView.js		', 'points/PointsController.js', 'comms_box/CommView.js', 'comms_box/CommController.js', 'trading/MaritimeView.js', 'trading/MaritimeController.js', 'trading/DomesticView.js', 'trading/DomesticController.js', 'map/RobberOverlay.js', 'map/MapView.js', 'map/MapController.js', 'GameplayConnections.js'
	].map(function(p) {
		return gameplay + '/js/' + p;
	});

	var srcJsFile = srcDir + '/client/index.js';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			serve: {
				command: 'node src/server/app.js',
				options:{
					stdout: true,
					stderr: true
				}
			}
		},
		jshint: {
			options: {
				laxcomma: true,
				'-W058': true,
				'-W014': true,
				'-W099': true,
				'-W079': true,
				'-W030': true,
				'-W032': true,
				'-W033': true,
				undef: true,
				// unused: true, // TODO enable this later
				browser: true,
				globals: {
					Cookies: true,
					module: true,
					catan: true,
					require: true,
					$: true,
					core: true,
					jQuery: true,
					console: true,
				}
			},
			base: {
				src: [
					srcDir + '/client/*.js'
				]
			},
			controllers: {
				src: [
					srcDir + '/client/controllers/**/*.js'
				]
			},
			models: {
				src: [
					srcDir + '/client/model/**/*.js'
				]
			},
			tests: {
				options: {
					globals: {
						global: true,
						test: true,
						suite: true,
						setup: true,
						console: true,
						module: true,
						catan: true,
						require: true,
						$: true,
						core: true,
						jQuery: true,
					}
				},
				files: {
					src: [testDir + '/js/**/*.js']
				}
			}
		},
		mochacov: {
			options: {
				coveralls: false,
				ui: 'tdd',
				reporter: 'html-cov',
				output: 'coverage.html'
			},
			all: ['test/server/**/*.js']
		},
		browserify: {
			src: {
				src: srcJsFile,
				dest: browserifyOutput,
				options: {
					standalone: 'impl'
				}
			},
			hackatan: {
				src: srcDir + '/client/hackatan/index.js',
				dest: gameplay + '/js/hackatan.js',
				options: {
					standalone: 'hackatan'
				}
			},
			test: {
				src: testDir + '/js/**/*.js',
				dest: testJsOutput
			}
		},
		concat: {
			framework: {
				options: {
					process: function(src, filepath) {
						return '//#### Src: ' + filepath + '\n' + src;
					}
				},
				src: frameworkFiles,
				dest: frameworkJsOutput,
				filter: function(filename) {
					var ignore = [browserifyOutput, testJsOutput, frameworkJsOutput];
					return (ignore.indexOf(filename) < 0);
				}
			},
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: pkgSrc + '/',
					src: ['**'],
					dest: buildDir + '/'
				}, {
					expand: true,
					cwd: srcDir + '/server/public/',
					src: ['**'],
					dest: gameplay + '/'
				}]
			},
			test: {
				files: [{
					expand: true,
					cwd: srcDir + '/server/public/',
					src: ['test.html'],
					dest: buildDir + '/gameplay/'
				}]
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'progress',
					run: true,
					ui: 'tdd',
					bail: false,
					logErrors: true,
					log: true
				},
				src: ['test/client/**/*.js']
			},
			testServer: {
				options: {
					reporter: 'spec',
					run: true,
					ui: 'bdd',
					bail: false,
					logErrors: true,
					log: true
				},
				src: ['test/server/**/*.js', 'test/common/**/*.js']
			}
		},
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				options: {
					paths: [srcDir + '/', pkgSrc + '/gameplay/js/'],
					outdir: yuiOutput
				}
			}
		}
	});

	grunt.registerTask('default', ['copy', 'browserify', 'concat', 'jshint', 'test']);
	grunt.registerTask('all', ['copy', 'browserify', 'concat', 'yuidoc:compile', 'jshint', 'test']);
	grunt.registerTask('build', ['copy', 'browserify', 'concat', 'yuidoc:compile']);

	grunt.registerTask('clean', 'Delete build folder', function() {
		grunt.file.delete(buildDir + '/');
	});
	grunt.registerTask('realclean', 'Delete build folder', function() {
		grunt.task.run(['clean']);
		grunt.file.delete('node_modules/');
	});
	grunt.registerTask('test', 'Test models', function() {
		grunt.log.writeln('Copying files to build output: ' + buildDir + '/');
		grunt.task.run(['browserify:test', 'copy:test']);
		var toFile = grunt.option('output') || '';
		if (toFile){
			grunt.config('mochaTest.test.options.captureFile', toFile);
			grunt.config('mochaTest.testServer.options.captureFile', toFile);
		}

		var grep = grunt.option('grep') || '';
		if (grep){
			grunt.config('mochaTest.test.options.grep', grep);
			grunt.config('mochaTest.testServer.options.grep', grep);
		}

		var reporter = grunt.option('reporter') || 'spec';
		grunt.config('mochaTest.test.options.reporter', reporter);
		grunt.config('mochaTest.testServer.options.reporter', reporter);

		grunt.task.run(['mochaTest']);
	});
	grunt.registerTask('testServer', function(){
		var toFile = grunt.option('output') || '';
		if (toFile)
			grunt.config('mochaTest.testServer.options.captureFile', toFile);

		var grep = grunt.option('grep') || '';
		if (grep)
			grunt.config('mochaTest.testServer.options.grep', grep);

		var reporter = grunt.option('reporter') || 'spec';
		grunt.config('mochaTest.testServer.options.reporter', reporter);

		grunt.task.run(['mochaTest:testServer']);	
	});
	grunt.registerTask('coverage', ['mochacov']);
	grunt.registerTask('serve', ['shell:serve']);
	grunt.registerTask('docs', ['copy', 'yuidoc:compile']);
};
