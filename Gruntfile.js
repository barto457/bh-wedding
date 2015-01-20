var browserSync = require("browser-sync");

module.exports = function(grunt) {

	grunt.initConfig({

		path: 'static/', // These needs to match any folders between your Gruntfile.js and your scss or css folders eg. static/

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				spawn: false
			},
			scss: {
				files: '<%= path %>scss/*.scss',
				tasks: ['sass', 'autoprefixer', 'bs-inject']
			},
			staticFiles: {
				files: ['**/*.html','**/*.php'],
				tasks: ['bs-inject']
			}
		},

		sass: {
			dist: {
				options: {
					style: 'nested'
				}, 
				files: [{
					expand: true,
					cwd: '<%= path %>scss',
					src: ['*.scss', '!_*.scss'],
					dest: '<%= path %>css',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			dist: {
				src: '<%= path %>css/screen.css'
			},
			options: {
				map: true
			}
		},

		shell: {
			breakdown: {
				command: 'breakdown',
				options: {
					stdout: true,
					stderr: true,
					failOnError: true,
					async: true
				}
			}
		}

	});

	grunt.registerTask("bs-init", function () {
        var done = this.async();
        browserSync({
            proxy: 'localhost:5000' // This needs to match your current server eg. localhost:5000 or mysite.design.concentricsky.com
        }, function (err, bs) {
            done();
        });
    });

    grunt.registerTask("bs-inject", function () {
        browserSync.reload(['**/*.html','**/*.php','**/*.css']);
    });

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.registerTask('default',['shell', 'bs-init', 'watch']);
	grunt.registerTask('monitor',['bs-init', 'watch']);

}