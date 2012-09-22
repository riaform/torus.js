# Switch the view based on an observable
define ["knockout"], (ko) ->
    class SwitchView
        constructor: () ->
            @properties = []
            @propertyNames = []

        # set all properties to null, other than 'key' and it's aliases
        reset: (key,value) =>
            aliases = @[key+"Alias"]
            ignores = @[key+"Ignore"]
            aliases.push key
            # loop through all VMs
            for p,i in @propertyNames
                observ = @properties[i]
                foundView = false
                # if any of the alias names for this VM is the same as the property name, then enable the VM
                for alias in aliases
                    if (alias==p) 
                        observ(value)
                        foundView = true
                        break
                for ignore in ignores
                    if (ignore==p)
                        foundView = true
                        break
                if (!foundView) then observ(null)

        # set-up an observable property in an array called @propertyNames.  Also set optional aliases in PropertyAlias
        setupProperty: (name, options) =>
            options = options ? {}
            aliases = options.aliases ? []
            @[name] = ko.observable(null)
            @properties.push( @[name] )
            @propertyNames.push( name )
            @[name+"Alias"] = aliases 
            returnFn = options.activate ? ( (data) -> data )
            @["show" + name[0].toUpperCase() + name[1..]] = (data) =>
                @reset name,returnFn(data)
            @[name+"Ignore"] = options.ignore ? []