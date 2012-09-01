(function() {

  define.amd.jQuery = true;

  this.require.config({
    paths: {
      "jquery": "./jquery-1.8.0",
      "knockout": './knockout-2.1.0.debug',
      "komapping": './knockout.mapping-latest.debug',
      "switchview": './src/switchview',
      "external-ko-template": "./src/external-ko-template"
    }
  });

  this.require(["jquery", "code/switchViewContact", "knockout", "external-ko-template"], function($, SwitchViewContact, ko) {
    this.$ = $;
    return $(function() {
      var view;
      $("#main").text("KO: " + typeof ko);
      view = new SwitchViewContact();
      ko.applyBindings(view);
      return view.showGallery(["one", "two"]);
    });
  });

}).call(this);
