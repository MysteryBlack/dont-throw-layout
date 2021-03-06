module.exports = (grunt) ->
  require("load-grunt-tasks") grunt

  appConfig =
    dev: "app"
    dist: "dist"

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    app: appConfig
    # Put JavaScript
    coffee:
      options:
        bare: true
        sourceMap: true
        sourceRoot: ""
      dist:
        files: [
          expand: true
          cwd: "<%= app.dev %>"
          src: "{,**/}*.coffee"
          dest: "<%= app.dist %>"
          ext: ".js"
        ]
    # Put Jade
    jade:
      options:
        pretty: true
      dist:
        files: [
          expand: true
          cwd: "<%= app.dev %>"
          src: "{,**/}*.jade"
          dest: "<%= app.dist %>"
          ext: ".html"
        ]
    # Put Stylus
    stylus:
      options:
        compress: true
        use: [require('nib')]
      dist:
        files: [
          expand: true
          cwd: "<%= app.dev %>"
          src: "{,**/}*.styl"
          dest: "<%= app.dist %>"
          ext: ".css"
        ]
    concurrent:
      dist: ["jade","coffee","stylus"]
    clean: ["<%= app.dist %>"]
    copy: 
      main: 
        files: [
          {expand: true, src: ['bower_components/**'], dest: "<%= app.dist %>"}
          {expand: true, cwd:'<%= app.dev %>/', src: ['images/**'], dest: "<%= app.dist %>"}
          {expand: true, cwd:'<%= app.dev %>/', src: ['*.ico','{,**/}*.js','{,**/}*.css','{,**/}*.html'], dest: "<%= app.dist %>"}
        ]
    watch:
      jade:
        files: ["<%= app.dev %>/{,**/}*.jade"]
        tasks: ["jade"]
      coffee:
        files: ["<%= app.dev %>/{,**/}*.coffee"]
        tasks: ["coffee"]
      styl:
        files: ["<%= app.dev %>/{,**/}*.styl"]
        tasks: ["stylus"]
      other:
        files: ["<%= app.dev %>/{,**/}*.js","<%= app.dev %>/{,**/}*.css","<%= app.dev %>/{,**/}*.html","<%= app.dev %>/images/**"]
        tasks: ["copy"]
    connect:
      server:
        options:
          port: 9001,
          base: "<%= app.dist %>"
          hostname: "localhost"
      # livereload:
      #   options:
      #     middleware: (connect) ->
      #       [mountFolder(connect, "<%= app.dist %>")]

  grunt.registerTask "default", ["clean","copy","concurrent:dist", "connect",  "watch"]