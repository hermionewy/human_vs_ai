const sliderArr = ['music-4__slider-0', 'music-4__slider-1', 'music-5__slider-0', 'music-5__slider-1', 'music-7__slider-0', 'music-7__slider-1', 'music-8__slider-0', 'music-8__slider-1'];

function init() {
	sliderArr.forEach( slider=>{
	    const rangeslider = document.getElementById(slider);
		rangeslider.oninput = function() {
			const value = this.value;
			console.log('sliderValue: ', value )
		}
	});
}

export default {init}
