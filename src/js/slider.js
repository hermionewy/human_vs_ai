import debounce from 'lodash.debounce';

const sliderArr = ['music-4__slider-0', 'music-4__slider-1', 'music-5__slider-0', 'music-5__slider-1', 'music-7__slider-0', 'music-7__slider-1', 'music-8__slider-0', 'music-8__slider-1'];
const sliderValue ={
	'music-4__slider-0': 0.5,
	'music-4__slider-1': 0.5,
	'music-5__slider-0': 0.5,
	'music-5__slider-1': 0.5,
	'music-7__slider-0': 0.5,
	'music-7__slider-1': 0.5,
	'music-8__slider-0': 0.5,
	'music-8__slider-1':0.5
};
function init() {
	sliderArr.forEach( (slider, idx)=>{
		const rangeslider = document.getElementById(slider);
	    if([2, 3, 6, 7].indexOf(idx)>-1) {
			rangeslider.disabled = true;
		} else {
			rangeslider.oninput = debounce(changeInput, 300);
		}
	});
}

function changeInput() {
	const rangeValue = this.value;
	const inputID = d3.select(this).attr('id');
	console.log(inputID, rangeValue);
	window.musicSliders[ inputID ]= rangeValue;
	console.log('window musicSliders', window.musicSliders );
	const newID = +(inputID.split('__')[0].split('-')[1]) +1 ;
	const relatedID = `music-${ newID }__slider-${  inputID.split('__')[1].split('-')[1]}`;
	const parentID = `music-${ newID }__sliderContainer-${  inputID.split('__')[1].split('-')[1]}`;
	console.log('relatedID: ', relatedID );
	console.log('parentID: ', parentID );
	document.getElementById( relatedID ).value = rangeValue;
	const spotifyRing = d3.select(`#${ parentID }`).select('.slider-ring');
	const spotifyScore = +(spotifyRing.attr('data-attr'))*90+3+'%';
	spotifyRing.style('left', spotifyScore);
	console.log('@@@@@@@@@@@spotify Score: ', spotifyScore);


}

export default {init}
