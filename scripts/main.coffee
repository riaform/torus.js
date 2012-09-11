define.amd.jQuery = true
require.config
    baseUrl: '/torus.js/scripts',
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: 
        "jquery": "jquery-1.8.0",
        "knockout": "knockout-2.1.0",
        "jquery.easing" : "jquery.easing.1.3",
        "source" : "/torus.js/src",
        "jquery-ui" : "jquery-ui-1.8.23"
    shim:
        "jquery.easing": ["jquery"],
        "source/external-ko-template": ["knockout"],
        "jquery-ui" : ["jquery"],
        "nivo-slider/jquery-nivo-slider" : ["jquery"]
require ["jquery","knockout", "demo-viewmodel", "source/switch-view", "source/external-ko-template", "jquery.easing"], ($,ko,ViewModel,SwitchView,ExternalTemplateSource) ->
    ets = ExternalTemplateSource;
    $( () ->
        # switch to local template directory (just GH branch)
        ets.urlPrefix = "/torus.js/templates/"
        $.ajaxSetup({ cache: false })
        $("#main").text("KO: " + typeof(ViewModel))
        ko.applyBindings(new ViewModel())
        )
