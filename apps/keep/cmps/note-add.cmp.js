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
            <section className="note-add-actions flex align-center">
                <div @click="switchToTxt" class="note-add-actions-txt .fa ." :class="{active: note.type === 'note-txt'}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"/></svg></div>
                <div @click="switchToImg" class="note-add-actions-img" :class="{active: note.type === 'note-img'}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48z"/></svg></div>
                <div @click="switchToTodos" class="note-add-actions-todos" :class="{active: note.type === 'note-todos'}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg></div>
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