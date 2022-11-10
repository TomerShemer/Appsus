export default {
    props: ['reply'],
    template: `
    <div className="email-add">
        <h1 class="new-email-headline">New Message</h1>
        <span @click="this.$emit('close-modal',this.email)">X</span>
        <div className="new-email-input">
            <label>
                To
                <input v-model="email.to" type="email">
            </label>
            <label>
                Subject
                <input v-model="email.subject" type="text">
            </label>
        </div>
        <label>
            <textarea v-model="email.body"></textarea>
        </label>
        <div className="new-email-btns">
            <button @click="sendEmail" class="send-btn">Send</button>
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
            this.$emit('send-email', this.email)
        },
    }
}