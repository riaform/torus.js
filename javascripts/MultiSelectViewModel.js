(function() {
  var MultiSelectViewModel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MultiSelectViewModel = (function() {

    MultiSelectViewModel.name = 'MultiSelectViewModel';

    function MultiSelectViewModel(selection, data, keyfn, container) {
      var o, obj, self, _i, _len;
      this.selection = selection;
      this.keyfn = keyfn;
      this.container = container;
      this.getSelection = __bind(this.getSelection, this);

      this.remove = __bind(this.remove, this);

      this.add = __bind(this.add, this);

      this.beforeRemoveTarget = __bind(this.beforeRemoveTarget, this);

      this.afterAddTarget = __bind(this.afterAddTarget, this);

      this.afterAddSource = __bind(this.afterAddSource, this);

      this.beforeRemoveSource = __bind(this.beforeRemoveSource, this);

      if (this.keyfn == null) {
        this.keyfn = function(obj) {
          return JSON.stringify(obj);
        };
      }
      this.source = ko.observableArray([]);
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        obj = data[_i];
        if (((function() {
          var _j, _len1, _ref, _results;
          _ref = this.selection;
          _results = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            o = _ref[_j];
            if (this.keyfn(o) === this.keyfn(obj)) {
              _results.push(o);
            }
          }
          return _results;
        }).call(this)).length === 0) {
          this.source.push(obj);
        }
      }
      this.targetLocations = [];
      this.addedElements = [];
      self = this;
      this.afterAddTargetElement = function(elem, index, item) {
        return self.afterAddTarget(elem, index, item);
      };
      this.afterAddSourceElement = function(elem, index, item) {
        return self.afterAddSource(elem, index, item);
      };
      this.beforeRemoveSourceElement = function(elem, index, item) {
        return self.beforeRemoveSource(elem, index, item);
      };
      this.beforeRemoveTargetElement = function(elem, index, item) {
        return self.beforeRemoveTarget(elem, index, item);
      };
    }

    MultiSelectViewModel.prototype.beforeRemoveSource = function(removedElement, index, item) {
      var addedElement, pos, targetPos,
        _this = this;
      if (removedElement.nodeType !== 1) {
        return;
      }
      pos = $(removedElement).offset();
      targetPos = this.targetLocations.pop();
      addedElement = this.addedElements.pop();
      removedElement.removeAttribute("data-bind");
      $(removedElement).css("position", "absolute").css("left", pos.left).css("top", pos.top);
      $(this.container).append($(removedElement));
      return $(removedElement).animate({
        left: targetPos.left,
        top: targetPos.top
      }, 900, "easeOutElastic", function() {
        $(removedElement).remove();
        return $(addedElement).css("visibility", "visible");
      });
    };

    MultiSelectViewModel.prototype.afterAddSource = function(sourceElement, index, item) {
      var addedElement, floatingItem, pos, startingPos,
        _this = this;
      if (sourceElement.nodeType !== 1) {
        return;
      }
      pos = $(sourceElement).offset();
      startingPos = this.targetLocations.pop();
      floatingItem = $(sourceElement).clone(false, false);
      $(floatingItem).css("position", "absolute").css("left", startingPos.left).css("top", startingPos.top);
      $(this.container).append($(floatingItem));
      $(sourceElement).css("visibility", "hidden");
      addedElement = sourceElement;
      return $(floatingItem).animate({
        left: pos.left,
        top: pos.top
      }, 700, "easeOutElastic", function() {
        $(floatingItem).remove();
        return $(addedElement).css("visibility", "visible");
      });
    };

    MultiSelectViewModel.prototype.afterAddTarget = function(elem, index, item) {
      var _item,
        _this = this;
      if (elem.nodeType !== 1) {
        return;
      }
      this.targetLocations.push($(elem).offset());
      this.addedElements.push(elem);
      $(elem).css("visibility", "hidden");
      _item = item;
      return setTimeout((function() {
        return _this.source.remove(_item);
      }), 0);
    };

    MultiSelectViewModel.prototype.beforeRemoveTarget = function(elem, index, item) {
      var _item,
        _this = this;
      if (elem.nodeType !== 1) {
        return;
      }
      this.targetLocations.push($(elem).offset());
      $(elem).remove();
      _item = item;
      return setTimeout((function() {
        return _this.source.push(_item);
      }), 0);
    };

    MultiSelectViewModel.prototype.add = function(elem) {
      return this.selection.push(elem);
    };

    MultiSelectViewModel.prototype.remove = function(elem) {
      return this.selection.remove(elem);
    };

    MultiSelectViewModel.prototype.getSelection = function(elem) {
      return this.selection();
    };

    return MultiSelectViewModel;

  })();

  this.MultiSelectViewModel = MultiSelectViewModel;

}).call(this);
