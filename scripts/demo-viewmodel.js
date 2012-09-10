(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["/src/switch-view.js", "demo-animate-layout-vm", "demo-base64-vm", "demo-gallery-vm"], function(SwitchView, AnimateLayoutViewModel, Base64DemoViewModel, GalleryViewModel) {
    var DemoViewModel;
    return DemoViewModel = (function(_super) {

      __extends(DemoViewModel, _super);

      function DemoViewModel() {
        this.showGallery = __bind(this.showGallery, this);

        this.showBase64 = __bind(this.showBase64, this);

        this.showAnimateLayout = __bind(this.showAnimateLayout, this);
        DemoViewModel.__super__.constructor.call(this);
        this.setupProperty("animateLayout");
        this.setupProperty("base64");
        this.setupProperty("gallery");
      }

      DemoViewModel.prototype.showAnimateLayout = function() {
        return this.reset("animateLayout", new AnimateLayoutViewModel());
      };

      DemoViewModel.prototype.showBase64 = function() {
        return this.reset("base64", new Base64DemoViewModel());
      };

      DemoViewModel.prototype.showGallery = function() {
        return this.reset("gallery", new GalleryViewModel());
      };

      return DemoViewModel;

    })(SwitchView);
  });

}).call(this);
