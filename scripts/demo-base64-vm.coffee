define ["/src/base64.js","knockout"], (Base64,ko) ->
    class Base64DemoViewModel
        constructor: () ->
            @source = ko.observable("FOO")
            @target = ko.observable("")
            @base64 = new Base64()

        convertToBase64: () =>
            @target( @base64.encode( @source() ))

        convertFromBase64: () =>
            @source( @base64.decode( @target() ))
        