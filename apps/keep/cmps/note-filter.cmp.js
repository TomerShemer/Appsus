export default {
    props: [],
    template: `
        <section className="note-filter">
            <input type="text" placeholder="Search"/>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                type: 'txt'
            }
        }
    },
    methods: {
    },
    computed: {
    },
}