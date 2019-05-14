(function() {
	'use strict';
	var map;

	window.onload = function() {
		setupMap();
		// ※ setupMap()内で map に地図オブジェクトがセットされる
		//   map に対する操作はこれ以降に記述

		document.
 		getElementById('btn-tx').
 		addEventListener('click', onLoadButtonClick, false);
		// L.marker practice
		// L.marker([ 35.900218, 139.933751 ]).addTo(map);
		// L.marker({lat: 35.713511, lng: 139.761867}).addTo(map);
		// L.marker({lat: 35.661964, lon: 139.678269}).addTo(map);
		// L.marker([ 35.900218, 139.933751 ]).addTo(map);
		// L.marker({lat: 35.713511, lng: 139.761867}).addTo(map);
		// L.marker({lat: 35.661964, lon: 139.678269}).addTo(map);

		// polyline practice
		// L.polyline([
		// 	[35.6465034, 139.710216],
		// 	[35.6501651, 139.708221],
		// 	[35.6514031, 139.707362],
		// 	[35.6532338, 139.705753],
		// 	[35.6562153, 139.702985],
		// 	[35.6577321, 139.701869],
		// 	[35.6588131, 139.701376],
		// 	[35.6601032, 139.701268],
		// 	[35.6629623, 139.701483],
		// 	[35.6668848, 139.702041]
		// ]).addTo(map);
		// L.polyline(coords, {color: 'red', weight: 7}).addTo(map);
		// var DATA = {"line_cd":99309,"line_name":"つくばエクスプレス","line_lon":139.93750930625004,"line_lat":35.90577190655734,"line_zoom":10,"station_l":[{"station_cd":9930901,"station_g_cd":1130222,"station_name":"秋葉原","lon":139.774273,"lat":35.698889},{"station_cd":9930902,"station_g_cd":9930111,"station_name":"新御徒町","lon":139.781958,"lat":35.707045},{"station_cd":9930903,"station_g_cd":9930903,"station_name":"浅草","lon":139.792389,"lat":35.713817},{"station_cd":9930904,"station_g_cd":1132004,"station_name":"南千住","lon":139.798783,"lat":35.732413},{"station_cd":9930905,"station_g_cd":1132005,"station_name":"北千住","lon":139.805092,"lat":35.74949},{"station_cd":9930906,"station_g_cd":9930906,"station_name":"青井","lon":139.82038,"lat":35.771782},{"station_cd":9930907,"station_g_cd":9930907,"station_name":"六町","lon":139.821816,"lat":35.784963},{"station_cd":9930908,"station_g_cd":9930908,"station_name":"八潮","lon":139.845017,"lat":35.807905},{"station_cd":9930909,"station_g_cd":9930909,"station_name":"三郷中央","lon":139.878344,"lat":35.824514},{"station_cd":9930910,"station_g_cd":1130518,"station_name":"南流山","lon":139.903271,"lat":35.83869},{"station_cd":9930911,"station_g_cd":9930911,"station_name":"流山セントラルパーク","lon":139.915223,"lat":35.854552},{"station_cd":9930912,"station_g_cd":2100422,"station_name":"流山おおたかの森","lon":139.925044,"lat":35.871799},{"station_cd":9930913,"station_g_cd":9930913,"station_name":"柏の葉キャンパス","lon":139.952454,"lat":35.89308},{"station_cd":9930914,"station_g_cd":9930914,"station_name":"柏たなか","lon":139.957533,"lat":35.9109},{"station_cd":9930915,"station_g_cd":9930915,"station_name":"守谷","lon":139.992209,"lat":35.950626},{"station_cd":9930916,"station_g_cd":9930916,"station_name":"みらい平","lon":140.038555,"lat":35.99514},{"station_cd":9930917,"station_g_cd":9930917,"station_name":"みどりの","lon":140.056276,"lat":36.03025},{"station_cd":9930918,"station_g_cd":9930918,"station_name":"万博記念公園","lon":140.059256,"lat":36.058410},{"station_cd":9930919,"station_g_cd":9930919,"station_name":"研究学園","lon":140.082256,"lat":36.0821},{"station_cd":9930920,"station_g_cd":9930920,"station_name":"つくば","lon":140.110604,"lat":36.0825}]};
		// The following can belong to window.xml={...}
		// var list = [];
		// for (var st of DATA.station_l){
		// 	list.push([st.lat, st.lon]);
		// 	// console.log(st.station_name + st.lat + st.lon);
		// 	L.marker({lat:st.lat, lon:st.lon}).addTo(map).bindPopup( '緯度: '+ st.lat +'<br>経度: '+ st.lon);
		// };
		// // console.log(list);
		// L.polyline(list,{color:'red',weight:7}).addTo(map);

	};


	function setupMap() {
		map = L.map('map-area').setView([36.0, 139.9], 9);

		L.tileLayer(
			"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
			attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
		}).addTo(map);
	}

		// Little play
		// function onLoadButtonClick() {
		// 	console.log('A')
		// }


		function onLoadButtonClick(event) {
			loadJSONP(event.target.getAttribute('data-url'));
		}


		function loadJSONP(address){
			var element = document.createElement('script');
			element.type = "text/javascript";
			element.src = address;
			document.body.appendChild(element);
		}


		window.xml =
		{
			onload : function(DATA)
			{
				var list = [];
				for (var st of DATA.station_l)
				{
					list.push([st.lat, st.lon]);
					// console.log(st.station_name + st.lat + st.lon);
					L.marker({lat:st.lat, lon:st.lon}).addTo(map).bindPopup( '緯度: '+ st.lat +'<br>経度: '+ st.lon);
				};
				// console.log(list);
				L.polyline(list,{color:'red',weight:7}).addTo(map);
			}
		}

})();
