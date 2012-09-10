(function() {

  define(["../src/multi-select.js", "knockout", "jquery.easing"], function(MultiSelectViewModel, ko) {
    var AnimateLayoutDemoViewModel;
    return AnimateLayoutDemoViewModel = (function() {

      function AnimateLayoutDemoViewModel() {
        this.target = ko.observableArray([
          {
            name: 'Two'
          }
        ]);
        this.source = [
          {
            name: 'One'
          }, {
            name: 'Two'
          }, {
            name: 'Three'
          }, {
            name: 'Five'
          }, {
            name: 'Seven'
          }, {
            name: 'Eleven'
          }, {
            name: 'Thirteen'
          }, {
            name: 'Seventeen'
          }, {
            name: 'Nineteen'
          }, {
            name: 'Twenty-Three'
          }, {
            name: 'Twenty-Nine'
          }, {
            name: 'Thirty-One'
          }
        ];
        this.people = new MultiSelectViewModel(this.target, this.source, function(obj) {
          return obj.name;
        });
      }

      return AnimateLayoutDemoViewModel;

    })();
  });

}).call(this);
