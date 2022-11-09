import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import notesPage from './apps/keep/app-notes.cmp.js'
import mailPage from './apps/mail/app-mail.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/notes',
			component: notesPage,
		},
		{
			path: '/mail',
			component: mailPage,
		},
		

	],
}

export const router = createRouter(routerOptions)
