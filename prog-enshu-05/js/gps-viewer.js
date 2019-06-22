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
		console.log(e.target.result);

		_viewerMap = new ViewerMap('map-area');
		_chartArea = new ChartArea('chart-area');
		_logData = new GPSLogData(e.target.result);


		_chartArea.buildChart(_logData);
		// console.log(_logData);
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


	class ViewerMap {
		constructor(container_id) {
			this.element = document.getElementById(container_id);
			this.map = L.map(this.element).setView([36.1, 139.7], 10);
			this.polylines = [];
			L.tileLayer(
			"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
				attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>,under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a>contributors, under ODbL."
			}).addTo(this.map);
	 }
	}


	class ChartArea {
		constructor(container_id) {
			this.chart = null;
			this.element = document.getElementById(container_id);
			this.buildScreen(this.element);
			}
			buildScreen(container) {
				const heading = document.createElement('h2');
				heading.innerHTML = 'Speed chart';
				container.appendChild(heading);

				this.chartCanvas = document.createElement('canvas');
				container.appendChild( this.chartCanvas );
			}
			buildChart(logData) {
				this.chart = new Chart(this.chartCanvas.getContext('2d'), {
				type: 'scatter',
				data: {
					datasets: [
						{
							label: "Speed(km/h)",
							data: [ {x:0, y:0} , {x:10, y:30} , {x:20, y:20} ],
							showLine: true
						}
					]
				}
			});
		}
	}


	class GPSLogData {
		constructor(source) {
		this.columnMapping = {
			time: 0,
			lat: 1,
			lng: 2
		};


			this.records = [];

			const lines = source.split(/\n+/);
			for (const ln of lines) {
				const fields = ln.split(/ *, */);
				if (fields.length > 2) {
					this.readFields(fields);
				}
			}
		}

		readFields(fields) {
			const record = {
				time: new Date(fields[ this.columnMapping.time ]),
				lat: parseFloat(fields[ this.columnMapping.lat ]),
				lng: parseFloat(fields[ this.columnMapping.lng ]),
				speedToNext: 0,
				relTime: 0,
				index: this.records.length
			};

			this.records.push(record);
			return record;
		}
	}
})();
