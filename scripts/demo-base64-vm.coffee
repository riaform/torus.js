define ["source/base64","knockout","source/logger"], (Base64,ko,logger) ->
    Base64 = Base64.Base64 
    class Base64DemoViewModel
        constructor: () ->
            @source = ko.observable("FOO")
            @target = ko.observable("")

        convertToBase64: () =>
            @target( Base64.encode( @source() ))

        convertFromBase64: () =>
            @source( Base64.decode( @target() ))
        