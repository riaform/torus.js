(function() {

  define(["knockout", "jquery", "jquery.easing", "jquery-ui", "nivo-slider/jquery.nivo.slider"], function(ko, $) {
    return ko.bindingHandlers.nivoSlider = {
      init: function(element, valueAccessor, allBindingAccessor, viewModel) {
        if ($(element).find("img[src]").length === 0) {
          return;
        }
        return $(element).nivoSlider(ko.utils.unwrapObservable(valueAccessor()));
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        if ($(element).find("img[src]").length === 0) {
          return;
        }
        $.each($(element).find("img[src]"), function(i, e) {
          return e.removeAttribute("data-bind");
        });
        return $(element).nivoSlider(ko.utils.unwrapObservable(valueAccessor()));
      }
    };
  });

}).call(this);
