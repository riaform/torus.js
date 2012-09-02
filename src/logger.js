(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery"], function($) {
    var Logger;
    return Logger = (function() {

      function Logger(elementSelector) {
        this.elementSelector = elementSelector;
        this.logObject = __bind(this.logObject, this);

        this.logMessage = __bind(this.logMessage, this);

        this.logError = __bind(this.logError, this);

      }

      Logger.prototype.logError = function(err, message) {
        return $(this.elementSelector).prepend($("<div>").text(message + ": " + JSON.stringify(err)));
      };

      Logger.prototype.logMessage = function(message) {
        return $(this.elementSelector).prepend($("<div>").text(message));
      };

      Logger.prototype.logObject = function(obj, message) {
        return $(this.elementSelector).prepend($("<div>").text(message + ": " + JSON.stringify(obj)));
      };

      return Logger;

    })();
  });

}).call(this);
