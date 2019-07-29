function init() {
	const btns =[
		'music-4__PlayBtn-0',
		'music-4__PlayBtn-1',
		'music-7__PlayBtn-0',
		'music-7__PlayBtn-1',
	];
	const btnsCount ={ 'music-4__PlayBtn-0': 0, 'music-4__PlayBtn-1': 0, 'music-7__PlayBtn-0': 0, 'music-7__PlayBtn-1':0 };
	const audios =[
		'music-4__audio-0',
		'music-4__audio-1',
		'music-7__audio-0',
		'music-7__audio-1',
	];
	btns.forEach( (btn, idx) =>{
		d3.select(`#${btn}`).on('click', ()=>{
			const audio = document.getElementById ( audios[idx] );
			const clickedBtn = d3.select(`#${btn}`);
			btnsCount[btn]++;
			if(btnsCount[btn]%2){
				audio.play();
				clickedBtn.selectAll('.play-svg.play').classed('active', false);
				clickedBtn.selectAll('.play-svg.pause').classed('active', true)
			} else {
			    audio.pause();
				clickedBtn.selectAll('.play-svg.play').classed('active', true);
				clickedBtn.selectAll('.play-svg.pause').classed('active', false)
			}
		})
	});

}

export default { init }
