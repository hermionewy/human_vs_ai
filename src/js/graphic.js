/* global d3 */
import {select, selectAll, addClass, removeClass} from './utils/dom';
import menu from './menu.js'

const $allCards = selectAll('.card-sci');
const journey = [];
const $opening = select('#start-1');
const openPages = [
	'visual-1'
];
let currentPerson;

function resize() {}


function hideAllCards() {
	$allCards.forEach(($el)=>{
		// $el.removeAttribute('hidden')
		$el.setAttribute('hidden', '')
		$el.setAttribute('aria-hidden', 'true')
		removeClass($el, 'slide-in')
	})
}

function showCard(cardID) {
	// All cards start with hidden; this function remove the hidden attribute to show a card
	window.location.hash = cardID
	const $newCard = document.getElementById(cardID)
	$newCard.removeAttribute('hidden')
	$newCard.removeAttribute('aria-hidden')
	if(openPages.indexOf(cardID)<0){
		addClass($newCard, 'slide-in')
	}
}

function init() {
	menu();
	$opening.removeAttribute('hidden');
	window.location.hash = 'start-1';

}
function showCite() {
	// show note to certain key words
	// for mobile
	const current_hash = window.location.hash;

	const current_content = document.getElementById(current_hash.replace('#',''));
	const cite = current_content.getElementsByTagName('cite');
	const showCiteP = current_content.getElementsByClassName('show_cite');

	if(showCiteP.length){ // #start-1 doesn't has .show_cite
		if(cite.length){
			showCiteP[0].innerHTML = cite[0].innerHTML;
			addClass(showCiteP[0], 'active')
		} else{
			removeClass(showCiteP[0], 'active')
		}
	}

	// for large screen
	const currentSlide=d3.select(window.location.hash);
	currentSlide.select('[data-anno-btn]').on('mouseover', (e)=>{
		currentSlide.select('[data-anno-copy]').classed('showNote', true)
	}).on('mouseout', (e)=>{
		currentSlide.select('[data-anno-copy]').classed('showNote', false)
	})

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
	showCite();
	offsetAnchor();
	if(window.location.hash=='#start-1'){
		// console.log(window.location.hash);
		journey.length=0
		hideAllCards();
		showCard('start-1');
		document.title = 'Interactive: Take an immigrant’s journey';
		return
	}
	const hash = window.location.hash.replace('#', '');
	if(!journey.includes(hash)){
		journey.push(hash)
	}
	if(hash && hash!='start-1') {
		// when hash changed, update the currentPerson
		currentPerson = (hash.split('-')[0]).toLowerCase();
		hideAllCards();
		showCard(hash)
		changeTitle(currentPerson)

		// load the photo now so that the photo is not downloaded at the beginning
		const allImgNodes = d3.select(`#${hash}`)
			.selectAll('img').nodes();
		allImgNodes.forEach(node=>{
			const dataSrc = d3.select(node).attr('data-src');
			d3.select(node).attr('src', dataSrc);
		});
		// const img_src = d3.select(`#${hash}`)
		// 	.select('img')
		// 	.attr('data-src');
		// d3.select(`#${hash}`)
		// 	.select('img')
		// 	.attr('src', img_src)
	}

});

function changeTitle(title) {
	document.title = `${capitalizeFirstLetter(title)}'s journey`
}
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
export default { init, resize };
