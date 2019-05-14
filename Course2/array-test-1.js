(function() {
	'use strict';

	window.onload = function() {
		// -----------------------------------------
		var a = ['cat', 'dog', 'human', 'cow'];
		// ↑ change here 演習でここを書き換えます
		// -----------------------------------------

		showArray(a);
	};

	function showArray(a) {
		var outElement = document.getElementById('out-area');
		outElement.innerHTML = '';

		var n = a.length;
		for (var i = 0;i < n;++i) {
			var box = document.createElement('div');
			box.appendChild( document.createTextNode(i +': '+ a[i]) );

			outElement.appendChild(box);
		}
	}
})();
