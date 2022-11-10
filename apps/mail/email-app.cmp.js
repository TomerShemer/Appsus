

import emailList from "./cmps/email-list.cmp.js"
import emailFilter from "./cmps/email-filter.cmp.js"
import emailController from "./cmps/email-controller.cmp.js"
import emailAdd from "./cmps/email-add.cmp.js"

import { emailService } from "./services/email.service.js"
import { eventBus } from "../../services/event-bus.service.js"
import { router } from '../../routes.js'

export default {
    template: `
    <div :class="{dark : isDarkMode}" class="email-main">
        <email-filter @filtered="setFilter" />
        <email-controller @change-mode="changeMode" @new-email="newEmail" @category="setCategory" />
        <div className="img-container"></div>
        <router-view @toggle-star="toggleStar" :emails="emailsToShow" />
        <!-- <email-list @toggle-star="toggleStar" :emails="emailsToShow" /> -->
        <email-add @close-modal="closeModal" @send-email="sendEmail" v-if="isNewEmail"/>
    </div>`,
    data() {
        return {
            user:{},
            isNewEmail: false,
            emails: [],
            filterBy: { txt: '', mode: 'all' ,category:'' },
            isDarkMode:false
        }
    },
    methods: {
        getEmails() {
            this.isNewEmail = false
            emailService.query().then(emails => this.emails = emails)
        },
        setFilter(filter) {
            this.filterBy = filter
        },
        setCategory(category){
            this.filterBy.category = category
        },
        isEmailValid(email) {
            if(this.filterBy.category === "starred" && !email.isStar) return false
            if (!email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase())) return false
            if(this.filterBy.category === "sent" && email.from !== this.user.email) return false
            if(this.filterBy.category === "inbox" && email.from === this.user.email) return false
            if (this.filterBy.mode === "read" && !email.isRead) return false
            if (this.filterBy.mode === "unread" && email.isRead) return false
            if (this.filterBy.mode === "all" && this.filterBy.category !=='drafts' && !email.isDraft ) return true
            if(this.filterBy.category === "drafts" && email.isDraft) return true
        },
        toggleStar(email){
            email.isStar = !email.isStar
            emailService.update(email).then(email => eventBus.emit('update') )
        },
        newEmail(){
            this.isNewEmail = true
        },
        sendEmail(email){
            let newEmail = emailService.getTemplateEmail()
                newEmail.isDraft = email.isDraft
                newEmail.from = this.user.email
                newEmail.to = email.to
                newEmail.subject = email.subject
                newEmail.body = email.body
                newEmail.sentAt = Date.now()
                emailService.addEmail(newEmail).then(this.getEmails)
        },
        closeModal(email){
            if(!email.id){
                email.isDraft = true
                this.sendEmail(email).then(this.getEmails)
            }
            this.isNewEmail=false
        },
        changeMode(mode){
            mode === 'dark' ? this.isDarkMode = true : this.isDarkMode = false
        }
    },
    computed: {
        emailsToShow() {
            return this.emails.filter(this.isEmailValid)
        },

    },
    created() {
        emailService.query().then(emails => this.emails = emails)
        this.user = emailService.getUser()
        eventBus.on('update', this.getEmails)
    },
    components: {
        emailFilter,
        emailController,
        emailList,
        emailAdd,
    },
}