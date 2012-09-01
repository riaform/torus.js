define ["jquery","knockout"],($,ko) ->
    class ExternalTemplateSource

        constructor: (templateName) ->
            @templateName = templateName;
            @loaded = false
            @loading = false
            @currentTmpl = ko.observable(ExternalTemplateSource.loadingTemplate)
            @currentTmpl.data = {}

        data: (key, value) =>
            if (arguments.length == 1) then return this.currentTmpl.data[key]
            this.currentTmpl.data[key] = value;
        # read/write the actual template text
        
        text: (value) =>
            if (!this.loaded) then this.getTemplate()
            if (arguments.length == 0) then return this.currentTmpl()
            this.currentTmpl(arguments[0])
    
        getUrl: () =>
            ExternalTemplateSource.urlPrefix + this.templateName + ExternalTemplateSource.urlPostfix

        # retrieve our actual template via AJAX
        getTemplate: () =>
            if (!this.loading && !this.loaded) 
                this.loading = true;
                $.ajax
                    url: @getUrl(),
                    context: this,
                    type: 'GET',
                    success: (data) =>
                        @loaded = true
                        @loading = false
                        @currentTmpl(data)
                    error: (data) =>
                        this.loaded = true
                        this.loading = false
                        @currentTmpl(ExternalTemplateSource.errorTemplate + " " + this.getUrl() + " " + JSON.stringify(data));
                    dataType: 'html'

    # Static loading/error templates for easy, albeit global customization
    # might look into using the options object to specify these
    # and configure things like async...
    ExternalTemplateSource.loadingTemplate = "Loading..."
    ExternalTemplateSource.errorTemplate = "!Error!"
    # Prefix and postfix for urls
    ExternalTemplateSource.urlPrefix = "/templates/"
    ExternalTemplateSource.urlPostfix = ".html"

    # Create an instance of
    ExternalTemplateEngine = new ko.nativeTemplateEngine()
    ExternalTemplateEngine.cachedSources = {}

    ExternalTemplateEngine.makeTemplateSource = (templateName) =>
        if (typeof templateName == "string") 
            if (this.cachedSources[templateName] == undefined) 
                this.cachedSources[templateName] = new ExternalTemplateSource(templateName)
            return this.cachedSources[templateName]
        new ko.templateSources.anonymousTemplate(templateName) # Anonymous template
    
    # Expose the source and engine publically
    ko.templateSources.externalHTML = ExternalTemplateSource;
    ko.setTemplateEngine(ExternalTemplateEngine);
