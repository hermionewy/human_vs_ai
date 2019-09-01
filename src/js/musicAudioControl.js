function init() {
	const btns =[
		'music-3__PlayBtn-0',
		'music-3__PlayBtn-1',
		'music-6__PlayBtn-0',
		'music-6__PlayBtn-1',
	];
	const btnsCount ={ 'music-3__PlayBtn-0': 0, 'music-3__PlayBtn-1': 0, 'music-6__PlayBtn-0': 0, 'music-6__PlayBtn-1':0 };
	const audios =[
		'music-3__audio-0',
		'music-3__audio-1',
		'music-6__audio-0',
		'music-6__audio-1',
	];
	btns.forEach( (btn, idx) =>{
		d3.select(`#${btn}`).on('click', ()=>{
			const audio = document.getElementById ( audios[idx] );
			const idx2 = getAudioIndex(idx);
			const theOtherAudio = document.getElementById ( audios[idx2] );
			const clickedBtn = d3.select(`#${btn}`);
			const theOtherBtn =d3.select ( `#${ btns[idx2]}` );
			if(!theOtherAudio.paused){
			    console.log('pause the audio')
				theOtherAudio.pause();
				btnsCount[ btns[idx2] ]++;
				theOtherBtn.selectAll('.play-svg.play').classed('active', true);
				theOtherBtn.selectAll('.play-svg.pause').classed('active', false);
			}
			btnsCount[btn]++;
			if(btnsCount[btn]%2){
				audioPlay()
			} else {
			    audioPause()
			}
			audio.onended=function () {
				audioPause();
				btnsCount[btn]++;
			};
			// theOtherAudio.onpause = function () {
			// 	theOtherBtn.selectAll('.play-svg.play').classed('active', false);
			// 	theOtherBtn.selectAll('.play-svg.pause').classed('active', true);
			// }
			function audioPlay() {
				audio.play();
				clickedBtn.selectAll('.play-svg.play').classed('active', false);
				clickedBtn.selectAll('.play-svg.pause').classed('active', true)
			}
			function audioPause() {
				audio.pause();
				clickedBtn.selectAll('.play-svg.play').classed('active', true);
				clickedBtn.selectAll('.play-svg.pause').classed('active', false)
			}
		})
	});

	function getAudioIndex(idx) {
		if(idx==0){
			return 1;
		} if(idx==1){
			return 0;
		} if(idx==2){
			return 3;
		} if(idx==3){
			return 2;
		}
	}

}

export default { init }
