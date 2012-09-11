(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  define(["knockout"], function(ko) {
    var SwitchView;
    return SwitchView = (function() {

      function SwitchView() {
        this.setupProperty = __bind(this.setupProperty, this);

        this.reset = __bind(this.reset, this);
        this.properties = [];
        this.propertyNames = [];
      }

      SwitchView.prototype.reset = function(key, value) {
        var alias, aliases, i, observ, p, _i, _j, _len, _len1, _ref, _results;
        aliases = this[key + "Alias"];
        aliases.push(key);
        _ref = this.propertyNames;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          p = _ref[i];
          observ = this.properties[i];
          for (_j = 0, _len1 = aliases.length; _j < _len1; _j++) {
            alias = aliases[_j];
            if (alias === p) {
              observ(value);
              break;
            }
          }
          _results.push(observ(null));
        }
        return _results;
      };

      SwitchView.prototype.setupProperty = function() {
        var aliases, name;
        name = arguments[0], aliases = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this[name] = ko.observable(null);
        this.properties.push(this[name]);
        this.propertyNames.push(name);
        return this[name + "Alias"] = aliases != null ? aliases : [];
      };

      return SwitchView;

    })();
  });

}).call(this);
