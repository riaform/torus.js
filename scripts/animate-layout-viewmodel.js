(function() {

  define(["multi-select", "knockout"], function(ms, ko) {
    var AnimateLayoutViewModel;
    return AnimateLayoutViewModel = (function() {

      function AnimateLayoutViewModel() {
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

      return AnimateLayoutViewModel;

    })();
  });

}).call(this);
