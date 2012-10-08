(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["source/base64", "knockout", "source/logger"], function(Base64, ko, logger) {
    var Base64DemoViewModel;
    Base64 = Base64.Base64;
    return Base64DemoViewModel = (function() {

      function Base64DemoViewModel() {
        this.convertFromBase64 = __bind(this.convertFromBase64, this);

        this.convertToBase64 = __bind(this.convertToBase64, this);
        this.source = ko.observable("FOO");
        this.target = ko.observable("");
      }

      Base64DemoViewModel.prototype.convertToBase64 = function() {
        return this.target(Base64.encode(this.source()));
      };

      Base64DemoViewModel.prototype.convertFromBase64 = function() {
        return this.source(Base64.decode(this.target()));
      };

      return Base64DemoViewModel;

    })();
  });

}).call(this);
