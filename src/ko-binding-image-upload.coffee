define ["knockout","jquery","jquery-file-upload/jquery.fileupload-fp"], (ko,$) ->
    ko.bindingHandlers.imageUpload = 
        init: (element, valueAccessor, allBindingAccessor, viewModel) ->
            url = valueAccessor().url
            vm = viewModel
            cb = valueAccessor().callback
            headers = valueAccessor().headers
            $(element).fileupload
                dataType: 'json',
                url: url,
                headers: headers,
                process: [
                    action: 'load',
                    fileTypes: /^image\/(gif|jpeg|png)$/,
                    maxFileSize: valueAccessor().maxFileSize ? 20000000 
                ,
                    action: 'resize',
                    maxWidth: valueAccessor().maxWidth ? 200,
                    maxHeight: valueAccessor().maxHeight ? 200,
                    minWidth: valueAccessor().minWidth ? 80,
                    minHeight: valueAccessor().minHeight ? 80
                ,
                    action: 'save'
                ],
                done: (e, data) =>
                    $.each data.result, (index, file) =>
                        cb( file.url )
                        $('.progress .bar').css( 'width', '0px').text("100%")
                progressall: (e, data) ->
                    progress = parseInt(data.loaded / data.total * 100, 10)
                    $('.progress .bar').css( 'width', progress * 2 + 'px' ).text(parseInt(data.loaded / data.total * 100))
        update: (element, valueAccessor, allBindingsAccessor, viewModel) ->
