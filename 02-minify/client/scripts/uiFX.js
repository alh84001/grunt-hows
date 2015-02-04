
var uiFX = {
	fadeOutIn: function(fromQuery, toQuery, callback) {
		var HIDE_DURATION = 500;
		var SHOW_DURATION = 500;

		fromQuery.fadeOut(HIDE_DURATION, function() {
			toQuery.fadeIn(SHOW_DURATION, callback);
		});
	}
};
