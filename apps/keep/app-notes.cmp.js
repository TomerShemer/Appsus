import { noteService } from "./services/note.service.js"

import noteFilter from "./cmps/note-filter.cmp.js"
import noteEdit from './cmps/note-edit.cmp.js'
import noteList from "./cmps/note-list.cmp.js"
import noteAdd from "./cmps/note-add.cmp.js"

export default {
    props: [],
    template: `
        <section className="note-app-container flex flex-column align-center">
            <note-filter />
            <note-add />
            <note-list v-if="notes" :notes="notes"/>
        </section>
        `,
    data() {
        return {
            notes: null
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        noteFilter,
        noteEdit,
        noteList,
        noteAdd,
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                // console.log(notes);
            })
    },
}