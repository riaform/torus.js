function loadTemplate(templateName, url, callback) {

    var off = url.indexOf(' ');
    if (off >= 0) {
        var selector = url.slice(off + 1, url.length);
        url = url.slice(0, off);
    }
    var ret = $.when($.ajax({ url: url, type: 'GET', dataType: 'html' }));
    ret.done(function (responseText, status) {
        var did = $("<DIV style='display:none'/>")
        .append(responseText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''))
        .find(selector);
        console.log(did.html());
        $.template(templateName, did.html());
        if (callback) { callback(responseText, status, ret); }
    });
    return ret;
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}


var containerPos;

// function to animate items between layouts
function animateBetweenLayouts(item, source, target) {
	var keepSource = source;
	var keepTarget = target;
	var movedItem = item;
	var newItem = $(item).clone(false, false);
	var pos = $(item).offset();
	$(newItem).css("position", "absolute").css("left", pos.left - containerPos.left).css("top", pos.top - containerPos.top);
	$("#container").append($(newItem));
	$(target).append($(item));
	var newPos = $(item).offset();
	$(item).hide();
	$(newItem).animate({
		left: newPos.left - containerPos.left,
		top: newPos.top - containerPos.top
	}, 1300, "swing", function() {
		$(this).remove();
		$(movedItem).show();
		$(movedItem).one("click", function() {
			animate(movedItem, keepTarget, keepSource);
		});
	});
}


// Loads an external native template if one is not found in the dom
var ExternalTemplateSource = function (templateName) {
    this.templateName = templateName;
    this.loaded = false;
    this.loading = false;
    this.currentTmpl = ko.observable(ExternalTemplateSource.loadingTemplate);
    this.currentTmpl.data = {};
}
// Static loading/error templates for easy, albeit global customization
// might look into using the options object to specify these
// and configure things like async...
ExternalTemplateSource.loadingTemplate = "Loading...";
ExternalTemplateSource.errorTemplate = "!Error!";
// Prefix and postfix for urls
ExternalTemplateSource.urlPrefix = "/templates/";
ExternalTemplateSource.urlPostfix = ".html";
// Class Definition
ExternalTemplateSource.prototype = {
    //read/write meta-data about the template (has it been rewritten already; not used for native templates currently)
    data: function (key, value) {
        if (arguments.length === 1) {
            return this.currentTmpl.data[key];
        }
        this.currentTmpl.data[key] = value;
    },
    //read/write the actual template text
    text: function (value) {
        if (!this.loaded) {
            this.getTemplate();
        }

        if (arguments.length === 0) {
            return this.currentTmpl();
        } else {
            this.currentTmpl(arguments[0]);
        }
    },
    getUrl: function () {
        return ExternalTemplateSource.urlPrefix + this.templateName + ExternalTemplateSource.urlPostfix;
    },
    //retrieve our actual template via AJAX
    getTemplate: function () {
        if (!this.loading && !this.loaded) {
            this.loading = true;
            $.ajax({
                url: this.getUrl(),
                context: this,
                type: 'GET',
                success: function (data) {
                    this.loaded = true;
                    this.loading = false;
                    this.currentTmpl(data);
                },
                error: function (data) {
                    this.loaded = true;
                    this.loading = false;
                    this.currentTmpl(ExternalTemplateSource.errorTemplate + " " + this.getUrl() + " " + JSON.stringify(data));
                },
                dataType: 'html'
            });
        }
    }
}
// Create an instance of
var ExternalTemplateEngine = new ko.nativeTemplateEngine();
ExternalTemplateEngine.cachedSources = {};
ExternalTemplateEngine.makeTemplateSource = function (templateName) {
    if (typeof templateName == "string") {
        if (this.cachedSources[templateName] == undefined) {
            this.cachedSources[templateName] = new ExternalTemplateSource(templateName);
        }
        return this.cachedSources[templateName];
    }
    return new ko.templateSources.anonymousTemplate(templateName); // Anonymous template
}
// Expose the source and engine publically
ko.templateSources.externalHTML = ExternalTemplateSource;
ko.setTemplateEngine(ExternalTemplateEngine);
