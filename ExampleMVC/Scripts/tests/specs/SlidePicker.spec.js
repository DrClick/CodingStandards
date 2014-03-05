define(function(require, exports, module) {
    var NextSlide = require('../../app/utils/NextSlide');

    var Spec =  function(){ 
    	describe("Slide Picker", function() {
		  	describe("Next Slide", function() {
				it("should return the next slide if not the last slide", function() {
					//perform test
					var actual = NextSlide(3,5,true);
					var expected = 4;
					
					expect(actual).toBe(expected);
				});
				it("should return the first slide if it is the last slide", function() {
					//perform test
					var actual = NextSlide(4,5,true);
					var expected = 0;
					
					expect(actual).toBe(expected);
				});
			});

			describe("Previous Slide", function() {
				it("should return the previous slide if not the first slide", function() {
					//perform test
					var actual = NextSlide(4,5,false);
					var expected = 3;
					
					expect(actual).toBe(expected);
				});
				it("should return the last slide if it is the first slide", function() {
					//perform test
					var actual = NextSlide(0,5,false);
					var expected = 4;
					
					expect(actual).toBe(expected);
				});
			});

		});//
	};//end spec

	module.exports = Spec; 
});