import {addClass, removeClass, select, selectAll} from './utils/dom';

const $allCards = selectAll('.card-sci');
const openPages = [
	'start-1'
];

function hideAllCards() {
	$allCards.forEach(($el)=>{
		// $el.removeAttribute('hidden')
		$el.setAttribute('hidden', '');
		$el.setAttribute('aria-hidden', 'true');
		removeClass($el, 'slide-in');
	});
}

function showCard(cardID) {
	// All cards start with hidden; this function remove the hidden attribute to show a card
	window.location.hash = cardID;
	const $newCard = document.getElementById(cardID);
	$newCard.removeAttribute('hidden');
	$newCard.removeAttribute('aria-hidden');
	if(openPages.indexOf(cardID)<0){
        addClass($newCard, 'slide-in')
    }
}

export default { hideAllCards, showCard };
