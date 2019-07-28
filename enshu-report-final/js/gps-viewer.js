(function() {
	'use strict';
	var _viewerMap = null;
	var _chartArea = null;
	var _logData = null;

	// 色定義
	const SPEED_COLORS = [
		'#00C', //  0-15
		'#0B5', // 15-30
		'#DC0', // 30-45
		'#F00'  // 45-
	];


	window.onload = function() {
		setupFileDrop(document.body);
	};

	function afterFileLoad(e) {
		showMainScreen();

		// ● ここで各クラスを実体化します
		_viewerMap = new ViewerMap('map-area');
		_chartArea = new ChartArea('chart-area');
		_logData = new GPSLogData(e.target.result);

		_logData.calcSpeed(_viewerMap.map);

		_chartArea.buildChart(_logData);
		_viewerMap.showTrajectory(_logData);

		_chartArea.hoverHandler = function(record) {
			_viewerMap.highlightSection(record);

		};
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

	// ● ここから下がクラスを追加した場所です

	class ViewerMap {
		constructor(container_id) {
			this.element = document.getElementById(container_id);
			this.map = L.map(this.element).setView([36.1, 139.7], 10);
			this.polylines = [];
			L.tileLayer(
				"https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png", {
				attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
			}).addTo(this.map);
		}

		showTrajectory(logData) {
			// ● 演習第6回で追加: 区間ごとに色の違うラインを生成
			// console.log(logData)
			const records = logData.records;
			const n = records.length - 1;
			this.polylines.length = 0;
			var center = {lat:records[0].lat, lng:records[0].lng}
			console.log(center)
			for (var i = 0;i < n;++i) {
				const r1 = records[i];
				const r2 = records[i + 1];
				center.lat = center.lat + r2.lat
				center.lng = center.lng + r2.lng
				const pl = L.polyline([r1, r2],{
					opacity: 0.5,
					weight: 2,
					color: getColorForSpeed(r1.speedToNext)
				}).addTo(this.map);
				L.marker({lat:(r1.lat + r2.lat) / 2, lon:(r1.lng + r2.lng) / 2}).
					addTo(this.map).
					bindPopup( 'Distance: '+ this.map.distance(r1, r2) + ' m' +
						'<br>Speed: '+ r1.speedToNext + ' km/h');
				this.polylines.push(pl);
			}
			center.lat = center.lat / (n+1)
			center.lng = center.lng / (n+1)
			this.map.flyTo([center.lat, center.lng], 12)
		}

		// ● 演習第6回で追加: 指定した区間を強調表示
		highlightSection(firstRecord) {
			const target = this.polylines[firstRecord.index];
			for (const pl of this.polylines) {
				pl.setStyle({
					opacity: (pl === target) ? 1 : 0.5,
					weight:  (pl === target) ? 6 : 2
				});
			}
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
			// ● 演習第6回で追加:
			// チャートのデータを準備
			const records = logData.records;
			const chartData = [];
			const colorList = [];
			for (const r of records) {
				chartData.push(
					{
						record: r,
						x: r.relTime,
						y: ToKmH(r.speedToNext)
					}
				);

				colorList.push( getColorForSpeed(r.speedToNext) );
			}

			const that = this;
			this.chart = new Chart(this.chartCanvas.getContext('2d'), {
				type: 'scatter',
				data: {
					datasets: [
						{
							label: "Speed(km/h)",
							data: chartData,
							//  ↑ダミーデータから差し替え
							showLine: true,
							// 色のリストを指定
							pointBorderColor: colorList,
							pointBackgroundColor: colorList
						}
					]
				},
				options: {
					tooltips: {
						callbacks: {
							// ● 演習第6回で追加:
							// ポイントにマウスカーソルを乗せた時の処理
							label: function(tooltipItem, data) {
								const dataList = data.datasets[tooltipItem.datasetIndex].data;
								const record = dataList[tooltipItem.index].record;

								that.onToolTipShown(record);
								return record.time;
							},

							afterLabel: function(tooltipItem, data) {
								const dataList = data.datasets[tooltipItem.datasetIndex].data;
								const record = dataList[tooltipItem.index].record;

								return ToKmH(record.speedToNext).toFixed(1) + 'km/h';
							}
						}
					}
				}
			});
		}

		onToolTipShown(record) {
			if (this.hoverHandler) {
				this.hoverHandler(record);
			}
		}
	}

	class GPSLogData {
		constructor(source) {
			this.records = [ ];

			this.columnMapping = {
				time: 0,
				lat: 1,
				lng: 2
			};

			const lines = source.split(/\n+/);
			for (const ln of lines) {
				var fields = ln.split(/ *, */);
				if (fields[0].indexOf('-') < 0) {
					 fields[0] = '2018-04-12T' + fields[0] + '+09:00';
				}
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

			//  チャートの横軸のために相対時間(最初のレコードからの秒数)を記録しておきます
			if (this.records.length) {
				const first = this.records[0];
				// Dateオブジェクト同士の引き算でミリ秒が得られるので1000で割って秒にします
				record.relTime = Math.floor( (record.time - first.time) / 1000.0 );
			}
			return record;
		}

		// ● 演習第6回で追加: 速さを計算してレコードに記録しておきます
		calcSpeed(map) {
			const n = this.records.length - 1;
			for (var i = 0;i < n;++i) {
				const r1 = this.records[i  ];
				const r2 = this.records[i+1];

				const dtime = (r2.time - r1.time) / 1000.0;
				if (dtime) {
					const distance = map.distance(r1, r2);
					r1.speedToNext = distance / dtime;
				}
			}
		}
	}
})();
