const { createApp } = Vue

import { router } from './routes.js'

import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `
            <user-msg />
            <book-app />
        `,
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        userMsg
    }
}


const app = createApp(options)

app.use(router)
app.mount('#app')

