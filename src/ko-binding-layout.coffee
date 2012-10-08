define ["knockout","jquery","jquery.layout"], (ko,$) ->
    ko.bindingHandlers.jqueryLayout =
        # call the jquery layout plugin on the bound element.  Pass in the structure from the databind for options 
        init: (element, valueAccessor, allBindingAccessor, viewModel) ->
            viewModel.layout = $(element).layout ko.utils.unwrapObservable(valueAccessor())
        update: (element, valueAccessor, allBindingsAccessor, viewModel) ->
            viewModel.layout = $(element).layout ko.utils.unwrapObservable(valueAccessor())
