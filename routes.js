import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import notesPage from './views/app-notes.cmp.js'

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

	],
}

export const router = createRouter(routerOptions)
