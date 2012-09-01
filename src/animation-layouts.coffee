# file
define ["jquery"], ($) ->
    class AnimationBetweenLayouts

        constructor() ->
            @containerPos = null

        # function to animate items between layouts
        animateBetweenLayouts: (item, source, target) =>
            keepSource = source
            keepTarget = target
            movedItem = item
            newItem = $(item).clone(false, false)
            pos = $(item).offset()
            $(newItem).css("position", "absolute").css("left", pos.left - containerPos.left).css("top", pos.top - containerPos.top)
            $("#container").append($(newItem))
            $(target).append($(item))
            newPos = $(item).offset()
            $(item).hide()
            $(newItem).animate
                left: newPos.left - containerPos.left,
                top: newPos.top - containerPos.top
            , 1300, "swing", () =>
                $(this).remove()
                $(movedItem).show()
                $(movedItem).one "click", () ->
                    animate(movedItem, keepTarget, keepSource)