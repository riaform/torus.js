define ["knockout","/src/ko-binding-nivo-slider.js"], (ko) ->
    class GalleryViewModel
        constructor: () ->
            @urls = ko.observableArray(["/content/one.jpg","/content/two.jpg","/content/three.jpg"])
