import noteActions from "./note-actions.cmps.js"

export default {
    props: ['info'],
    template: `
        <section className="note note-txt">
            <p>{{info.txt}}</p>
            <note-actions />
        </section>
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
        noteActions
    }
}