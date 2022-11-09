export default {
    props: [],
    template: `
        <section className="note-add flex">
            <input contenteditable="true" placeholder="Make a new note"/>
            <!-- <pre contenteditable="true">Make a new note</pre> -->
            <section className="actions">
                <input type="checkbox" value="hello"/>
                <button>img</button>
                <button>todos</button>
            </section>
        </section>
    `,
    data() {
        return {
            note: {
                type: 'note-txt',
                info: { txt: '' },
                isPinned: false,
            }
        }
    },
    methods: {
    },
    computed: {

    },
}