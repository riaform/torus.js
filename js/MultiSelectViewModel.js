(function() {
  var MultiSelectViewModel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MultiSelectViewModel = (function() {

    MultiSelectViewModel.name = 'MultiSelectViewModel';

    MultiSelectViewModel.prototype.any = function(obj, iterator) {
      var o, _i, _len;
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        o = obj[_i];
        if (iterator(o)) {
          return true;
        }
      }
      return false;
    };

    function MultiSelectViewModel(selection, data, keyfn, container) {
      var d, obj, self, _i, _len,
        _this = this;
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

      if (!this.container) {
        this.container = "body";
      }
      if (this.keyfn == null) {
        this.keyfn = function(obj) {
          return JSON.stringify(obj);
        };
      }
      this.source = ko.observableArray([]);
      d = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        obj = data[_i];
        if (!this.any(this.selection(), function(i) {
          return _this.keyfn(i) === _this.keyfn(obj);
        })) {
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
      this.topOffset = $("body").offset();
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
        left: targetPos.left - this.topOffset.left,
        top: targetPos.top - this.topOffset.top
      }, 500, "easeOutCubic", function() {
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
        left: pos.left - this.topOffset.left,
        top: pos.top - this.topOffset.top
      }, 500, "easeOutCubic", function() {
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
