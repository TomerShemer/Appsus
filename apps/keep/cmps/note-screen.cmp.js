import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section @click="close" className="note-screen"></section>
    `,
    methods: {
        close() {
            eventBus.emit('toggle-screen', false)
            eventBus.emit('close-editor')
        }
    },
}