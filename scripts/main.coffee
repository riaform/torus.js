define.amd.jQuery = true
@require.config
    paths: 
        "jquery": "./jquery-1.8.0"
        "knockout": './knockout-2.1.0.debug',
        "komapping": './knockout.mapping-latest.debug'
        "switchview": './src/switchview'
        "external-ko-template": "./src/external-ko-template"
@require [
    "jquery",
    "code/switchViewContact",
    "knockout"
    "external-ko-template"
    ], ($,SwitchViewContact,ko) ->
    @$ = $
    $( () ->
        $("#main").text("KO: " + typeof(ko))
        view = new SwitchViewContact()
        ko.applyBindings(view)
        view.showGallery(["one","two"])
        )
