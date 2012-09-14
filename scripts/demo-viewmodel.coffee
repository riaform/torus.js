# This View Model is simply a switcher between the different demos.  It uses the SwitchView class
# to hold which view is active.  Each property is an observable defined using setupProperty
define ["source/switch-view", "demo-animate-layout-vm", "demo-base64-vm", "demo-gallery-vm", "demo-date-picker" ], (SwitchView,AnimateLayoutViewModel, Base64DemoViewModel, GalleryViewModel, DatePickerDemoViewModel) ->
    class DemoViewModel extends SwitchView
        constructor: () ->
            super()
            @setupProperty "animateLayout"
            @setupProperty "base64"
            @setupProperty "gallery"
            @setupProperty "datePicker"

        showAnimateLayout: () =>
            @reset "animateLayout", new AnimateLayoutViewModel()

        showBase64: () =>
            @reset "base64",new Base64DemoViewModel()

        showGallery: () =>
            @reset "gallery", new GalleryViewModel()

        showDatePicker: () =>
            @reset "datePicker", new DatePickerDemoViewModel()
