function init(id) {
	if(id){
		const btnID = `#${id}__PlayBtn`;
		const videoID = `${id}__video`;
		const video= document.getElementById( videoID );
		if(video){
			video.pause();
		}
		d3.select( btnID ).classed('hide', false);
		d3.select(`#${id}`).select('.btn--div')
			.classed('active', false);
		d3.select( btnID ).on('click', () => {
			video.currentTime = 0.001;
			video.play();
			setTimeout(()=>{
				d3.select( btnID ).classed('hide', true);
				d3.select(`#${id}`).select('.btn--div')
					.classed('active', true)
			}, 3000)
		});
	}
}

export default { init }
