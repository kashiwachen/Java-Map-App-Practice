(function() {
	'use strict';
	var _viewerMap = null;
	var _chartArea = null;
	var _logData = null;


	window.onload = function() {
		setupFileDrop(document.body);
	};

	function afterFileLoad(e) {
		showMainScreen();
	}

	function showMainScreen() {
		document.getElementById('welcome').style.display = 'none';
		document.getElementById('main-screen').style.display = 'table';
	}
	
	// Drag and Drop setup
	function setupFileDrop(target) {
		target.addEventListener('dragover', handleDragOver, false);
		target.addEventListener('drop', handleDrop, false);
	}
	
	function handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}
	
	function handleDrop(e) {
		e.stopPropagation();
		e.preventDefault();
		
		const files = e.dataTransfer.files;
		if (files[0]) {
			const reader = new FileReader();
			reader.onload = afterFileLoad;
			
			reader.readAsText(files[0]);
		}
	}

	function getColorForSpeed(MperS) {
		const kmh = ToKmH(MperS);
		var i = Math.floor(kmh / 15);
		if (i >= SPEED_COLORS.length) {
			i = SPEED_COLORS.length - 1;
		}

		return SPEED_COLORS[i];
	}

	function ToKmH(MperS) { return MperS * 3.6; }
})();