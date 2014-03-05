define(function(require, exports, module) {

    var SpecRunner = require("SpecRunner");
    SpecRunner();

    //boiler plate code for Jasmine

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };


    jasmineEnv.execute();
});
     
