# A class to handle multi-selection bindings 
class MultiSelectViewModel

    # The design of this small ViewModel class is to support animating between a source
    # and a destination for the purposes of multi-selection
    # *    The source data includes the current selected items (selection) and the entire set of data (data)
    # * The selection NEEDS TO BE an ObservableArray (KO)
    # * For comparison purposes a lambda is passed that returns the identity of the object, this is optional and defaults to JSON
    # * The animation is template based, a new DOM object is created using a common parent container between the source and the target
    # * The animation is driven entirely by events on the selection.  The event sequence is as follows:
    #    * afterAdd event fired, element is created - it's location is queued into the VM and it display is set to none
    #    * item is removed from the @source
    #    * beforeRemove event is dired, element is removed from the source container
    #        * new floating item is created in parent container at removed item's location
    #        * target destiination is popped from the VM queue (see earlier)
    #        * element is animated to target
    #        * On animation complete, floating element is destroyed and added element is shown (display:show)

    # take two arrays, the selection and the choice from the selection
    # data is the source of the array, all possible values
    # keyfn is the function returning the identity of the object
    constructor: (@selection, data, @keyfn, @container) ->
        @keyfn ?= (obj) -> JSON.stringify(obj)        # use JSON stringify if no key function
        #  @selection = ko.observableArray(@selection) if not typeof @selection=="function"
        @source = ko.observableArray([])                                # set-up source array, items not in selection
        @source.push obj for obj in data when (o for o in @selection when @keyfn(o)==@keyfn(obj)).length==0
        @targetLocations = []
        @addedElements = []
        self = @        # have to provide local functions because of problems with overriding the context from the binding
        @afterAddTargetElement = (elem,index,item) -> self.afterAddTarget(elem,index,item)
        @afterAddSourceElement = (elem,index,item) -> self.afterAddSource(elem,index,item)
        @beforeRemoveSourceElement = (elem,index,item) -> self.beforeRemoveSource(elem,index,item)
        @beforeRemoveTargetElement = (elem,index,item) -> self.beforeRemoveTarget(elem,index,item)
        @topOffset = $("body").offset()

    beforeRemoveSource: (removedElement,index,item) =>
        return if (removedElement.nodeType != 1) 
        pos = $(removedElement).offset() 
        targetPos = @targetLocations.pop()
        addedElement = @addedElements.pop()
        # create a floating element to animate
        removedElement.removeAttribute("data-bind")
        $(removedElement).css("position", "absolute").css("left", pos.left ).css("top", pos.top );
        $(@container).append($(removedElement));
        # finish the removal and set-up the animation
        $(removedElement).animate
            left: targetPos.left - @topOffset.left,
            top: targetPos.top - @topOffset.top,
            500, "easeOutCubic", () =>     # when complete, remove the floating item and show the addedElement
                $(removedElement).remove()
                $(addedElement).css("visibility","visible")

    afterAddSource: (sourceElement,index,item) =>
        return if (sourceElement.nodeType != 1) 
        pos = $(sourceElement).offset()
        startingPos = @targetLocations.pop()
        # create a floating element to animate
        floatingItem = $(sourceElement).clone(false, false);
        $(floatingItem).css("position", "absolute").css("left", startingPos.left ).css("top", startingPos.top );
        $(@container).append($(floatingItem));
        $(sourceElement).css("visibility","hidden")
        addedElement = sourceElement
        # finish the removal and set-up the animation
        $(floatingItem).animate
            left: pos.left - @topOffset.left,
            top: pos.top - @topOffset.top,
            500, "easeOutCubic", () =>     # when complete, remove the floating item and show the addedElement
                $(floatingItem).remove()
                $(addedElement).css("visibility","visible")

    afterAddTarget: (elem,index,item) =>
        return if (elem.nodeType != 1)
        @targetLocations.push $(elem).offset()
        @addedElements.push elem
        $(elem).css("visibility","hidden")          # don't show the element until animation is complete
        # remove the item from the source asynchronously - a problem with the nested calling in Knockout
        _item = item
        setTimeout( ( () => @source.remove(_item)), 0 )      # triggers the 'beforeAnimate' callback, do not recurse

    beforeRemoveTarget: (elem,index,item) =>
        return if (elem.nodeType != 1)
        @targetLocations.push($(elem).offset())
        $(elem).remove()
        _item = item
        setTimeout( ( () => @source.push(_item)), 0 )      # triggers the 'beforeAnimate' callback, sourceAdd do not recurse

    # two public functions to add / remove from selection
    add: (elem) => @selection.push( elem )
    remove: (elem) => @selection.remove( elem )

    getSelection: (elem) => @selection()

@.MultiSelectViewModel = MultiSelectViewModel