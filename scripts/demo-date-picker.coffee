define ["knockout","source/ko-binding-date-picker"], (ko) ->
    class DatePickerDemoViewModel
        constructor: () ->
            @source = ko.observable(new Date().toDateString())

        