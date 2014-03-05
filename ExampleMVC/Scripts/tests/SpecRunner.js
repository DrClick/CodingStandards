define(function(require, exports, module) {

    //add specs here
    var specs = {};

    //Our first spec!!
    specs.SlidePicker = require("specs/SlidePicker.spec");







    function TestRunner(){
        for(var spec in specs){
            //run each spec
            specs[spec]();
        }
    }

    module.exports = TestRunner;
});