(function() {

  define(["knockout", "jquery", "jquery.easing", "jquery-ui-1.8.23", "nivo-slider/jquery.nivo.slider"], function(ko, $) {
    return ko.bindingHandlers.nivoSlider = {
      init: function(element, valueAccessor, allBindingAccessor, viewModel) {
        if ($(element).find("img[src]").length === 0) {
          return;
        }
        console.info("Nivo Initlal Options", JSON.stringify(valueAccessor()));
        return $(element).nivoSlider(ko.utils.unwrapObservable(valueAccessor()));
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        if ($(element).find("img[src]").length === 0) {
          return;
        }
        $.each($(element).find("img[src]"), function(i, e) {
          return e.removeAttribute("data-bind");
        });
        console.info("Nivo Update Options", JSON.stringify(valueAccessor()));
        return $(element).nivoSlider(ko.utils.unwrapObservable(valueAccessor()));
      }
    };
  });

}).call(this);
