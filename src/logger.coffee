define ["jquery"],($) ->
    class Logger
        constructor: (@elementSelector) ->

        logError: (err, message) =>
            $(@elementSelector).prepend($("<div>").text(message + ": " + JSON.stringify(err)))

        logMessage: (message) =>
            $(@elementSelector).prepend($("<div>").text(message))

        logObject: (obj, message) =>
            $(@elementSelector).prepend($("<div>").text(message + ": " + JSON.stringify(obj)))
