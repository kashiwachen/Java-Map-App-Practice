(function() {
	'use strict';
	var map;

	var TIME_COLUMN = 0;
	var LAT_COLUMN  = 1;
	var LNG_COLUMN  = 2;

	window.onload = function() {
		setupMap();
		document.
		 getElementById('trigger').
		 addEventListener('click', onTriggerClick, false);
	};
	
	function setupMap() {
		map = L.map('map-area').setView([36.0, 139.9], 9);
		L.tileLayer(
			"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
			attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
		}).addTo(map);
	}


	function onTriggerClick() {
		var tx = document.getElementById('in-text');
		var lines = tx.value.split(/ *\n */);
		for (var line of lines) {
			console.log(line);
		}
	}

	function parseTime(raw) {
		if (raw.indexOf('-') < 0) {
			// iOS mode
			// 仮の日付を付加する(元データに合わせて書き換え)
			raw = '2018-04-12T' + raw + '+09:00';
			console.log(raw);
		}
	
		var d = new Date(raw);
		return d;
	}

	function generatePolylineKML(coords) {
		// KMLのテンプレート
		// $COORDS の部分を座標のリストで置き換える
		var template = [
			'<kml xmlns="http://www.opengis.net/kml/2.2">',
			' <Placemark>',
			'  <LineString>',
			'   <tessellate>0</tessellate> <altitudeMode>absolute</altitudeMode>',
			'   <coordinates>$COORDS</coordinates>',
			'  </LineString>',
			' </Placemark>',
			'</kml>'
		].join("\n");
		
		var kml_coords = [];
		for (var c of coords) {
			kml_coords.push(c[1]+','+c[0]);
		}
		
		return template.replace('$COORDS', kml_coords.join(' '));
	}

})();