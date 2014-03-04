define(function(require, exports, module) {
    "use strict";
    var View = require("lib/View");
    var Labelmaster = require("app/labelmaster");

    function UsingRequireView(domRef, options) {
    	//Note the use apply. A common pitful is that arguments must be an array.
    	View.apply(this, [options]);
    	
    	//set properties
    	this.domRef = domRef;
    	this.slideIndex = 0;

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

        $(this.domRef.forward).click(_forward.bind(this));
        $(this.domRef.back).click(_back.bind(this));

        amplify.subscribe("Fragment.Loaded.UsingRequire", _dataLoaded.bind(this));


    }//end create

    function _clickHandler(evt){
    	$(evt.target, this.domRef.forward, this.domRef.back).css({
    	    "background-color": this.options.clickColor[this.slideIndex % 3],
            "color": "white"
        	});

        _loadSlide.call(this,this.slideIndex);

        this.slideIndex++;
    }//end clickHandler

    function _forward(){
        this.slideNumber = (this.slideNumber + 1) % this.fragments.length;
        this.loadSlide.call(this, this.slideNumber);
    }

    function _back(){
        this.slideNumber = this.slideNumber - 1 >= 0 ? this.slideNumber -1 : this.fragments.length -1;
        this.loadSlide.call(this, this.slideNumber);
    }

    function _loadSlide(slideNumber){

        var data = {currentSlide: this.slideIndex + 1};
        
        //load a fragment
        Labelmaster.loadFragment(this.fragments[slideNumber], data, "UsingRequire");
    }

    function _dataLoaded(data){
        $(this.domRef.templateDisplay).html(data);
        PR.prettyPrint();//apply pretty print
    }//end function


    module.exports = UsingRequireView;
});
