export default {
    props: [],
    template: `
        <section className="note-filter">
            <h1>Filter</h1>
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