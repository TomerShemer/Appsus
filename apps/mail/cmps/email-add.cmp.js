import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['reply'],
    template: `
    <div className="email-add">
        <h1 class="new-email-headline">New Message</h1>
        <span @click="this.$emit('close-modal')">X</span>
        <div className="new-email-input">
                <input placeholder="to" ref="input"  v-model="email.to" type="email">
                <input placeholder="subject" v-model="email.subject" type="text">
        </div>
            <textarea placeholder="Message" v-model="email.body"></textarea>
        <div className="new-email-btns">
            <button :disabled="!validEmail" @click="sendEmail" class="send-btn">Send <i class="fa-solid fa-paper-plane"></i></button>
            <button :disabled="!email.body"  @click="saveDraft" title="drafts"class="draft-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>`,
    data() {
        return {
            email: {
                to: '',
                subject:  '',
                body:''
            }
        }
    },
    mounted() {
        this.$refs.input.focus()
      },
    created(){
        if(this.reply ){
            if(this.reply.isDraft){
                this.email.body = this.reply.body
            }
            this.email.to = this.reply.from
            this.email.subject = this.reply.isDraft ? this.reply.subject : `Reply: ${this.reply.subject}`
        }
    },
    methods: {
        sendEmail() {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(!regex.test(this.email.to)){
                    eventBus.emit('show-msg','Please enter valid email')
                    return false
            } 
            this.email.isDraft = false
            // this.email.from = 'me'
            console.log(this.email)
            this.$emit('send-email', this.email)
        },
        saveDraft(){
            if(!this.email.body || !this.email.subject) return false
            this.email.isDraft = true
            this.$emit('send-email', this.email)
        }
    },
    computed:{
        validEmail(){
            if(!this.email.to || !this.email.subject || !this.email.body){
                return false
            }
            return true
        }
    }
}