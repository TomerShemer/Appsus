export default {
    props: ['note'],
    template: `
        <section className="note-txt-edit flex flex-column justify-between">
            <form @submit.prevent="confirmChanges">
                <label>
                    Note title:
                    <input type="text" v-model="newInfo.title" />
                </label>
                <label>
                    Note content:
                    <textarea rows="10" cols="30" @input="updateTxt($event.target.value)" :value="newInfo.txt"></textarea>
                </label>
                <input class="note-btn-submit" type="submit" />
            </form>
            <button @click.stop="discardChanges" class="note-btn-cancel"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
            </button>
        </section>
    `,
    data() {
        return {
            newInfo: {
                txt: this.note.info.txt,
                title: this.note.info.title
            }
        }
    },
    methods: {
        confirmChanges() {
            this.$emit('changed-txt', this.newInfo)
        },
        discardChanges() {
            this.newInfo = this.note.info
            this.$emit('cancel-changes')
        },
        updateTxt(txt) {
            this.newInfo.txt = txt
        }
    },
}