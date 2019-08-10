function init(id) {
	const btnID = `#${id}__PlayBtn`;
	const videoID = `${id}__video`;
	const video= document.getElementById( videoID );
	video.pause();
	d3.select( btnID ).on('click', () => {
		video.currentTime = 0.001;
		video.play();
		setTimeout(()=>{
			d3.select(`#${id}`).select('.btn--div')
				.classed('active', true)
		}, 3000)
	});
}

export default { init }
