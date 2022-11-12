import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['reply', 'note'],
    template: `
    <div className="email-add">
        <h1 class="new-email-headline">New Message</h1>
        <span @click="this.$emit('close-modal')">X</span>
        <div className="new-email-input">
                <input placeholder="to" ref="input" v-model="email.to" type="email">
                <input placeholder="subject" v-model="email.subject" type="text">
        </div>
            <textarea  placeholder="Message" v-model="email.body"></textarea>
        <div className="new-email-btns">
            <button :disabled="!validEmail" @click="sendEmail" class="send-btn">Send <i class="fa-solid fa-paper-plane"></i> </button>
            <div className="div">
                <button :disabled="!email.body"  @click="saveNote" title="Save note" class="draft-btn"><i class="fa-solid fa-note-sticky"></i> </button>
                <button :disabled="!email.body"  @click="saveDraft" title="Save draft" class="draft-btn"><i class="fa-solid fa-trash"></i> </button>
            </div>
        </div>
    </div>`,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: ''
            },
        }
    },
    mounted() {
        this.$refs.input.focus()
        // tinymce.init({
        //     selector: 'textarea',
        //     setup: function(editor) {
        //       editor.on('input', function(e) {
        //         msg = tinyMCE.activeEditor.getContent()
        //       });
        //     }
        //   });

    },
    created() {
        if (this.reply) {
            if (this.reply.isDraft) {
                this.email.body = this.reply.body
            }
            this.email.to = this.reply.from
            this.email.subject = this.reply.isDraft ? this.reply.subject : `Reply: ${this.reply.subject}`
        }
        if (this.note) {
            this.email.subject = this.note.title
            if (this.note.todo) {
                this.note.body = this.note.body.split(',').map(todo => todo.trim() + '<br>').join('')
            }
            this.email.body = this.note.body
        }
    },
    methods: {
        sendEmail() {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!regex.test(this.email.to)) {
                eventBus.emit('show-msg', 'Please enter valid email')
                return false
            }
            this.email.isDraft = false
            console.log(this.email)
            this.$emit('send-email', this.email)
        },
        saveDraft() {
            if (!this.email.body || !this.email.subject) return false
            this.email.isDraft = true
            this.$emit('send-email', this.email)
        },
        saveNote() {
            this.$router.push(`/notes?title=${this.email.subject}&body=${this.email.body}`)
        },
        addListner() {
            tinymce.activeEditor.on('input', function (e) {
                this.email.body = tinyMCE.activeEditor.getContent()
            })
        }
    },
    computed: {
        validEmail() {
            if (!this.email.to || !this.email.subject || !this.email.body) {
                return false
            }
            return true
        }
    },
}