var Seex = function() {
    
    // If something is 100px right and 70px up, call it above.
    this._horizontalPreference = 0.7;
    this._linkToTarget = true;

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
        var horizontalDirection = _seex.offsetLeft - _target.offsetLeft;

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
        this.allElements = this._$('.seex');
        if (opts) {
            // do something with opts i guess
            opts.horizontalPreference ? this._horizontalPreference = opts.horizontalPreference : '';
            opts.linkToTarget ? this._linkToTarget = opts.linkToTarget : '';
        }
        this.refresh();
    };

    this.refresh = function() {
        for (var i = 0; i < this.allElements.length; i++) {
            var pgraph = this.allElements[i];
            var target = this._$(this.allElements[i].attributes['data-seex-target'].value)[0];

            var startingText = pgraph.innerText;
            var endingPunctuation = (!!~'.,:;'.indexOf(startingText.slice(-1)) ?
                    startingText.slice(-1) : '');
            var isCapitalized = startingText.charCodeAt(0) <= 90 &&
                    startingText.charCodeAt(0) >= 65;
            
            var newWord = this._getWordForDirection(
                pgraph,
                target
            );

            if (isCapitalized) newWord = newWord[0].toUpperCase() + newWord.slice(1);
            if (!!endingPunctuation) newWord += endingPunctuation;
            
            if (this._linkToTarget) {
                this.allElements[i].innerHTML = "<a class='seex-link' href='#" + 
                        target.attributes['id'].value +
                        "'>" + newWord + "</a>";
            } else {
                this.allElements[i].innerText = newWord;
            }
        }
    };
};
        
