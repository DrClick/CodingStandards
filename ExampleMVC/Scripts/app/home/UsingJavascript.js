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
    UsingRequireView.prototype.constructor = UsingRequireView;
    UsingRequireView.DEFAULT_OPTIONS = {
        sumbitAsync : true,
        clickColors: ["pink", "blue", "yellow"],
        startingSlide: 0
    };

    function _create(){
        $(this.domRef.startButton).addClass("loading");

        //this would allow you to start the tutorial on a different slide
        this.slideIndex = this.options.startingSlide;

        //load in the slide defs when loaded
        amplify.subscribe("Fragment.Loaded.UsingRequire.Tutorial", function(data){
            
            this.slides = JSON.parse(data);
            
            $(this.domRef.startButton).removeClass("loading");
        }.bind(this));

        //ask for the slide defs
        Labelmaster.loadFragment("/fragments/tutorial_def.js", {}, "UsingRequire.Tutorial");

    	
        //wire up the start button (note passing in event args)
        $(this.domRef.startButton).click(function(evt){
    		_startHandler.call(this, evt);
    	}.bind(this));

        //wire up forward and back buttons
        $(this.domRef.forwardButton).click(_forward.bind(this));
        $(this.domRef.backButton).click(_back.bind(this));


        //hide the forward and back buttons until the show starts
        $([this.domRef.forwardButton, this.domRef.backButton].join(", "))
            .css({display:"none"});

        //listen for the slide loaded
        amplify.subscribe("Fragment.Loaded.TutorialLoaded", _slideLoaded.bind(this));


    }//end create

    function _startHandler(evt){
        
        //show the forward and back buttons
        $([this.domRef.forwardButton, this.domRef.backButton].join(", "))
            .css({display:"inline"});

        _setButtonColor.call(this);
        
        _loadSlide.call(this, this.slideIndex);

        //unbind this handler and attatch it to next handler
        $(this.domRef.startButton).unbind().click(_forward.bind(this));

    }//end clickHandler

    function _setButtonColor(){
        var buttons = [this.domRef.startButton, this.domRef.forwardButton, this.domRef.backButton];
        var buttonsSelector = buttons.join(", ");
        console.log(buttonsSelector);
        $(buttonsSelector).css({
            "background-color": this.options.clickColor[this.slideIndex % 3],
            "color": "white"
            });
    }

    function _forward(){
        _setButtonColor.call(this);
        var slideToShow = _nextSlide.call(this, this.slideIndex, this.slides.length, true);
        _loadSlide.call(this, slideToShow);
    }

    function _back(){
        _setButtonColor.call(this);
        var slideToShow = _nextSlide.call(this, this.slideIndex, this.slides.length, false);
        _loadSlide.call(this, slideToShow);
    }

    function _loadSlide(slideNumber){

        var data = {
            currentSlide: slideNumber + 1,
            name: this.slides[slideNumber].name
        };

        this.slideIndex = slideNumber;

        //load a fragment
        Labelmaster.loadFragment(this.slides[slideNumber].url, data, "TutorialLoaded");
        
        //scroll to the top of the tutorial
        $("body").animate({ scrollTop: 80 }, 1000);
    }

    function _slideLoaded(data) {

        var nextSlide = _nextSlide.call(this, this.slideIndex, this.slides.length, true);
        
        $(this.domRef.startButton).html("Next Up: " + this.slides[nextSlide].name);
        

        $(this.domRef.templateDisplay).html(data);
        PR.prettyPrint();//apply pretty print
    }//end function
    

    function _nextSlide(slideIndex, length, forward) {
        var next = slideIndex + (forward ? 1 : -1);
        if (next < 0) {
            next = length - 1;
        }

        return next % length; //loops back to zero if at the end
    }


    module.exports = UsingRequireView;
});
