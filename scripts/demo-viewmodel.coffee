define ["switchview","knockout"], (SwitchView,ko) ->
    class DemoViewModel extends SwitchView
        constructor : () ->
            super()
            setupProperty "animateLayout"
            setupProperty "base64"

        showAnimateLayout: () =>
            @reset "animateLayout", new 