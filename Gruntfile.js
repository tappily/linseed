module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                assets: '<%= connect.app.options.base %>/asset',
                data: ['bower.json'],
                layoutdir: 'src/template/layout',
                partials: 'src/template/partial/*.hbs'
            },
            dist: {
                options: {
                    data: ['src/data/**/*.json'],
                    layout: 'default.hbs',
                    flatten: true
                },
                files: {
                    '<%= connect.app.options.base %>/': ['src/template/page/*.hbs']
                }
            }
        },
        autoprefixer: {
            less: {
                src: '.grunt/less/*.css',
                dest: '<%= assemble.options.assets %>/css/<%= pkg.name %>.css'
            }
        },
        bower: {
            all: {
                options: {
                    exclude: ['normalize-css']
                },
                rjsConfig: 'src/js/config.js'
            }
        },
        clean: {
            temp: ['.grunt'],
            dist: ['dist']
        },
        connect: {
            options: {
                hostname: grunt.option('connect-hostname') || 'localhost'
            },
            app: {
                options: {
                    base: '.grunt/connect/<%= pkg.name %>',
                    livereload: true,
                    open: true
                }
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['js/linseed.js'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/asset',
                        src: ['img/**'],
                        dest: '<%= connect.app.options.base %>/asset/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        'gh-pages': {
            options: {
                base: '<%= connect.app.options.base %>'
            },
            src: '**/*'
        },
        jshint: {
            options: {
                jshintrc: true
            },
            configurations: ['Gruntfile.js', 'bower.json', 'package.json'],
            sources: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: ['src/js/**/*.js']
                }
            }
        },
        less: {
            develop: {
                options: {
                    strictUnits: true,
                    strictMath: true
                },
                files: {
                    '.grunt/less/<%= pkg.name %>.css': 'src/less/main.less'
                }
            }
        },
        lesslint: {
            options: {
                formatters: [
                    {
                        id: 'csslint-xml',
                        dest: 'report/lesslint.xml'
                    }
                ]
            },
            main: {
                src: ['src/less/main.less']
            }
        },
        release: {
            options: {
                file: 'bower.json'
            }
        },
        requirejs: {
            options: {
                baseUrl: 'src/js',
                locale: 'en-us',
                mainConfigFile: 'src/js/config.js',
                name: 'almond'
            },
            combine: {
                options: {
                    optimize: 'none',
                    include: ['main'],
                    out: '<%= assemble.options.assets %>/js/<%= pkg.name %>.js'
                }
            }
        },
        watch: {
            assets: {
                files: ['<%= assemble.options.assets %>/**'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: 'src/less/**/*.less',
                tasks: ['lesslint', 'less', 'autoprefixer']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['requirejs:combine']
            },
            template: {
                files: ['src/template/**/*.hbs'],
                tasks: ['requirejs:combine', 'assemble', 'copy:img']
            }
        }
    });

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean', 'test', 'copy:js']);

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('site', ['build', 'lesslint', 'less', 'autoprefixer', 'requirejs', 'assemble', 'copy:img']);

    grunt.registerTask('live', ['site', 'connect:app', 'watch']);

    grunt.registerTask('deploy', ['site', 'gh-pages']);
};
