/* global d3 */
import { select, selectAll, addClass, removeClass } from './utils/dom';
import menu from './menu.js';
import guessForm from './guessForm';
import card from './card';

const journey = [];
const $opening = select('#start-1');

// let currentPerson;
const hideAllCards = card.hideAllCards;
const showCard = card.showCard;

function resize() {}

function init() {
	menu();
	$opening.removeAttribute('hidden');
	window.location.hash = 'start-1';
	guessForm.init();
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
	if(window.location.hash=='#start-1'){
		// console.log(window.location.hash);
		journey.length=0;
		hideAllCards();
		showCard('start-1');
		document.title = 'Interactive: How we know what we know';
		return
	}
	const hash = window.location.hash.replace('#', '');
	journey.push(hash);

	if(hash && hash.indexOf('99')!=-1){
		// guess card
        const preHash=journey[journey.length-2];
        const preImgSrc = getPreImgSrc(preHash);
		console.log('Hey, here is preImgSRC: ', preHash, preImgSrc);
		const allImgNodes = d3.select(`#${hash}`)
			.select('img')
			.attr('src', preImgSrc);
		console.log('HEY, i am the journey: ', journey);
		hideAllCards();
		showCard(hash);
	} else if(hash && hash!='start-1') {
	    // switch clue card; guess wrong card was handled by guessForm.js
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
	window.AIJourney = journey;
});

function getPreImgSrc(preHash) {
	return d3.select(`#${preHash}`)
		.select('img')
		.attr('data-src');
}

export default { init, resize };
