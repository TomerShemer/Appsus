import { noteService } from "../services/note.service.js"

export default {
    props: [],
    template: `
        <section className="note-add flex">
            <form @submit.prevent="addNote">
                <input v-model="note.info.txt" v-if="note.type === 'note-txt'" placeholder="Make a new note.." class="note-add-txt-input"/>
            </form>
            <form @submit.prevent="addNote" v-if="note.type === 'note-img'" class="flex flex-column">
                <input v-model="note.info.title" placeholder="Enter title.." class="note-add-img-title"/>
                <input v-model="note.info.url" placeholder="Enter image URL.." required class="note-add-img-input"/>
                <input type="submit" hidden/>
            </form>
            <form @submit.prevent="addNote" class="flex flex-column" v-if="note.type === 'note-todos'">
                <input v-model="note.info.label" placeholder="Enter list name.." required  class="note-add-todos-label"/>
                <input v-model="note.info.txt" required placeholder="Enter comma seperated list.." class="note-add-todos-input"/>
                <input type="submit" hidden/>
            </form>
            <section className="note-add-actions flex">
                <div @click="switchToTxt" class="note-add-actions-txt .fa ." :class="{active: note.type === 'note-txt'}"><img src="../../../assets/img/svg/text-solid.svg" alt="" /></div>
                <div @click="switchToImg" class="note-add-actions-img" :class="{active: note.type === 'note-img'}"><img src="../../../assets/img/svg/image-solid.svg" alt="" /></div>
                <div @click="switchToTodos" class="note-add-actions-todos" :class="{active: note.type === 'note-todos'}"><img src="../../../assets/img/svg/list-solid.svg" alt="" /></div>
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
        getActiveClass() {
            console.log('helo');
            return true
        }
    },
    created() {
        this.note = noteService.getNewTxtNote()
    }
}