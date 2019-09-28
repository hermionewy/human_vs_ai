function init(id) {
    console.log('visual init: ', id);
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
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			video.currentTime = 0.001;
			video.play();
			setTimeout(()=>{
				d3.select( btnID ).classed('hide', true);
				d3.select(`#${id}`).select('.btn--div')
					.classed('active', true);

				// change title and hide content
				visualInitStatus(id, true)
			}, 3000)

		});


	}
}
function visualInitStatus(id, isVidEnd = true ){
	d3.select(`#${id}`)
		.selectAll('.card__content__p')
		.classed('hidden', isVidEnd);
	d3.select(`#${id}__title`).classed('hidden', isVidEnd);
	d3.select(`#${id}__altTitle`).classed('hidden', !isVidEnd);
}

export default { init, visualInitStatus }
