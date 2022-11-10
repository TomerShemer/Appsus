export default {
    props: [],
    template: `
        <section className="note-filter">
            <form @submit.prevent="filter">
                <input 
                        v-model="filterBy.txt"
                        type="text"
                        placeholder="Search" />
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy)
        }
    },
    computed: {
    },
}