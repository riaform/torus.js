define.amd.jQuery = true
require.config
    baseUrl: '/scripts',
    paths: 
        "jquery": "jquery-1.8.0",
        "knockout": "knockout-2.1.0",
        "jquery.easing" : "jquery.easing.1.3"
require ["jquery","knockout", "demo-viewmodel", "../src/switch-view.js", "../src/external-ko-template.js"], ($,ko,ViewModel,SwitchView) ->
    $( () ->
        $.ajaxSetup({ cache: false })
        $("#main").text("KO: " + typeof(ViewModel))
        ko.applyBindings(new ViewModel())
        )
