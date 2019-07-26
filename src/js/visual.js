function init(id) {
	const btnID = `#${id}__PlayBtn`;
	const videoID = `${id}__video`;
	d3.select( btnID ).on('click', () => {
		const video= document.getElementById( videoID );
		video.currentTime = 0;
		video.play()
	});
}

export default { init }
