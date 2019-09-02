/* global d3 */
import { select } from './utils/dom';
import menu from './menu.js';
import guessForm from './guessForm';
import card from './card';
import speech from './speech';
import rightAnswers from './rightAnswers';
import startScroll from './startScroll';
import music from './music';
import visual from './visual';

const journey = [];
const $opening = select('#start-1');
const finalChapter = ['visual-7'];
const allRightAnswers = rightAnswers();
const speechVid = document.getElementById('speech-7-video');
// let currentPerson;
let speechOutTimer;
const {hideAllCards} = card;
const {showCard} = card;
const cowbellVid = document.getElementById('speech-5-video');
function resize() {}

function init() {
	menu();
	$opening.removeAttribute('hidden');
	window.location.hash = 'start-1';
	guessForm.init();
	startScroll.init();
	music.init();
}

function offsetAnchor() {
	// https://stackoverflow.com/questions/17534661/make-anchor-link-go-some-pixels-above-where-its-linked-to
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if(window.location.hash=='#start-1' || window.location.hash=='#methodology'){
		window.scrollTo(window.scrollX, window.scrollY - 1500);
		return 0
	}

	if(window.location.hash.length !== 0 && w<=880) {
		window.scrollTo(window.scrollX, window.scrollY - 700);
		return 0
	}
}

window.addEventListener('hashchange', () => {
	offsetAnchor();
	const hash = window.location.hash.replace('#', '');
	if(hash){
		loadCurrentSlide(hash);
		journey.push(hash);
	}
	const cowbell = document.getElementById('speech-6-video');
	switch (hash) {
	case 'start-1':
		journey.length=0;
		document.title = 'Interactive: How we know what we know';
		const cardImgs = d3.select('#start-1').selectAll('.card-sci-img');
		cardImgs.classed('active', false);
		d3.select('#step-1-img').classed('active', true);
		startScroll.switchIndex(0);
		darkModeOn();
		break;
	case 'start-2':
		darkModeOff();
		break;
	case 'speech-4':
		cowbellVid.pause();
		cowbellVid.currentTime = 0;
		break;
	case 'speech-5':
		d3.select('#speech-5__btn-1').classed('active', false);
		d3.select('#speech-5').select('.hero__img').classed('hide', false);
		d3.select('#speech-5').select('.videoElem').classed('show', false);
		break;
	case 'speech-7':
		videoPlay(speechVid);
		break;
	case 'music-10':
		const  musicVid = document.getElementById('music-10__video');
		visualVid(musicVid);
		break;
	case 'visual-10': // guess card
		const visualVid = document.getElementById('visual-10__video');
		videoPlay(visualVid);
		break;
		// const preHash=journey[journey.length-2];
		// d3.select(`#${hash}`).select('#return-visual').attr('href', `#${preHash}`);
		// const preImgSrc = getPreImgSrc(preHash);
		// console.log('Hey, here is preImgSRC: ', preHash, preImgSrc);
		// const allImgNodes = d3.select(`#${hash}`)
		// 	.select('img')
		// 	.attr('src', preImgSrc);
		// if(window.AIUserChoice.length>0){
		// 	const guessTipOne = d3.select(`#${hash}`).select('.card__content__p').select('span');
		// 	if (window.AIUserChoice.length==1) {
		// 		guessTipOne.text('Please select another two objects.')
		// 	} else {
		// 		guessTipOne.text('Please select another one object.')
		// 	}
		// }
		// break;

	}
	visual.init('visual-2');
	visual.init('visual-3');
	visual.init('visual-4');
	visual.init('visual-5');

	speech.init('#speech-2');
	speech.init('#speech-4');
	speech.init('#speech-5');


	finalChapter.forEach(fc=>{
	    d3.select(`#${fc}`).select('.card--btn').on('click', ()=>{
			guessForm.guessBtnsInit();
		})
	});
	window.AIJourney = journey;

});

function videoPlay(vid) {
	vid.currentTime = 0;
	vid.play();
}

function videoPause(vid) {
	vid.pause();
	vid.currentTime = 0;
}

function loadCurrentSlide(hash) {
	hideAllCards();
	showCard(hash);
	// load the photo now so that the photo is not downloaded at the beginning
	const allImgNodes = d3.select(`#${hash}`)
		.selectAll('img').nodes();
	allImgNodes.forEach(node=>{
		const dataSrc = d3.select(node).attr('data-src');
		d3.select(node).attr('src', dataSrc);
	});
}

function getPreImgSrc(preHash) {
	return d3.select(`#${preHash}`)
		.select('img')
		.attr('data-src');
}
function darkModeOn() {
	d3.select('.article').classed('darkMode', true);
	d3.select('header').classed('darkMode', true);
}
function darkModeOff() {
	d3.select('.article').classed('darkMode', false);
	d3.select('header').classed('darkMode', false);
}
export default { init, resize, darkModeOn, darkModeOff };
