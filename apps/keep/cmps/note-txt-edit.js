export default {
    props: ['note'],
    template: `
        <section className="note-txt-edit flex flex-column justify-between">
            <form @submit.prevent="confirmChanges">
                <input type="text" v-model="newTxt" />
                <textarea @input="updateTxt($event.target.value)" :value="this.newTxt"></textarea>
                <input type="submit" />
            </form>
            <button @click.stop="discardChanges">Cancel</button>
        </section>
    `,
    data() {
        return {
            newTxt: this.note.info.txt
        }
    },
    methods: {
        confirmChanges() {
            this.$emit('changed-txt', this.newTxt)
        },
        discardChanges() {
            this.newTxt = this.note.info.txt
            this.$emit('cancel-changes')
        },
        updateTxt(txt) {
            console.log(txt);
        }
    },
    computed: {
    },
    created() {
        // console.log(this.note)
    }
}