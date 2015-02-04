(function(global, query, Player, undefined) {
	"use strict";

	global.onload = function() {
		var splash = query('.splash');
		var selectorPanel = query('.selector.panel');
		var playerPanel = query('.player.panel');

		// hide all panels
		query().add(selectorPanel).add(playerPanel).hide();

		// initialize selector panel
		// initialize the play trigger 
		var playTrigger = selectorPanel.find('.play-trigger');
		playTrigger.click(function() {
			var movieSelector = query('#movieSelector');
			var subtitleSelector = query('#subtitleSelector');

			var movieFile = movieSelector.data(uiFileSelector.SELECTED_FILE_KEY);
			var movieURL = (global.webkitURL ? webkitURL : URL).createObjectURL(movieFile);
			player.setSrc(movieURL);
			uiFX.fadeOutIn(selectorPanel, playerPanel, function() {
				player.play();
			});

			var subtitleFile = subtitleSelector.data(uiFileSelector.SELECTED_FILE_KEY);
			var trackEl = document.querySelector('#videoSubtitles');
			if (subtitleFile) {
			  var reader = new FileReader();
			  reader.onload = function(e) {
			    var parsed = SRTParser.parse(reader.result);
			    parsed.forEach(function(cue) {
			    	trackEl.track.addCue(cue);
			    });
			    if (2 == 3) {}
			    trackEl.track.mode = 'showing';
			  };
			  reader.readAsText(subtitleFile);
			}
			else {
				trackEl.track.mode = 'disabled';
			}
		});
		// initialize file selectors
		selectorPanel.find('.file-selector').each(function() {
			var fileSelector = query(this);
			if (fileSelector.is('#movieSelector')) {
				fileSelector.on(uiFileSelector.SELECTED_EVENT, function(e) {
					playTrigger.attr({
						disabled: !e.selected
					});
				});
			}
			uiFileSelector.init(fileSelector);
		});


		// initialize video panel
		var player = new Player('#videoPlayer', {
			type: 'video/mp4',
		    success: function (mediaElement, domObject) {
				setTimeout(function() {
					uiFX.fadeOutIn(splash, selectorPanel);
				}, 1 * 1000);
	    	}
		});
	};
})(window, $, MediaElementPlayer);
