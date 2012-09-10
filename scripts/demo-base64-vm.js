(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["source/base64", "knockout"], function(Base64, ko) {
    var Base64DemoViewModel;
    return Base64DemoViewModel = (function() {

      function Base64DemoViewModel() {
        this.convertFromBase64 = __bind(this.convertFromBase64, this);

        this.convertToBase64 = __bind(this.convertToBase64, this);
        this.source = ko.observable("FOO");
        this.target = ko.observable("");
        this.base64 = new Base64();
      }

      Base64DemoViewModel.prototype.convertToBase64 = function() {
        return this.target(this.base64.encode(this.source()));
      };

      Base64DemoViewModel.prototype.convertFromBase64 = function() {
        return this.source(this.base64.decode(this.target()));
      };

      return Base64DemoViewModel;

    })();
  });

}).call(this);
