define ["knockout","jquery","jquery-ui-1.8.23"], (ko,$) ->
    @ko.bindingHandlers.datePicker =
        init: (element, valueAccessor, allBindingAccessor, viewModel) ->
            $(element).datepicker( valueAccessor())
        update: (element, valueAccessor, allBindingsAccessor, viewModel) ->
            $(element).datepicker( valueAccessor())
