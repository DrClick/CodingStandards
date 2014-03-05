define(function(require, exports, module) {
    "use strict";

    function NextSlide(slideIndex, length, forward) {
        var next = slideIndex + (forward ? 1 : -1);
        if (next < 0) {
            next = length - 1;
        }

        return next % length; //loops back to zero if at the end
    }


    module.exports = NextSlide;
});
