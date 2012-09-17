(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["source/switch-view", "demo-animate-layout-vm", "demo-base64-vm", "demo-gallery-vm", "demo-date-picker", "demo-file-upload"], function(SwitchView, AnimateLayoutViewModel, Base64DemoViewModel, GalleryViewModel, DatePickerDemoViewModel, FileUploadDemoViewModel) {
    var DemoViewModel;
    return DemoViewModel = (function(_super) {

      __extends(DemoViewModel, _super);

      function DemoViewModel() {
        var _this = this;
        DemoViewModel.__super__.constructor.call(this);
        this.setupProperty("animateLayout", {
          activate: function(data) {
            return new AnimateLayoutViewModel();
          }
        });
        this.setupProperty("base64", {
          activate: function(data) {
            return new Base64DemoViewModel();
          }
        });
        this.setupProperty("gallery", {
          activate: function(data) {
            return new GalleryViewModel();
          }
        });
        this.setupProperty("datePicker", {
          activate: function(data) {
            return new DatePickerDemoViewModel();
          }
        });
        this.setupProperty("fileUpload", {
          activate: function(data) {
            return new FileUploadDemoViewModel();
          }
        });
      }

      return DemoViewModel;

    })(SwitchView);
  });

}).call(this);
