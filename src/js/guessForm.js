import card from './card';

const {hideAllCards} = card;
const {showCard} = card;

const rightAnwers = {'visual': ['Bicycle', 'bicycle', 'bike', 'Bike', 'bikes', 'Stop sign', 'Stop signs', 'stop signs', 'Stopsign', 'stop sign', 'Car', 'Cars', 'car', 'cars']};


function init() {
	const guessBtnVisual = d3.select('#guessbtn-visual');
	// dynamically change guessVisual btn's url
	guessBtnVisual.on('click', ()=>{
		const hashBeforeGuess = window.location.hash;
	    console.log('hey, save the guess hash!', hashBeforeGuess);
		const firstValue = document.getElementById('visual-first-guess').value;
		const secondValue = document.getElementById('visual-second-guess').value;
		const thirdValue = document.getElementById('visual-third-guess').value;
		window.experienceAIUserGuess = [firstValue, secondValue, thirdValue];
		if(!firstValue && !secondValue && !thirdValue){
		    // TODO: show a message "* Fill in three blanks to move on."
		    return false
		}
		const answerChecker = isAnswerCorrect('visual');
		if(answerChecker[0] && answerChecker[1] && answerChecker[2]){
			// success
			console.log('success!!! all are right!');
			hideAllCards();
			showCard('visual-100');
			window.location.hash='#visual-100';
		} else{
			// false & another clue
			const $guessCard = d3.select('#visual-98');
			console.log('fail!!! At least one is wrong!');
			hideAllCards();
			showCard('visual-98');
			const wrongMessage = getWrongMessages(answerChecker);
			$guessCard.select('.wrongmessage').html(wrongMessage);
			const newClueImgSrc = getNewClueImg();
			console.log('the new clue image is: ', newClueImgSrc );
			console.log(document.querySelector('#visual-98 > .lazy'));
			document.querySelector('#visual-98 img').src = newClueImgSrc
		}

	});

}

function getNewClueImg() {
	const journey = window.AIJourney;
	console.log('the journey trying to calc for next clue: ', journey);
	const lastHash = journey[journey.length-2];
	const nextHash = d3.select(`#${lastHash}`).select('.card--btn').attr('data-next');
	const imgSrc = d3.select(`#${nextHash}`).select('img').attr('data-src');
	return imgSrc
}
function getWrongMessages( arr ) {
	let msg = '';
	arr.forEach( (checker, idx) =>{
	    if(!checker){
			msg +=`${window.experienceAIUserGuess[idx]} and `;
		}
	});
	if(msg.slice(-5)==' and '){
	    msg=msg.substring(0, msg.length - 5);
	}
	if(msg.indexOf('and')>-1){
	    msg +=' are wrong.'
	} else {
		msg += ' is wrong. ';
	}
	return capitalizeFirstLetter(msg);
}

function isAnswerCorrect(attr) {
	const answerChecker =[false, false, false];
	window.experienceAIUserGuess.forEach( (guess, idx)=>{
		if ( rightAnwers[attr].indexOf(guess.toLowerCase())>-1 ){
			answerChecker[idx] = true
		}
	});
	return answerChecker
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export default { init }
