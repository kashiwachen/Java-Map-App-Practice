var DATA = JSON.parse('{"line_cd":99309,"line_name":"つくばエクスプレス","line_lon":139.93750930625004,"line_lat":35.90577190655734,"line_zoom":10,"station_l":[{"station_cd":9930901,"station_g_cd":1130222,"station_name":"秋葉原","lon":139.774273,"lat":35.698889},{"station_cd":9930902,"station_g_cd":9930111,"station_name":"新御徒町","lon":139.781958,"lat":35.707045},{"station_cd":9930903,"station_g_cd":9930903,"station_name":"浅草","lon":139.792389,"lat":35.713817},{"station_cd":9930904,"station_g_cd":1132004,"station_name":"南千住","lon":139.798783,"lat":35.732413},{"station_cd":9930905,"station_g_cd":1132005,"station_name":"北千住","lon":139.805092,"lat":35.74949},{"station_cd":9930906,"station_g_cd":9930906,"station_name":"青井","lon":139.82038,"lat":35.771782},{"station_cd":9930907,"station_g_cd":9930907,"station_name":"六町","lon":139.821816,"lat":35.784963},{"station_cd":9930908,"station_g_cd":9930908,"station_name":"八潮","lon":139.845017,"lat":35.807905},{"station_cd":9930909,"station_g_cd":9930909,"station_name":"三郷中央","lon":139.878344,"lat":35.824514},{"station_cd":9930910,"station_g_cd":1130518,"station_name":"南流山","lon":139.903271,"lat":35.83869},{"station_cd":9930911,"station_g_cd":9930911,"station_name":"流山セントラルパーク","lon":139.915223,"lat":35.854552},{"station_cd":9930912,"station_g_cd":2100422,"station_name":"流山おおたかの森","lon":139.925044,"lat":35.871799},{"station_cd":9930913,"station_g_cd":9930913,"station_name":"柏の葉キャンパス","lon":139.952454,"lat":35.89308},{"station_cd":9930914,"station_g_cd":9930914,"station_name":"柏たなか","lon":139.957533,"lat":35.9109},{"station_cd":9930915,"station_g_cd":9930915,"station_name":"守谷","lon":139.992209,"lat":35.950626},{"station_cd":9930916,"station_g_cd":9930916,"station_name":"みらい平","lon":140.038555,"lat":35.99514},{"station_cd":9930917,"station_g_cd":9930917,"station_name":"みどりの","lon":140.056276,"lat":36.03025},{"station_cd":9930918,"station_g_cd":9930918,"station_name":"万博記念公園","lon":140.059256,"lat":36.058410},{"station_cd":9930919,"station_g_cd":9930919,"station_name":"研究学園","lon":140.082256,"lat":36.0821},{"station_cd":9930920,"station_g_cd":9930920,"station_name":"つくば","lon":140.110604,"lat":36.0825}]}');
for (var st of DATA.station_l){console.log(st.station_name + st.lat + st.lon);}
