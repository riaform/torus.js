(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery"], function($) {
    var AnimationBetweenLayouts;
    return AnimationBetweenLayouts = (function() {

      function AnimationBetweenLayouts() {
        this.animateBetweenLayouts = __bind(this.animateBetweenLayouts, this);

      }

      constructor()(function() {
        return this.containerPos = null;
      });

      AnimationBetweenLayouts.prototype.animateBetweenLayouts = function(item, source, target) {
        var keepSource, keepTarget, movedItem, newItem, newPos, pos,
          _this = this;
        keepSource = source;
        keepTarget = target;
        movedItem = item;
        newItem = $(item).clone(false, false);
        pos = $(item).offset();
        $(newItem).css("position", "absolute").css("left", pos.left - containerPos.left).css("top", pos.top - containerPos.top);
        $("#container").append($(newItem));
        $(target).append($(item));
        newPos = $(item).offset();
        $(item).hide();
        return $(newItem).animate({
          left: newPos.left - containerPos.left,
          top: newPos.top - containerPos.top
        }, 1300, "swing", function() {
          $(_this).remove();
          $(movedItem).show();
          return $(movedItem).one("click", function() {
            return animate(movedItem, keepTarget, keepSource);
          });
        });
      };

      return AnimationBetweenLayouts;

    })();
  });

}).call(this);
