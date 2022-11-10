export default {
    props: ['note'],
    template: `
        <section className="note-img-edit">
            <h1>Edit image URL</h1>
            <form @submit.prevent="confirmChanges">
                <input type="text" v-model="newInfo.title" />
                <input type="text" v-model="newInfo.url" />
                <input type="submit" />
            </form>
            <button @click.stop="discardChanges">Cancel</button>
        </section>
`,
    data() {
        return {
            newInfo: {
                url: this.note.info.url,
                title: this.note.info.title
            }
        }
    },
    methods: {
        confirmChanges() {
            this.$emit('changed-img', this.newInfo)
        },
        discardChanges() {
            this.newInfo = this.note.info
            this.$emit('cancel-changes')
        },
    },
    computed: {
    },
    created() {
    }
}