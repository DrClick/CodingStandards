define(function(require, exports, module) {
    var NextSlide = require('../app/utils/NextSlide');

    var Spec =  function(){ 
    	describe("Slide Picker", function() {
		  	describe("Next Slide", function() {
				it("should return the next slide if not the last slide", function() {
					//perform test
					var actual = NextSlide(3,10,true);
					var expected = 4;
					
					expect(actual).toBe(expected);
				});
				it("should return the first slide if it is the last slide", function() {
					//perform test
					expect(true).toBe(false);
				});
			});

			describe("Previous Slide", function() {
				it("should return the previous slide if not the first slide", function() {
					//perform test
					expect(true).toBe(false);
				});
				it("should return the last slide if it is the first slide", function() {
					//perform test
					expect(true).toBe(false);
				});
			});

		});//
	};//end spec

	module.exports = Spec; 
});