(function()
// main 
 {
	'use strict';

	var paint_canvas = null;
	var paint_canvas_g = null;

	var drawing = false;
	var prevPoint = {x:0, y:0};

	window.onload = function() {
		paint_canvas = document.getElementById('paint-canvas');
		paint_canvas_g = paint_canvas.getContext('2d');

		document.addEventListener('mousedown', onMouseDown, false);
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mouseup',   onMouseUp,   false);
	};


	function onMouseDown(e) {
		drawing = true;

		var rect = paint_canvas.getBoundingClientRect();
		prevPoint.x = e.clientX - rect.left;
		prevPoint.y = e.clientY - rect.top;
	}

	function onMouseMove(e) {
		if (drawing) {
			var rect = paint_canvas.getBoundingClientRect();
			var x =  e.clientX - rect.left;
			var y =  e.clientY - rect.top;

			paint_canvas_g.lineWidth = 1;

			paint_canvas_g.beginPath();
			paint_canvas_g.moveTo(prevPoint.x, prevPoint.y);
			paint_canvas_g.lineTo(x, y);
			paint_canvas_g.stroke();

			prevPoint.x = x;
			prevPoint.y = y;
		}
	}

	function onMouseUp() {
		drawing = false;
	}


})();
