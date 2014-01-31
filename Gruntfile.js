module.exports=function(grunt){
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	var jsDir='gameplay/js';
	var jsOutput=jsDir+'/app.js';
	var testDir ='test';
	var testJsOutput=jsDir+'/test.js';
	var buildDir='build';
	var yuiOutput='docs/javascript/';

	var frameworkFiles=[
	jsDir+'/Core.js',
	jsDir+'/view_basics/BasicController.js',
	jsDir+'/view_basics/BasicDefs.js',
	jsDir+'/view_basics/BasicDisplayElement.js',
	jsDir+'/display_elements/AmountChangeDisplayElement.js',
	jsDir+'/display_elements/ButtonDisplayElement.js',
	jsDir+'/display_elements/ChooserDisplayElement.js',
	jsDir+'/display_elements/ComboDisplayElement.js',
	jsDir+'/display_elements/PointDisplayElement.js',
	jsDir+'/display_elements/RobDisplayElement.js',
	jsDir+'/display_elements/TrackerDisplayElement.js',
	jsDir+'/display_elements/CommDisplayElement.js',
	jsDir+'/model/board/map/hexgrid.js',
	jsDir+'/model/board/map/hexgrid_impl.js',
	jsDir+'/model/clientmodel.js',
	jsDir+'/view_basics/BasicOverlay.js',
	jsDir+'/trading/AcceptOverlay.js',
	jsDir+'/view_basics/WaitOverlay.js',
	jsDir+'/development_cards/CardOverlay.js',
	jsDir+'/development_cards/BuyOverlay.js',
	jsDir+'/development_cards/CardController.js',
	jsDir+'/map/MapOverlay.js',
	jsDir+'/discard/DiscardOverlay.js',
	jsDir+'/roll/RollOverlay.js',
	jsDir+'/roll/RollResultOverlay.js',
	jsDir+'/discard/DiscardController.js',
	jsDir+'/points/GameOverOverlay.js',
	jsDir+'/roll/RollController.js',
	jsDir+'/turn_tracker/TrackerView.js',
	jsDir+'/turn_tracker/TrackerController.js',
	jsDir+'/resources/ResourcesView.js',
	jsDir+'/resources/ResourcesController.js',
	jsDir+'/points/PointsView.js',
	jsDir+'/points/PointsController.js',
	jsDir+'/comms_box/CommView.js',
	jsDir+'/comms_box/CommController.js',
	jsDir+'/trading/MaritimeView.js',
	jsDir+'/trading/MaritimeController.js',
	jsDir+'/trading/DomesticView.js',
	jsDir+'/trading/DomesticController.js',
	jsDir+'/map/RobberOverlay.js',
	jsDir+'/map/MapView.js',
	jsDir+'/map/MapController.js',
	jsDir+'/GameplayConnections.js'
	];

	var browserifyOutput=buildDir+'/models.js';

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		browserify:{
			models:{
				noParse:frameworkFiles,
				src:[jsDir+'/model/*.js'],
				dest:browserifyOutput
			}
		},
		concat:{
			debug:{
				options:{
					process: function(src,filepath){
						return '//#### Src: ' + filepath + '\n' + src;
					}
				},
				src:[frameworkFiles,browserifyOutput],
				dest:jsOutput,
				filter:'isFile'
			},
			release:{
				options:{
					stripBanners:true,
					banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				src:jsDir+'/**/*',
				dest:jsOutput,
				filter:'isFile'
			},
			test:{
				options:{
					process: function(src,filepath){
						return '//#### Src: ' + filepath + '\n' + src;
					}
				},
				src:testDir+'/js/**/*',
				dest:testJsOutput,
				filter:'isFile'
			}
		},
		uglify:{
			release:{
				options:{
					mangle: {
						except: ['catan']
					}
				},
				src:jsOutput,
				dest:jsOutput
			}
		},
		yuidoc:{
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				options: {
					paths: jsDir,
					outdir: yuiOutput
				}
			}
		}
	});

grunt.registerTask('default',['browserify:models','concat:debug']);
grunt.registerTask('release',['browserify:models','concat:release','uglify:release']);
grunt.registerTask('test',['concat:test']);
grunt.registerTask('docs',['yuidoc:compile']);
};