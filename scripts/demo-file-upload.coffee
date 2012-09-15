define ["knockout","source/ko-binding-image-upload"], (ko) ->
    class FileUploadDemoViewModel
        constructor: () ->
            @imageUrl = ko.observable()
