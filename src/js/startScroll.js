import enterView from 'enter-view';

const stepSel = d3.selectAll('.start1-step');

function init() {
	console.log('init');
	const startImgHeight = document.getElementById('step-0-img').clientHeight;
	console.log('height of image: ', startImgHeight);
	d3.select('.start-img-container').style('height', `${startImgHeight}px`);
	enterView({
		selector: stepSel.nodes(),
		offset: 0.2,
		enter: el => {
			const index = +d3.select(el).attr('data-index');
			switchIndex( index );
		},
		exit: el => {
			let index = +d3.select(el).attr('data-index');
			index = Math.max(0, index - 1);
			switchIndex( index );
		}
	});
}


function switchIndex(idx) {
	d3.selectAll('.step').classed('is-active', false);
	d3.select(`#step-${idx}`)
		.classed('is-active', true);
	d3.selectAll('.card-sci-start__p').classed('active', false);
	d3.select(`#step-${idx}`).select('.card-sci-start__p').classed('active', true);
	const cardImgs = d3.select('#start-1').selectAll('.card-sci-img');
	cardImgs.classed('active', false);
	d3.select(`#step-${idx+1}-img`).classed('active', true);

	if(idx==8){
	    setTimeout(()=>{
			window.location.hash = '#start-2'
		}, 800)
	}
	// const imgPath = `assets/images/start/animation/glitche_face_v2_${  idx+3 }.jpg`;
	// const cardImg = d3.select('#start-1').select('.card-sci-img');
	// cardImg
	// 	.attr('data-src', imgPath)
	// 	.attr('src', imgPath)
	// 	.style('opacity', 1)
}
export default { init, switchIndex }
