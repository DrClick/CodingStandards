define(function(require, exports, module) {
    "use strict";
    var View = require("lib/View");
    var Labelmaster = require("app/labelmaster");

    function UsingRequireView(domRef, options) {
    	//Note the use apply. A common pitful is that arguments must be an array.
    	View.apply(this, [options]);
    	
    	//set properties
    	this.domRef = domRef;
    	this.clickCounter = 0;

        //call a private method
    	_create.call(this);
    }
    UsingRequireView.prototype = Object.create(View.prototype);
    UsingRequireView.prototype.constructor = View;
    UsingRequireView.DEFAULT_OPTIONS = {
        sumbitAsync : true,
        clickColors	: ["pink", "blue", "yellow"]
    };

    function _create(){
        $(this.domRef.clickable).addClass("loading");
        amplify.subscribe("Fragment.Loaded.UsingRequire.Tutorial", function(data){
            this.fragments = JSON.parse(data);
            $(this.domRef.clickable).removeClass("loading");
        }.bind(this));
        Labelmaster.loadFragment("/fragments/tutorial_def.js", {}, "UsingRequire.Tutorial");

    	$(this.domRef.clickable).click(function(evt){
    		_clickHandler.call(this, evt);
    	}.bind(this));

        amplify.subscribe("Fragment.Loaded.UsingRequire", _dataLoaded.bind(this));


    }//end create

    function _clickHandler(evt){
    	$(evt.target).css({
    	    "background-color": this.options.clickColor[this.clickCounter % 3],
            "color": "white"
        	});

        var data = {currentSlide: this.clickCounter};

        //load a fragment
        Labelmaster.loadFragment(this.fragments[this.clickCounter], data, "UsingRequire");

        this.clickCounter++;
    }//end clickHandler


    function _dataLoaded(data){
        $(this.domRef.templateDisplay).html(data);
        PR.prettyPrint();//apply pretty print
    }//end function


    module.exports = UsingRequireView;
});
