(function() {

  define(["knockout", "source/ko-binding-nivo-slider"], function(ko) {
    var GalleryViewModel;
    return GalleryViewModel = (function() {

      function GalleryViewModel() {
        this.urls = ko.observableArray(["Content/one.jpg", "Content/two.jpg", "Content/three.jpg"]);
      }

      return GalleryViewModel;

    })();
  });

}).call(this);
