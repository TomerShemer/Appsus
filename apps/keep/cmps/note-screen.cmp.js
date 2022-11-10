import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: [],
    template: `
        <section @click="close" className="note-screen"></section>
    `,
    data() {
        return {
        }
    },
    methods: {
        close() {
            eventBus.emit('toggle-screen', false)
            eventBus.emit('close-editor')
        }
    },
    computed: {
    },
}