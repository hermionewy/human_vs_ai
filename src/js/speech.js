function init(slideID) {
	const speechGuessContainer = d3.select(slideID).select('.checkbox-container');
	const allBtns = speechGuessContainer.selectAll('.checkbox-btn');
	const cowbellVid = document.getElementById('speech-5-video');
	d3.selectAll('.checkbox-btn').classed('checked-correct', false);
	d3.selectAll('.checkbox-btn').classed('checked-wrong', false);
	allBtns.on('click', function () {
		const btn = d3.select(this);
		const node = btn.nodes()[0];
		const btnValue = (d3.select(node).attr('data-value')=='true');
		if(btnValue){
			d3.select(node).classed('checked-correct', true);
			// d3.select(slideID).select('.btn--div').classed('active', true);
		} else {
			d3.select(node).classed('checked-wrong', true);
		}
	});
	d3.select('#speech-5__btn-0').on('click', ()=>{
	    setTimeout(()=>{
			d3.select('#speech-5__btn-1').classed('active', true);
		}, 5000);
		d3.select('#speech-5').select('.hero__img').classed('hide', true);
		d3.select('#speech-5').select('.videoElem').classed('show', true);
		cowbellVid.play()
	});
}

export default { init }
