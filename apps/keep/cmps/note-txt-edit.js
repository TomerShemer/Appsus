import noteActionsCmps from "./note-actions.cmps.js"

export default {
    props: ['note'],
    template: `
        <section className="note-edit note-edit-txt">
            <textarea name="" id="" cols="30" rows="10" v-model="newTxt"></textarea>
        </section>
    `,
    data() {
        return {
            newTxt: this.note.info.txt
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
        // console.log(this.note)
    }
}