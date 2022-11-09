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
                <input v-model="note.info.txt" v-if="note.type === 'note-txt'" placeholder="Make a new note.." class="note-add-txt-input"/>
                <input v-model="note.info.url" v-if="note.type === 'note-img'" placeholder="Enter image URL.." class="note-add-img-input"/>
            </form>
            <form @submit.prevent="addNote" v-if="note.type === 'note-todos'" class="flex flex-column">
                <input v-model="note.info.label" placeholder="List name"  class="note-add-todos-label"/>
                <input v-model="note.info.txt" placeholder="Enter comma seperated list.."  class="note-add-todos-input"/>
            </form>
            <!-- <pre contenteditable="true">Make a new note</pre> -->
            <section className="note-add-actions flex">
                <div @click="switchToTxt" :class="{active: note.type === 'note-txt'}">txt</div>
                <div @click="switchToImg" :class="{active: note.type === 'note-img'}">img</div>
                <div @click="switchToTodos" :class="{active: note.type === 'note-todos'}">todos</div>
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
            console.log('hello');
            this.$emit('add', this.note)
            this.switchToTxt()
        }

    },
    computed: {
        getActiveClass() {
            console.log('helo');
            return true
        }
    },
    created() {
        this.note = noteService.getNewTxtNote()
    }
}