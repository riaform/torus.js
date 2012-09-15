(function() {

  define(["knockout", "source/ko-binding-image-upload"], function(ko) {
    var FileUploadDemoViewModel;
    return FileUploadDemoViewModel = (function() {

      function FileUploadDemoViewModel() {
        this.imageUrl = ko.observable();
      }

      return FileUploadDemoViewModel;

    })();
  });

}).call(this);
