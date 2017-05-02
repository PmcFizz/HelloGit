// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['./vendors/angular/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['./vendors/angular/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['./vendors/angular/vendor/jquery/charts/flot/jquery.flot.min.js',
                          './vendors/angular/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          './vendors/angular/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          './vendors/angular/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          './vendors/angular/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          './vendors/angular/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['./vendors/angular/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['./vendors/angular/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['./vendors/angular/vendor/jquery/nestable/jquery.nestable.js',
                          './vendors/angular/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['./vendors/angular/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['./vendors/angular/vendor/jquery/slider/bootstrap-slider.js',
                          './vendors/angular/vendor/jquery/slider/slider.css'],
      chosen:         ['./vendors/angular/vendor/jquery/chosen/chosen.jquery.min.js',
                          './vendors/angular/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['./vendors/angular/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          './vendors/angular/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['./vendors/angular/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          './vendors/angular/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['./vendors/angular/vendor/jquery/datatables/jquery.dataTables.min.js',
                          './vendors/angular/vendor/jquery/datatables/dataTables.bootstrap.js',
                          './vendors/angular/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['./vendors/angular/vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                          './vendors/angular/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          './vendors/angular/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          './vendors/angular/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['./vendors/angular/vendor/jquery/footable/footable.all.min.js',
                          './vendors/angular/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'nestable',
                  files:['./vendors/angular/vendor/jquery/nestable/jquery.nestable.js',
                      './vendors/angular/vendor/jquery/nestable/nestable.css']
              },
              {
                  name: 'ngGrid',
                  files: [
                      './vendors/angular/vendor/modules/ng-grid/ng-grid.min.js',
                      './vendors/angular/vendor/modules/ng-grid/ng-grid.min.css',
                      './vendors/angular/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      './vendors/angular/vendor/modules/angular-ui-select/select.min.js',
                      './vendors/angular/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    './vendors/angular/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['./vendors/angular/vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      './vendors/angular/vendor/modules/ngImgCrop/ng-img-crop.js',
                      './vendors/angular/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      './vendors/angular/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      './vendors/angular/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      './vendors/angular/vendor/modules/angularjs-toaster/toaster.js',
                      './vendors/angular/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      './vendors/angular/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      './vendors/angular/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      './vendors/angular/vendor/modules/angular-slider/angular-slider.min.js',
                      './vendors/angular/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      './vendors/angular/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      './vendors/angular/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      './vendors/angular/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      './vendors/angular/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      './vendors/angular/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      './vendors/angular/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;