import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import emailAdd from "../cmps/email-add.cmp.js";

export default{
    props:["id"],
    template:`
    <div :class="{full : isEdit}" v-if="email" class="email-details">
        <div className="details-actions">
            <button v-if="this.isEdit" @click="onClose" className="action-btn"><i class="fa-solid fa-left-long"></i></button>
            <button v-else @click="onOpen" title="Open full screen"  className="action-btn"><i class="fa-solid fa-expand"></i></button>
            <button @click="onRemove" title="Delete"  className="action-btn"><i class="fa-solid fa-trash"></i></button>
            <button @click="onReply" title="Reply"  className="action-btn"><i class="fa-solid fa-reply"></i></button>
            <button @click="toggleStar" v-html="getStarIcon" title="Star" className="action-btn"></button>
            <button @click="toggleRead" v-html="getEmailIcon" title="Read/Unread" className="action-btn"></button>
            <button @click="saveNote" title="Save as note" className="action-btn"> <i class="fa-solid fa-note-sticky"></i></button>
        </div>
        <div className="details-info">
            <h2>{{email.subject}}</h2>
            <div className="details-extra">
                <img src="./assets/img/svg/user.svg" alt="" />
                <small>From: {{email.from}} To: {{email.to}}</small>
                <small>At {{getDate}}</small>

            </div>
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
        },
        getStarIcon() {
            return this.email.isStar ? `<i class="fa-solid fa-star"></i>` : '<i class="fa-regular fa-star"></i>'
        },
        getEmailIcon() {
            return this.email.isRead ? `<i class="fa-solid fa-envelope"></i>` : '<i class="fa-regular fa-envelope"></i>'
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
            if(!this.email.removedAt){
                this.email.removedAt = Date.now()
                emailService.update(this.email).then(email => eventBus.emit('update'))
                .then(res => eventBus.emit('show-msg','Email sent to Trash'))
                .catch(err => eventBus.emit('show-msg','Couldnt remove email'))
                return
            }
            emailService.remove(this.email.id).then(email => eventBus.emit('update'))
            .then(res => eventBus.emit('show-msg','Email removed'))
            .catch(err => eventBus.emit('show-msg','Couldnt remove email'))
        },
        toggleStar(){
            this.email.isStar = !this.email.isStar
            emailService.update(this.email).then(email => eventBus.emit('update'))
            .then(res => eventBus.emit('show-msg','Starred'))
            .catch(err => eventBus.emit('show-msg','Couldnt Star this email'))
        },
        toggleRead(){
            this.email.isRead = !this.email.isRead
            emailService.update(this.email).then(email => eventBus.emit('update'))
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
                this.isReply=false
        },
        saveNote(){
            this.$router.push(`/notes?title=${this.email.subject}&body=${this.email.body}`)
        }
    },
    components:{
        emailAdd
    }
}