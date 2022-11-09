import { noteService } from "./services/note.service.js"

import noteNav from "./cmps/note-nav.cmp.js"
import noteFilter from "./cmps/note-filter.cmp.js"
import noteList from "./cmps/note-list.cmp.js"

export default {
    props: [],
    template: `
        <section className="note-app">
            <note-nav />
            <main>
                <note-filter />
                <note-list />
            </main>
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
        noteNav,
        noteFilter,
        noteList
    }
}