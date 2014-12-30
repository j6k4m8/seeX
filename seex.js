var Seex = function() {
    
    this.directions = [
        'above',
        'below',
        'at right',
        'at left'
    ];
    
    this._$ = function(el) {
        return document.querySelectorAll(el);
    };

    this.begin = function(opts) {
        // do something with opts i guess
        this.allElements = _$('.seex');
    };

    this._refresh = function() {
        for (var i = 0; i < this.allElements.lenth; i++) {
            var startingText = allElements[i].innerText;
        }
    };

};
        
