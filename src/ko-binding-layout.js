(function() {

  define(["knockout", "jquery", "jquery.layout"], function(ko, $) {
    return ko.bindingHandlers.jqueryLayout = {
      init: function(element, valueAccessor, allBindingAccessor, viewModel) {
        return $(element).layout(ko.utils.unwrapObservable(valueAccessor()));
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        return $(element).layout(ko.utils.unwrapObservable(valueAccessor()));
      }
    };
  });

}).call(this);
