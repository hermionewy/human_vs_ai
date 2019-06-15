import { select, selectAll, addClass, removeClass, hasClass } from './utils/dom'

const showMenu = () =>{
	const menuBtn = select('[data-menu-button]')
	const menuSection = select('[data-menu-section]')
	const menuIcon = select('#icon-menu')
	const closeIcon = select('#icon-close')
	const menuClass = 'is-revealed'
	menuBtn.addEventListener('click', () => {
		console.log('click!')
		const isRevealed = hasClass(menuSection, menuClass)
		console.log(isRevealed)
		if (isRevealed) {
			removeClass(menuSection, menuClass)
			removeClass(menuIcon, 'hideBtn')
			removeClass(closeIcon, 'showBtn')
		}
		else {
			addClass(menuSection, menuClass)
			addClass(menuIcon, 'hideBtn')
			addClass(closeIcon, 'showBtn')

		}
	})
}



const init = () => {
	console.log('menu!')
	showMenu()
}
export default init