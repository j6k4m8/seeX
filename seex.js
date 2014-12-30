var Seex = function() {
    
    // If something is 100px right and 70px up, call it above.
    this._horizontalPreference = 0.7;

    this._AXES = {
        V: 'vertical',
        H: 'horizontal'
    };
    
    this._directions = {
        N: 'above',
        S: 'below',
        E: 'at right',
        W: 'at left'
    };
    

    this._$ = function(el) {
        return document.querySelectorAll(el);
    };


    this._getElementVectorToOther = function(_seex, _target) {
        // Positive vD means fig is above pgraph
        var verticalDirection = _seex.offsetTop - _target.offsetTop;
        // Positive hD means fig is to the left of pgraph
        var horizontalDirection = _seex.offsetLeft - _target.offsetTop;

        return [horizontalDirection, verticalDirection];
    };

    this._getWordForDirection = function(_seex, _target, _axis) {
        var vector = this._getElementVectorToOther(_seex, _target);
        var absVector = [Math.abs(vector[0]), Math.abs(vector[1])];

        if (!_axis) {
            _axis = (absVector[0] * this._horizontalPreference > absVector[1] ? this._AXES.H : this._AXES.V);
        } 

        if (_axis == this._AXES.H) {
            // Ideally, we would check to see if the paragraph's RIGHT is
            // to the LEFT of the figure's LEFT. Only then can we call it
            // "to the right" of the text. Otherwise it's very ambiguous.
            
            return vector[0] > 0 ? this._directions.W : this._directions.E;
        } else {
            return vector[1] > 0 ? this._directions.N : this._directions.S;
        }
    };


    this.begin = function(opts) {
        // do something with opts i guess
        this.allElements = this._$('.seex');
    };

    this.refresh = function() {
        for (var i = 0; i < this.allElements.length; i++) {
            var startingText = this.allElements[i].innerText;
            var endingPunctuation = (!!~'.,:;'.indexOf(startingText.slice(-1)) ?
                    startingText.slice(-1) : '');
            var isCapitalized = startingText.charCodeAt(0) <= 90 &&
                    startingText.charCodeAt(0) >= 65;
            
            
            var newWord = this._getWordForDirection(
                    this.allElements[i],
                    this._$(this.allElements[i].attributes['data-seex-target'].value)[0]
            );

            if (isCapitalized) newWord = newWord[0].toUpperCase() + newWord.slice(1);
            if (!!endingPunctuation) newWord += endingPunctuation;
            
            this.allElements[i].innerText = newWord;
        }
    };

};
        
