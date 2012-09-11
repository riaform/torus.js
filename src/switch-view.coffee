# Switch the view based on an observable
define ["knockout"], (ko) ->
    class SwitchView
        constructor: () ->
            @properties = []
            @propertyNames = []

        # set all properties to null, other than 'key' and it's aliases
        reset: (key,value) =>
            aliases = @[key+"Alias"]
            aliases.push key
            # loop through all VMs
            for p,i in @propertyNames
                observ = @properties[i] 
                # if any of the alias names for this VM is the same as the property name, then enable the VM
                if (aliases.filter( (alias) -> (alias==p) ).length>0) then observ(value) else observ(null)

        # set-up an observable property in an array called @propertyNames.  Also set optional aliases in PropertyAlias
        setupProperty: (name, aliases...) =>
            @[name] = ko.observable(null)
            @properties.push( @[name] )
            @propertyNames.push( name )
            @[name+"Alias"] = aliases ? []
