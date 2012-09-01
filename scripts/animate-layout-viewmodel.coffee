define ["multi-select","knockout"], (ms,ko) ->
    class AnimateLayoutViewModel
        constructor: () ->
            @target = ko.observableArray([{ name: 'Two' }])
            @source = [
                { name: 'One' }, 
                { name: 'Two' }, 
                { name: 'Three' }, 
                { name: 'Five' },
                { name: 'Seven' }, 
                { name: 'Eleven' }, 
                { name: 'Thirteen' }, 
                { name: 'Seventeen' },
                { name: 'Nineteen' }, 
                { name: 'Twenty-Three' }, 
                { name: 'Twenty-Nine' }, 
                { name: 'Thirty-One' }
            ]
            # the 'people' property uses the MultiSelectViewModel passing four values:
            #   Target Array (observable)
            #   Source Array
            #   Identity function to test equality of the objects
            #   Container Selector for common parent
            @people = new MultiSelectViewModel this.target, this.source, (obj) -> obj.name
