module.exports = function(grunt) {

    grunt.initConfig(
        {
            // ----- Environment
            project : grunt.file.readJSON('package.json'),
            dir : {
                // location of all source files
                "source_js" : "assets/source/script/",
                "target_js" : "assets/build/script/",
                "source_css": "assets/source/css/",
                "target_css": "assets/build/css/"
            },
            // --- Optional: make javascript small (and unreadable)
            // See https://github.com/gruntjs/grunt-contrib-uglify
            // Note: Consider doing the uglification in the _final_ webapp
            uglify : {
                options : {
                    beautify : {
                        width : 80,
                        beautify : true
                    },
                    banner : '/*! <%= project.name %> - v<%= project.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                minify_js : {
                    files: {
                        '<%= dir.target_js %>plainmodal.min.js':
                            [
                                '<%= dir.source_js%>util.js',
                                '<%= dir.source_js%>modal.js'
                            ]
                    }
                }
            },
            jslint: { // configure the task
                // lint your project's server code
                check: {
                    src: [ // some example files
                        '<%= dir.source_js%>util.js',
                        '<%= dir.source_js%>modal.js'
                    ],
                    exclude: [
                        '<%= dir.source_js%>original-modal.js'
                    ],
                    directives: { // example directives
                        node: true,
                        todo: true
                    },
                    options: {
                        edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                        junit: 'assets/source/lintoutput/check-junit.xml', // write the output to a JUnit XML
                        log: 'assets/source/lintoutput/check-lint.log',
                        errorsOnly: true, // only display errors
                        failOnError: false // defaults to true
                    }
                }
            },
            cssmin: {
                add_banner: {
                    options: {
                        banner: '/*! <%= project.name %> - v<%= project.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                    },
                    files: {
                        '<%= dir.target_css%>modal.min.css': ['<%= dir.source_css%>*.css']
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', [ 'uglify', 'cssmin']);
    grunt.registerTask('lint', ['jslint']);
};
