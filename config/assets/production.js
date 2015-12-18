'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
        'public/lib/font-awesome/css/font-awesome.min.css'
      ],
      js: [
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/bootstrap/dist/js/*.js',
        'public/lib/Chart.js/Chart.js',
        'public/lib/angular-chart.js/angular-chart.js',
        'public/lib/jquery/plugins/scrollbar/jquery.mCustomScrollbar.concat.min.js',
        'public/lib/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
        'public/lib/angular-file-upload/angular-file-upload.min.js',
        'public/lib/angular-ui-utils/index.js',
        'public/lib/angular-ui-event/dist/event.min.js',
        'public/lib/angular-ui-indeterminate/dist/indeterminate.min.js',
        'public/lib/angular-ui-mask/dist/mask.min.js',
        'public/lib/angular-ui-scroll/dist/ui-scroll.min.js',
        'public/lib/angular-ui-scrollpoint/dist/scrollpoint.min.js',
        'public/lib/angular-ui-uploader/dist/uploader.min.js',
        'public/lib/angular-ui-validate/dist/validate.min.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  }
};
