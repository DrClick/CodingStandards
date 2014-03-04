define(function(require, exports, module){
	
	//Note we are implamenting Labelmaster as a singleton
	var Labelmaster = function() {
		this.callCounter = 0;
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

	module.exports = Labelmaster;
});