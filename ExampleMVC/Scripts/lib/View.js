define(function (require, exports, module) {
    function View(options) {
        this.options = Object.create(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
        if(options) {this.setOptions(options);}
    }
    View.DEFAULT_OPTIONS = {}; // no defaults

    View.prototype.setOptions = function(options) {
        this.options = _.extend(this.options, options);
    };//end setOptions

    module.exports = View;
});
