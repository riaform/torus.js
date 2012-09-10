(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery", "knockout"], function($, ko) {
    var ExternalTemplateEngine, ExternalTemplateSource;
    ExternalTemplateSource = (function() {

      function ExternalTemplateSource(templateName) {
        this.getTemplate = __bind(this.getTemplate, this);

        this.getUrl = __bind(this.getUrl, this);

        this.text = __bind(this.text, this);

        this.data = __bind(this.data, this);
        this.templateName = templateName;
        this.loaded = false;
        this.loading = false;
        this.currentTmpl = ko.observable(ExternalTemplateSource.loadingTemplate);
        this.currentTmpl.data = {};
      }

      ExternalTemplateSource.prototype.data = function(key, value) {
        if (arguments.length === 1) {
          return currentTmpl.data[key];
        }
        return this.currentTmpl.data[key] = value;
      };

      ExternalTemplateSource.prototype.text = function(value) {
        if (!this.loaded) {
          this.getTemplate();
        }
        if (arguments.length === 0) {
          return this.currentTmpl();
        }
        return this.currentTmpl(arguments[0]);
      };

      ExternalTemplateSource.prototype.getUrl = function() {
        return ExternalTemplateSource.urlPrefix + this.templateName + ExternalTemplateSource.urlPostfix;
      };

      ExternalTemplateSource.prototype.getTemplate = function() {
        var _this = this;
        if (!this.loading && !this.loaded) {
          this.loading = true;
          return $.ajax({
            url: this.getUrl(),
            context: this,
            type: 'GET',
            success: function(data) {
              _this.loaded = true;
              _this.loading = false;
              return _this.currentTmpl(data);
            },
            error: function(data) {
              _this.loaded = true;
              _this.loading = false;
              return _this.currentTmpl(ExternalTemplateSource.errorTemplate + " " + _this.getUrl() + " " + JSON.stringify(data));
            },
            dataType: 'html'
          });
        }
      };

      return ExternalTemplateSource;

    })();
    ExternalTemplateSource.loadingTemplate = "Loading...";
    ExternalTemplateSource.errorTemplate = "!Error!";
    ExternalTemplateSource.urlPrefix = "/templates/";
    ExternalTemplateSource.urlPostfix = ".html";
    ExternalTemplateEngine = new ko.nativeTemplateEngine();
    ExternalTemplateEngine.cachedSources = {};
    ExternalTemplateEngine.makeTemplateSource = function(templateName) {
      if (typeof templateName === "string") {
        if (this.cachedSources[templateName] === void 0) {
          this.cachedSources[templateName] = new ExternalTemplateSource(templateName);
        }
        return ExternalTemplateEngine.cachedSources[templateName];
      }
      return new ko.templateSources.anonymousTemplate(templateName);
    };
    ko.templateSources.externalHTML = ExternalTemplateSource;
    ko.setTemplateEngine(ExternalTemplateEngine);
    return ExternalTemplateSource;
  });

}).call(this);
