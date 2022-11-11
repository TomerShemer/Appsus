import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import emailAdd from "../cmps/email-add.cmp.js";

export default{
    props:["id"],
    template:`
    <div :class="{full : isEdit}" v-if="email" class="email-details">
        <div className="details-actions">
            <button v-if="this.isEdit" @click="onClose" className="action-btn close-btn">Close </button>
            <button v-else @click="onOpen" title="Open full screen"  className="action-btn open-btn">Open </button>
            <button @click="onRemove" title="Delete"  className="action-btn">🗑️</button>
            <button @click="onReply" title="Reply"  className="action-btn">📩</button>
            <button @click="onStar" title="Star" className="action-btn">⭐</button>
        </div>
        <div className="details-info">
            <h5>from: {{email.from}} to: me</h5>
            <h3>subject: {{email.subject}}</h3>
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
        emailService.getById(this.id).then(email => this.email = email).then(this.markAsRead)

    },
    methods:{
        onOpen(){
            this.$router.push(`/${this.email.id}`)
        },
        onClose(){
            this.$router.back()
        },
        onRemove(){
            emailService.remove(this.email.id).then(email => eventBus.emit('update'))
            .then(res => eventBus.emit('show-msg','Email removed'))
            .catch(err => eventBus.emit('show-msg','Couldnt remove email'))
        },
        onStar(){
            this.email.isStar = !this.email.isStar
            emailService.update(this.email).then(email => eventBus.emit('update'))
            .then(res => eventBus.emit('show-msg','Starred'))
            .catch(err => eventBus.emit('show-msg','Couldnt Star this email'))
        },
        onReply(){
            this.isReply = !this.isReply
        },
        markAsRead(){
            this.email.isRead = true
            emailService.update(this.email).then(email => eventBus.emit('update') )
        
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
                .then(res => eventBus.emit('show-msg','Email sent'))
                .catch(err => eventBus.emit('show-msg','Couldnt send email'))
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