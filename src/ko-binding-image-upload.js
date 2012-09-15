(function() {

  define(["knockout", "jquery", "jquery-file-upload/jquery.fileupload-fp"], function(ko, $) {
    return ko.bindingHandlers.imageUpload = {
      init: function(element, valueAccessor, allBindingAccessor, viewModel) {
        var url, vm, _ref, _ref1, _ref2, _ref3, _ref4,
          _this = this;
        url = valueAccessor().url;
        vm = viewModel;
        return $(element).fileupload({
          dataType: 'json',
          process: [
            {
              action: 'load',
              fileTypes: /^image\/(gif|jpeg|png)$/,
              maxFileSize: (_ref = valueAccessor().maxFileSize) != null ? _ref : 20000000
            }, {
              action: 'resize',
              maxWidth: (_ref1 = valueAccessor().maxWidth) != null ? _ref1 : 200,
              maxHeight: (_ref2 = valueAccessor().maxHeight) != null ? _ref2 : 200,
              minWidth: (_ref3 = valueAccessor().minWidth) != null ? _ref3 : 80,
              minHeight: (_ref4 = valueAccessor().minHeight) != null ? _ref4 : 80
            }, {
              action: 'save'
            }
          ],
          done: function(e, data) {
            return $.each(data.result, function(index, file) {
              vm.ImageUrl(file.url);
              return $('.progress .bar').css('width', '0px').text("100%");
            });
          },
          progressall: function(e, data) {
            var progress;
            progress = parseInt(data.loaded / data.total * 100, 10);
            return $('.progress .bar').css('width', progress * 2 + 'px').text(parseInt(data.loaded / data.total * 100));
          }
        });
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {}
    };
  });

}).call(this);
