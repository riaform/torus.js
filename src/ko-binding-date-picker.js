(function() {

  define(["knockout", "jquery", "jquery-ui-1.8.23"], function(ko, $) {
    return this.ko.bindingHandlers.datePicker = {
      init: function(element, valueAccessor, allBindingAccessor, viewModel) {
        return $(element).datepicker(valueAccessor());
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        return $(element).datepicker(valueAccessor());
      }
    };
  });

}).call(this);
