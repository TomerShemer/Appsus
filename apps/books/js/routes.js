import booksApp from './views/books-app.cmp.js'
import bookDetails from './views/book-details.cmp.js'
import bookAdd from './views/book-add.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/book',
            component: booksApp
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/add-book',
            component: bookAdd
        }
    ]
}

export const router = createRouter(routerOptions)
