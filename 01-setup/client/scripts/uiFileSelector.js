
var uiFileSelector = {
	SELECTED_EVENT: 'selected',
	SELECTED_FILE_KEY: 'selected_file',

	init: function(fileSelectorQuery) {
		var trigger = fileSelectorQuery.find('.file-selector-trigger');
		var info = fileSelectorQuery.find('.file-selector-info');
		var input = fileSelectorQuery.find('.file-selector-input');

		var updateFileSelectorState = function(file) {
			fileSelectorQuery.data(uiFileSelector.SELECTED_FILE_KEY, file);
			info.text(file && file.name);
			trigger.text(function() {
				return file && trigger.data('title-selected') || trigger.data('title');
			});
			fileSelectorQuery.trigger({
				type: uiFileSelector.SELECTED_EVENT,
				selected: !!file
			});
		};

		trigger.click(function() {
			input.click();
		});

		input.css({
			visibility: 'hidden',
			height: 0
		}).change(function() {
			updateFileSelectorState(this.files[0]);
		}).triggerHandler('change');
	}
};
