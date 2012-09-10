# This View Model is simply a switcher between the different demos.  It uses the SwitchView class
# to hold which view is active.  Each property is an observable defined using setupProperty
define ["../src/switch-view.js", "demo-animate-layout-vm", "demo-base64-vm", "demo-gallery-vm" ], (SwitchView,AnimateLayoutViewModel, Base64DemoViewModel, GalleryViewModel) ->
    class DemoViewModel extends SwitchView
        constructor: () ->
            super()
            @setupProperty "animateLayout"
            @setupProperty "base64"
            @setupProperty "gallery"

        showAnimateLayout: () =>
            @reset "animateLayout", new AnimateLayoutViewModel()

        showBase64: () =>
            @reset "base64",new Base64DemoViewModel()

        showGallery: () =>
            @reset "gallery", new GalleryViewModel()
