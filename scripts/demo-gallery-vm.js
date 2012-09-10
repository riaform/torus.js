(function() {

  define(["knockout", "../src/ko-binding-nivo-slider.js"], function(ko) {
    var GalleryViewModel;
    return GalleryViewModel = (function() {

      function GalleryViewModel() {
        this.urls = ko.observableArray(["/content/one.jpg", "/content/two.jpg", "/content/three.jpg"]);
      }

      return GalleryViewModel;

    })();
  });

}).call(this);
