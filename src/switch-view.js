(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
        var alias, aliases, foundView, i, ignore, ignores, observ, p, _i, _j, _k, _len, _len1, _len2, _ref, _results;
        aliases = this[key + "Alias"];
        ignores = this[key + "Ignore"];
        aliases.push(key);
        _ref = this.propertyNames;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          p = _ref[i];
          observ = this.properties[i];
          foundView = false;
          for (_j = 0, _len1 = aliases.length; _j < _len1; _j++) {
            alias = aliases[_j];
            if (alias === p) {
              observ(value);
              foundView = true;
              break;
            }
          }
          for (_k = 0, _len2 = ignores.length; _k < _len2; _k++) {
            ignore = ignores[_k];
            if (ignore === p) {
              foundView = true;
              break;
            }
          }
          if (!foundView) {
            _results.push(observ(null));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      SwitchView.prototype.setupProperty = function(name, options) {
        var aliases, _ref, _ref1,
          _this = this;
        aliases = (_ref = options.alises) != null ? _ref : [];
        this[name] = ko.observable(null);
        this.properties.push(this[name]);
        this.propertyNames.push(name);
        this[name + "Alias"] = aliases != null ? aliases : [];
        this["show" + name[0].toUpperCase() + name.slice(1)] = function() {
          return _this.reset(name, options.activate());
        };
        return this[name + "Ignore"] = (_ref1 = options.ignore) != null ? _ref1 : [];
      };

      return SwitchView;

    })();
  });

}).call(this);
