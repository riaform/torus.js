define.amd.jQuery = true
require.config
    baseUrl: 'scripts',
    urlArgs: "bust=" +  (new Date()).getTime(),
    map:
        "jquery-file-upload/jquery.fileupload" :
            "jquery.ui.widget" : "jquery-ui"
    paths: 
        "jquery": "jquery-1.8.1",
        "knockout": "knockout-2.1.0",
        "komapping": 'knockout.mapping-latest.debug',
        "jquery.layout": "jquery.layout-latest",
        "jquery.easing" : "jquery.easing.1.3",
        "source" : "./../src",
        "jquery-ui" : "jquery-ui-1.8.23",
        "canvas-to-blob": "canvas-to-blob.min",
        "load-image": "load-image.min",
    shim:
        "jquery.easing": ["jquery"],
        "jquery.layout" : ["jquery"],
        "jquery-ui" : ["jquery"],
        "jquery.widget" : ["jquery"],
        "nivo-slider/jquery.nivo.slider" : ["jquery"]
require ["jquery","knockout", "demo-viewmodel", "source/switch-view", "source/external-ko-template", "jquery.easing", "source/ko-binding-layout"], ($,ko,ViewModel,SwitchView,ExternalTemplateSource) ->
    ets = ExternalTemplateSource
    $( () ->
        ets.urlPrefix = "./templates/"
        # switch to local template directory (just GH branch)
        $.ajaxSetup({ cache: false })
        $("#main").text("KO: " + typeof(ViewModel))
        ko.applyBindings(new ViewModel())
        )
