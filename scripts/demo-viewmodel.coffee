# This View Model is simply a switcher between the different demos.  It uses the SwitchView class
# to hold which view is active.  Each property is an observable defined using setupProperty
define ["source/switch-view", "demo-animate-layout-vm", "demo-base64-vm", "demo-gallery-vm", "demo-date-picker", "demo-file-upload" ], (SwitchView,AnimateLayoutViewModel, Base64DemoViewModel, GalleryViewModel, DatePickerDemoViewModel, FileUploadDemoViewModel) ->
    class DemoViewModel extends SwitchView
        constructor: () ->
            super()
            @setupProperty "animateLayout", { activate: (data) => new AnimateLayoutViewModel() } 
            @setupProperty "base64", { activate: (data) => new Base64DemoViewModel() }
            @setupProperty "gallery", { activate: (data) => new GalleryViewModel() }
            @setupProperty "datePicker", { activate: (data) => new DatePickerDemoViewModel() }
            @setupProperty "fileUpload", { activate: (data) => new FileUploadDemoViewModel() }
