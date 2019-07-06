import enterView from 'enter-view';

const stepSel = d3.selectAll('.start1-step');

function init() {
	console.log('init');
	enterView({
		selector: stepSel.nodes(),
		offset: 0.2,
		enter: el => {
			const index = +d3.select(el).attr('data-index');
			d3.selectAll('.step').classed('is-active', false);
			d3.select(`#step-${index}`)
				.classed('is-active', true);
			console.log('enter', index);
			switchIndex( index );
			// scene.index(index)();
			// updateChart
			//     .index(index)();
		},
		exit: el => {
			let index = +d3.select(el).attr('data-index');
			index = Math.max(0, index - 1);
			d3.selectAll('.step').classed('is-active', false);
			d3.select(`#step-${index}`)
				.classed('is-active', true);
			console.log('exit', index);
			switchIndex( index );
		}
	});
}


function switchIndex(idx) {
	const imgPath = `assets/images/start/animation/glitche_face_v2_${  idx+3 }.jpg`;
	d3.select('#start-1').select('.card-sci-img')
		.attr('data-src', imgPath)
		.attr('src', imgPath);
}
export default { init }
