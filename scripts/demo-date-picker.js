(function() {

  define(["knockout", "source/ko-binding-date-picker"], function(ko) {
    var DatePickerDemoViewModel;
    return DatePickerDemoViewModel = (function() {

      function DatePickerDemoViewModel() {
        this.source = ko.observable(new Date().toDateString());
      }

      return DatePickerDemoViewModel;

    })();
  });

}).call(this);
