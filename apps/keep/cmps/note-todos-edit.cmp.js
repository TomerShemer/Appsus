export default {
    props: ['note'],
    template: `
        <section className="note-todos-edit">
            <h1>Edit Todos</h1>
            <form @submit.prevent="confirmChanges">
                <input v-model="info.label" type="text" />
                <input v-model="info.txt" type="text" />
                <input type="submit" />
            </form>
            <button @click.stop="discardChanges">Cancel</button>
        </section>
    `,
    data() {
        return {
            info: {
                label: this.note.info.label,
                txt: this.note.info.txt
            }
        }
    },
    methods: {
        confirmChanges() {
            this.$emit('changed-todos', this.info)
        },
        discardChanges() {
            this.newInfo = this.note.info
            this.$emit('cancel-changes')
        },
    },
    computed: {
    },
}