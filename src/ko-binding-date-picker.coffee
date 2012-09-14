define ["knockout","jquery","jquery-ui"], (ko,$) ->
    ko.bindingHandlers.datePicker =
        init: (element, valueAccessor, allBindingAccessor, viewModel) ->
            $(element).datepicker( valueAccessor())
        update: (element, valueAccessor, allBindingsAccessor, viewModel) ->
            $(element).datepicker( valueAccessor())
