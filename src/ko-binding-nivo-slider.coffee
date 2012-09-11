define ["knockout","jquery","jquery.easing","jquery-ui","nivo-slider/jquery.nivo.slider"], (ko,$) ->
    ko.bindingHandlers.nivoSlider =
        # call the nivoSlider jquery plugin on the parent element.  Pass in the structure from the databind for options 
        init: (element, valueAccessor, allBindingAccessor, viewModel) ->
            if ($(element).find("img[src]").length==0) then return
            console.info "Nivo Initlal Options", JSON.stringify(valueAccessor())
            $(element).nivoSlider ko.utils.unwrapObservable(valueAccessor())
        update: (element, valueAccessor, allBindingsAccessor, viewModel) ->
            if ($(element).find("img[src]").length==0) then return 
            $.each( $(element).find("img[src]"), (i,e) -> e.removeAttribute("data-bind"))
            console.info "Nivo Update Options", JSON.stringify(valueAccessor())
            $(element).nivoSlider ko.utils.unwrapObservable(valueAccessor())
