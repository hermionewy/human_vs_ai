function init(slideID) {
	const speechGuessContainer = d3.select(slideID).select('.checkbox-container');
	const allBtns = speechGuessContainer.selectAll('.checkbox-btn');
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

	})

}

export default { init }
