import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import notesPage from './apps/keep/app-notes.cmp.js'
import mailPage from './apps/mail/email-app.cmp.js'
import emailList from './apps/mail/cmps/email-list.cmp.js'
import emailDetails from './apps/mail/pages/email-details.cmp.js'
import bookApp from './apps/books/js/views/books-app.cmp.js'
import bookAdd from './apps/books/js/views/book-add.cmp.js'
import bookDetails from './apps/books/js/views/book-details.cmp.js'

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
			children: [
				{
					path: '',
					component: emailList,

				},
				{
					path: '/:id',
					component: emailDetails,
					props: true,
				},
			]
		},
		{
			path: '/book',
			component: bookApp,
		},
		{
			path: '/add-book',
			component: bookAdd,
			props: true,

		},
		{
			path: '/book/:id',
			component: bookDetails,
			props: true,
		},


	],
}

export const router = createRouter(routerOptions)
