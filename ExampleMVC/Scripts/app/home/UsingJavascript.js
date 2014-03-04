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
            $(this.domRef.startButton).removeClass("loading");
        }.bind(this));
        Labelmaster.loadFragment("/fragments/tutorial_def.js", {}, "UsingRequire.Tutorial");

    	
        //wire up the start button (note passing in event args)
        $(this.domRef.startButton).click(function(evt){
    		_clickHandler.call(this, evt);
    	}.bind(this));

        //wire up forward and back buttons
        $(this.domRef.forwardButton).click(_forward.bind(this));
        $(this.domRef.backButton).click(_back.bind(this));


        //hide the forward and back buttons until the show starts
        $([this.domRef.forwardButton, this.domRef.backButton].join(", "))
            .css({display:"none"});

        //listen for the tutorial loaded
        amplify.subscribe("Fragment.Loaded.TutorialLoaded", _dataLoaded.bind(this));


    }//end create

    function _clickHandler(evt){
        _loadSlide.call(this,this.slideIndex);
        _setButtonColor.call(this);


        //show the forward and back buttons
        $([this.domRef.forwardButton, this.domRef.backButton].join(", "))
            .css({display:"inline"});


        this.slideIndex++;
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
        this.slideIndex = (this.slideIndex + 1) % this.fragments.length;
        _loadSlide.call(this, this.slideIndex);
    }

    function _back(){
        _setButtonColor.call(this);
        this.slideIndex = this.slideIndex - 1 >= 0 ? this.slideIndex -1 : this.fragments.length -1;
        _loadSlide.call(this, this.slideIndex);
    }

    function _loadSlide(slideNumber){

        var data = {
            currentSlide: this.slideIndex + 1,
            name: this.fragments[slideNumber].name
        };

        //load a fragment
        Labelmaster.loadFragment(this.fragments[slideNumber].url, data, "TutorialLoaded");
    }

    function _dataLoaded(data){
        
        if(this.slideIndex < this.fragments.length - 1){
            $(this.domRef.startButton).html("Next Up: " + this.fragments[this.slideIndex + 1].name);
        }

        $(this.domRef.templateDisplay).html(data);
        PR.prettyPrint();//apply pretty print
    }//end function


    module.exports = UsingRequireView;
});
