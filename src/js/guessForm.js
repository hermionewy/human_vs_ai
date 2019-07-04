import card from './card';

const hideAllCard = card.hideAllCards;
const {showCard} = card;

const rightAnswers = {'visual': ['bicycle', 'stop-sign', 'car']};
const $checkboxBtn = d3.selectAll('checkbox-btn');
const visualCheckBtns = ['tree', 'traffic-signal', 'bicycle', 'bus', 'stop-sign', 'car', 'trash-can'];
const selectedBtn={'tree':0, 'traffic-signal':0, 'bicycle': 0, 'bus': 0, 'stop-sign':0, 'car':0, 'trash-can':0 };
const clickCount={'tree':0, 'traffic-signal':0, 'bicycle': 0, 'bus': 0, 'stop-sign':0, 'car':0, 'trash-can':0 };
let start = 0; let selectedArr=[];
let timeOutTimer=0;
function init() {
	const guessBtnVisual = d3.select('#guessbtn-visual');
	chooseCategories();
	// dynamically change guessVisual btn's url
	guessBtnVisual.on('click', ()=>{
		const correctIntersection = validateBtns( window.AIUserChoice, 'visual' );
	});
}

function guessBtnsInit() {
	visualCheckBtns.forEach(btn=>{
	    d3.select(`#${btn}`).classed('active', false);
	    d3.select(`#${btn}`).classed('checked-correct', false);
	    d3.select(`#${btn}`).classed('checked-wrong', false);
		selectedBtn[btn]=0;
		clickCount[btn]=0;
		start =0;
		selectedArr=[];
		window.AIUserChoice=[];
	});
}

function updateGuessBtnURL(uChoice, ctg) {
	const rightArr = rightAnswers[ctg];
	if( rightArr.sort().join(',') == uChoice.sort().join(',') ) {
	    // compare if two arrays are equal when the order doesn't matter
	    // all correct answers
		d3.select(`#guessbtn-${ctg}`).attr('href', `#${ctg}-100`);
		console.log('All answers are correct!!!');
	} else {
	    // incorrect answers: update btn, update next slide's title
	    const nextClue = getNextClue();
		d3.select(`#guessbtn-${ctg}`).attr('href', `#${ nextClue }`);
		const message = guessWrongReturnTitle(uChoice, ctg);
		d3.select(`#${ nextClue }`).select('.title__game').html(`${message} wrong. Here's another clue. `);
	}
}

function validateBtns(uChoice, attr) {
	// right answers add class "checked-correct", turn green, wrong answers add class "checked-wrong" turn light red
	const rightArr = rightAnswers[attr];
	// d3.selectAll('.checkbox-btn').classed('active', false);
	// d3.selectAll('.checkbox-btn').classed('checked-wrong', false);
	// d3.selectAll('.checkbox-btn').classed('checked-correct', false);
	if(uChoice){
		const correctIntersection = uChoice.filter(r=>rightArr.includes(r));
		const incorrectAnswer = uChoice.filter( r=>!rightArr.includes(r) );

		correctIntersection.forEach(ci=>{
			d3.select(`#${ci}`).classed('checked-correct', true);
			d3.select(`#${ci}`).classed('active', false);
		});
		incorrectAnswer.forEach(ici=>{
			d3.select(`#${ici}`).classed('checked-wrong', true);
			selectedBtn[ici]=0;
			clickCount[ici]=0;
		});
		start = correctIntersection.length;
		window.AIUserChoice = correctIntersection;
		console.log('!!!!!Current window.AIUserChoice: ', window.AIUserChoice)
	}
}

function guessWrongReturnTitle( uChoice, ctg ) {
	const rightArr = rightAnswers[ctg];
	const wrongAnswersArr =[];
	uChoice.forEach(uc=>{
		if(rightArr.indexOf(uc) == -1){
			wrongAnswersArr.push(uc);
		}
	});

	if(wrongAnswersArr.length==1){
		return `${capitalizeFirstLetter(wrongAnswersArr[0])} is`;
	} if(wrongAnswersArr.length==2){
		return `${capitalizeFirstLetter(wrongAnswersArr[0]) } and ${ wrongAnswersArr[1] } are`;
	} if(wrongAnswersArr.length==3){
		return `${capitalizeFirstLetter(wrongAnswersArr[0])  } ${  wrongAnswersArr[1] } and ${ wrongAnswersArr[2] } are`;
	}
}

function getNextClue() {
	const currentJourney = window.AIJourney;
	const lastHash = currentJourney[currentJourney.length-2];
	if(lastHash=='visual-100'){
		const nextHash = d3.select(`#${lastHash}`).select('.card--btn').attr('data-next');
		return nextHash;
	}
	const nextHash = d3.select(`#${lastHash}`).select('.card--btn').attr('data-next');
	return nextHash;

}

function chooseCategories() {
	visualCheckBtns.forEach(btn=>{
		d3.select(`#${btn}`).on('click', () => {
			console.log('start!!! ', start);
			if(start<3){
				clickCount[btn] ++;
				if(clickCount[btn]%2){
					// click odd times
					start++;
					d3.select(`#${btn}`).classed('active', true);
					selectedBtn[btn] = 1;
					if(start==3){
						selectedArr = getSelectedArr(selectedBtn);
						d3.select('#guessbtn-visual').classed('active', true);
						updateGuessBtnURL(selectedArr, 'visual');
					}
				} else {
					d3.select(`#${btn}`).classed('active', false);
					selectedBtn[btn] = 0;
					start--;
				}
			} else if(start==3){
				clearTimeout(timeOutTimer);
				if(selectedBtn[btn]){
					selectedBtn[btn] = 0;
					start--;
					d3.select('#guessbtn-visual').classed('active', false);
					d3.select('.visual-info-tip').classed('active', false);
				} else {
					d3.select('#guessbtn-visual').classed('active', true);
					d3.select('#guessbtn-visual').classed('blinking', true);
					timeOutTimer= setTimeout(()=>{d3.select('#guessbtn-visual').classed('blinking', false);}, 1000);
					d3.select('.visual-info-tip').classed('active', true).html('You have selected three objects. Click on a red button to deselect it.');
				}
				clickCount[btn] =0;
				selectedBtn[btn]=0;
				d3.select(`#${btn}`).classed('active', false);
			}
			selectedArr = getSelectedArr(selectedBtn);
			window.AIUserChoice = selectedArr;
		})
	});
	return selectedArr
}

function getSelectedArr(obj) {
	const chosenArr =[];
	for (const attr in obj){
		if(obj[attr]){
			chosenArr.push(attr)
		}
	}
	return chosenArr;
}


function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export default { init, validateBtns, guessBtnsInit }
