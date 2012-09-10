(function() {

  define.amd.jQuery = true;

  require.config({
    baseUrl: '/torus.js/scripts',
    paths: {
      "jquery": "jquery-1.8.0",
      "knockout": "knockout-2.1.0",
      "jquery.easing": "jquery.easing.1.3",
      "src": "/torus.js/src"
    }
  });

  require(["jquery", "knockout", "demo-viewmodel", "src/switch-view.js", "src/external-ko-template.js"], function($, ko, ViewModel, SwitchView) {
    return $(function() {
      $.ajaxSetup({
        cache: false
      });
      $("#main").text("KO: " + typeof ViewModel);
      return ko.applyBindings(new ViewModel());
    });
  });

}).call(this);
