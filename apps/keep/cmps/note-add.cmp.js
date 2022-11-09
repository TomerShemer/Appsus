import { noteService } from "../services/note.service.js"

export default {
    props: [],
    template: `
        <!-- <section v-if="!isEditOpen" @click="isEditOpen = true" className="note-add flex">
            Take a note...
        <div>Txt</div>
        <div>Pic</div>
        <div>Todo</div>
        </section> -->
        <section className="note-add flex">
            <form @submit.prevent="addNote">
                <input v-model="note.info.txt" v-if="note.type === 'note-txt'" placeholder="Make a new note.."/>
                <input v-model="note.info.url" v-if="note.type === 'note-img'" placeholder="Enter image URL.."/>
                <input v-model="note.info.label" v-if="note.type === 'note-todos'" placeholder="List name" required/>
                <input v-model="note.info.txt" v-if="note.type === 'note-todos'" placeholder="Enter comma seperated list.." required/>
            </form>
            <!-- <pre contenteditable="true">Make a new note</pre> -->
            <section className="note-add-actions flex">
                <div @click="switchToTxt">txt&nbsp;</div>
                <div @click="switchToImg">img&nbsp;</div>
                <div @click="switchToTodos">todos</div>
            </section>
        </section>
    `,
    data() {
        return {
            note: null,

        }
    },
    methods: {
        switchToTxt() {
            // if (this.note.type === 'note-txt') return
            this.note = noteService.getNewTxtNote()
        },
        switchToImg() {
            // if (this.note.type === 'note-img') return
            this.note = noteService.getNewImgNote()
        },
        switchToTodos() {
            // if (this.note.type === 'note-todos') return
            this.note = noteService.getNewTodosNote()
        },
        addNote() {
            this.$emit('add', this.note)
            this.switchToTxt()
        }

    },
    computed: {
    },
    created() {
        this.note = noteService.getNewTxtNote()
    }
}