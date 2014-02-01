module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');

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

	var srcJsFiles = srcDir + '/js/**/*.js';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        laxcomma: true,
        '-W058': true,
        '-W014': true,
        '-W099': true,
        undef: true,
        // unused: true, // TODO enable this later
        globals: {
          module: true,
          catan: true,
          require: true,
          $: true
        }
      },
      models: [
        srcDir + '/js/model/**/*.js'
      ],
      tests: {
        options: {
          globals: {
            test: true,
            suite: true
          }
        },
        files: [testDir + '/js/**/*.js']
      }
    },
		browserify: {
			src: {
				src: srcJsFiles,
				dest: browserifyOutput
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
					cwd: srcDir + '/gameplay/',
					src: ['**'],
					dest: gameplay + '/'
				}]
			}
		},
		mochaTest: {
			model: {
				options: {
					ui: 'tdd',
					reporter: 'spec'
				},
				src: [testDir + '/js/model/**/*Test.js']
			}
		},
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				options: {
					paths: [srcDir + '/js/', pkgSrc + '/gameplay/js/'],
					outdir: yuiOutput
				}
			}
		}
	});

	grunt.registerTask('default', ['copy', 'browserify', 'concat']);
	grunt.registerTask('all', ['copy', 'browserify', 'concat','docs','test']);

	grunt.registerTask('clean', 'Delete build folder', function() {
		grunt.file.delete(buildDir + '/');
	});
	grunt.registerTask('test', 'Test models', function() {
		var reporter = grunt.option('reporter') || 'spec';
		grunt.config('mochaTest.model.options.reporter', reporter);
		grunt.task.run(['browserify:test', 'mochaTest:model']);
	});
	grunt.registerTask('docs', ['copy', 'yuidoc:compile']);
};
