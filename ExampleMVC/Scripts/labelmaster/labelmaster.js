define(function(require, exports, module){
	"use strict";
	//Note we are implamenting Labelmaster as a singleton
	var Labelmaster = function() {
		this.options = {
			notifcationClass: ".notificationMessage"
		}
	};	
	Labelmaster.options = {
		notifcationClass: ".notificationMessage"
	};	
	
	Labelmaster.loadFragment = function(url, data, key) {
		
		this.callCounter++;//showing singelton
		//logger.log("request to load :" + url);
	    
	    require(['text!' + url], function(frag){
	        var result = Hogan.compile(frag).render(data);

	        //publish event with amplify
	        amplify.publish("Fragment.Loaded." + key, result);
	    });
	};//end function

	Labelmaster.showWaitScreen = function(){
		$("#LM_Loading").remove();//remove any existing
		$("body").prepend("<div id='LM_Loading' class='alert alert-default'></div>");
	};//end showWait

	Labelmaster.hideWaitScreen = function(){
		$("#LM_Loading").remove();
	};//endHideWait

	// Labelmaster.showMessage = function(message, class){
	// 	throw  "Not Implemented Yet";
	// };//endShowMessage


	Labelmaster.sendRequest = function(options){
		var opts = {
			data: {},
			method: "GET",
			url: null,
			showWaiting: true,
			withCredentials: true,
			eventName: null
		};
		opts = _.extend(opts, options);


		//update the ui
		if(opts.showWaiting){
		    $(this.options.notifcationClass).remove()
		    this.showWaitScreen();
    	}


        $.ajax({
            type: opts.method,
            url: opts.url,
            data: opts.data,
            dataType: "json",
            xhrFields: {
                withCredentials: opts.withCredentials
            },
            error: function(result){
                this.showMessage([ "There was an error sending your request." ], "error")
            }.bind(this),
            success: function(result){
                if(result.code === 500){
                    this.showMessage(result.messages, "error");
                    return false;
				}
                if (result.code < 500){
                    if (result.undoToken != null){
                        this.showMessage([ result.undoToken.WarningMessage ], "warning", result.undoToken.HistoryEntryId)
                    }
                    else if (result.messages && result.messages.length > 0 && result.messages[0].length > 0){
                        this.showMessage(result.Messages, "message")
                    }

                    var eventName = (result.eventName  || opts.eventName);
                    if (eventName != null){
                        amplify.publish(eventName, result.data)
                    }//end if eventName
                }//end if not 500
            }.bind(this),
            complete: function(result){
                this.hideWaitScreen();
            }.bind(this)	
        });//end ajax call
	};//end send Requst

	Labelmaster.getResult = function(url, opts){
		this.sendRequest(_.extend({url: url}, opts));
	};//end getResult

	Labelmaster.postResult = function(url, opts){
		this.sendRequest(_.extend({url: url, method: "POST"}, opts));
	};//end postResult

	Labelmaster.postForm = function(form, url, opts){
		var data = $(form).serialize();//JQuery Method
		this.sendRequest(_.extend({url: url, method: "POST", data: data}, opts));
	};//end postForm

	Labelmaster.postData = function(form, url, opts){
		var data = form.serialize();//JQuery Method
		this.sendRequest(_.extend({url: url, method: "POST", data: data}, opts));
	};//end postForm
        


	module.exports = Labelmaster;
});