var Seex = function() {
    
    this._AXES = {
        V: 'vertical',
        H: 'horizontal'
    };
    
    this._directions = {
        N: 'above',
        S: 'below',
        E: 'at right',
        W: 'at left'
    ];
    

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
        var vector = _getElementVectorToOther(_seex, _target);
        var absVector = [Math.abs(vector[0]), Math.abs(vector[1])];

        if (!_axis) {
            _axis = (absVector[0] >= absVector[1] ? this._AXES.H : this._AXES.V);
        } 

        if (_axis == this._AXES.H) {
            return vector[0] > 0 ? this._directions.W : this._directions.E;
        } else {
            return vector[1] > 0 ? this._directions.N : this._directions.S;
        }
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
        
