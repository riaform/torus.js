(function() {

  define.amd.jQuery = true;

  require.config({
    baseUrl: '/scripts',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
      "jquery": "jquery-1.8.0",
      "knockout": "knockout-2.1.0",
      "jquery.easing": "jquery.easing.1.3",
      "source": "/src",
      "jquery-ui": "jquery-ui-1.8.23"
    },
    shim: {
      "jquery.easing": ["jquery"],
      "jquery-ui": ["jquery"],
      "nivo-slider/jquery.nivo.slider": ["jquery"]
    }
  });

  require(["jquery", "knockout", "demo-viewmodel", "source/switch-view", "source/external-ko-template"], function($, ko, ViewModel, SwitchView, ExternalTemplateSource) {
    var ets;
    ets = ExternalTemplateSource;
    return $(function() {
      $.ajaxSetup({
        cache: false
      });
      $("#main").text("KO: " + typeof ViewModel);
      return ko.applyBindings(new ViewModel());
    });
  });

}).call(this);
