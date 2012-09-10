define ["knockout","source/ko-binding-nivo-slider"], (ko) ->
    class GalleryViewModel
        constructor: () ->
            @urls = ko.observableArray(["Content/one.jpg","Content/two.jpg","Content/three.jpg"])
