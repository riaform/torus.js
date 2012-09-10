define ["knockout","src/ko-binding-nivo-slider"], (ko) ->
    class GalleryViewModel
        constructor: () ->
            @urls = ko.observableArray(["content/one.jpg","content/two.jpg","content/three.jpg"])
