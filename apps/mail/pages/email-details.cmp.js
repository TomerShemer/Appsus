import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import emailAdd from "../cmps/email-add.cmp.js";

export default{
    props:["id"],
    template:`
    <div v-if="email" className="email-details">
        <div className="details-actions">
            <button @click="onOpen" className="action-btn open-btn">Open </button>
            <button @click="onRemove" className="action-btn">🗑️</button>
            <button @click="onReply" className="action-btn">📩</button>
            <button @click="onStar" className="action-btn">⭐</button>
        </div>
        <div className="details-info">
            <h3>subject: {{email.subject}}</h3>
            <h3>from: {{email.from}}</h3>
            <h3>date: {{getDate}}</h3>
        </div>
        <div className="details-body">
            <p>{{email.body}}</p>
        </div>
    </div>
    <email-add @close-modal="closeModal" @send-email="sendEmail" :reply="email" v-if="isReply"/>`,
    data(){
        return{
            isReply:false,
            email:{},
            currUser:{},
            isEdit:false
        }
    },
    computed:{
        getDate(){
            let date = new Date(this.email.sentAt)
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }
    },
    created(){
        const {id} = this.$route.params
        if(id) this.isEdit = true
        console.log(this.isEdit);
        emailService.getById(this.id).then(email => this.email = email)

    },
    methods:{
        onOpen(){
            this.$router.push(`/${this.email.id}`)
        },
        onRemove(){
            emailService.remove(this.email.id).then(email => eventBus.emit('update'))
        },
        onStar(){
            this.email.isStar = !this.email.isStar
            emailService.update(this.email).then(email => eventBus.emit('update') )
        },
        onReply(){
            this.isReply = !this.isReply
        },
        sendEmail(email){
            let newEmail = emailService.getTemplateEmail()
                newEmail.from = this.currUser.email
                newEmail.isDraft = email.isDraft
                newEmail.to = email.to
                newEmail.subject = email.subject
                newEmail.body = email.body
                newEmail.sentAt = Date.now()
                emailService.addEmail(newEmail).then(email => eventBus.emit('update'))
                this.isReply = false
        },
        closeModal(email){
                if(!email.id){
                    email.isDraft = true
                    this.sendEmail(email).then(email => eventBus.emit('update'))
                }
                this.isReply=false
        }
    },
    components:{
        emailAdd
    }
}