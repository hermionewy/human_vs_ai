function init(slideID) {
	console.log('speech logic');
	const speechGuessContainer = d3.select(slideID).select('.checkbox-container');
	const allBtns = speechGuessContainer.selectAll('.checkbox-btn');

	allBtns.on('click', function () {
		const btn = d3.select(this);
		const node = btn.nodes()[0];

		const btnValue = (d3.select(node).attr('data-value')=='true');
		console.log(d3.select(node).attr('data-value'));
		if(btnValue){
			d3.select(node).classed('checked-correct', true);
		} else {
			d3.select(node).classed('checked-wrong', true);
		}

	})

}

export default { init }
