(function() {
	'use strict';

	window.onload = function() {
		// -----------------------------------------
		var a = ['cat', 'dog', 'human', 'cow'];
		// ↑ change here 演習でここを書き換えます
		// -----------------------------------------
		var dict = {'cat':'Neko', 'dog':'Inu', 'cow':'Gyu', 'Human':'Ningen'};
		for (var i in a) {
			// a[i] = translate(a[i]);
			a[i] = translate(a[i],dict);
		}

		showArray(a);
	};

	// translate function
	function translate(word,dict){
		if (dict.hasOwnProperty(word)==true){
			return dict[word];
		}
		else{
			return '?'
		}
		// return dict[word]

	}


	// ここから表示の処理
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
