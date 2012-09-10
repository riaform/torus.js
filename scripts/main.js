(function() {

  define.amd.jQuery = true;

  this.require.config({
    baseUrl: '/scripts',
    paths: {
      "jquery": "./jquery-1.8.0",
      "knockout": "./knockout-2.1.0",
      "jquery.easing": "./jquery.easing.1.3"
    }
  });

  this.require(["jquery", "knockout", "demo-viewmodel", "../src/switch-view.js", "../src/external-ko-template.js"], function($, ko, ViewModel, SwitchView) {
    return $(function() {
      $.ajaxSetup({
        cache: false
      });
      $("#main").text("KO: " + typeof ViewModel);
      return ko.applyBindings(new ViewModel());
    });
  });

}).call(this);
