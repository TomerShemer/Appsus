import emailList from "./cmps/email-list.cmp.js"
import emailFilter from "./cmps/email-filter.cmp.js"
import emailController from "./cmps/email-controller.cmp.js"
import emailAdd from "./cmps/email-add.cmp.js"
import userMsg from "../../cmps/user-msg.cmp.js"

import { emailService } from "./services/email.service.js"
import { eventBus } from "../../services/event-bus.service.js"
import { router } from '../../routes.js'

export default {
    template: `
    <div :class="{dark : isDarkMode}" class="email-main">
        <email-filter @filtered="setFilter" />
        <email-controller :status="getEmailCount" :user="user" @change-mode="changeMode" @new-email="newEmail" @on-category="setCategory" />
        <div className="img-container"></div>
        <router-view @toggle-star="toggleStar" :emails="emailsToShow" />
        <email-add :note="note" @close-modal="closeModal" @send-email="sendEmail" v-if="isNewEmail"/>
        <user-msg />
    </div>`,
    mounted() {
        let { title, body, todo } = this.$route.query
        if (!title && !body) return
        this.note = { title, body, todo }
        this.isNewEmail = true
    },
    data() {
        return {
            user: {},
            isNewEmail: false,
            emails: [],
            filterBy: { txt: '', mode: 'all' },
            isDarkMode: false,
            note: null
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
        setCategory(category) {
            this.filterBy = { ...this.filterBy }
            this.filterBy.category = category
        },
        isEmailValid(email) {
            if (this.filterBy.category === "drafts" && email.isDraft) return true
            if (this.filterBy.category === "starred" && !email.isStar) return false
            if (this.filterBy.category === "sent" && email.isDraft) return false
            if (this.filterBy.category !== "trash" && email.removedAt) return false
            if (this.filterBy.category === "trash" && !email.removedAt) return false
            if (this.filterBy.mode === "all" && this.filterBy.category !== "sent" && email.from === this.user.email) return false
            if (!email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase())) return false
            if (this.filterBy.category === "sent" && email.from !== this.user.email) return false
            if (this.filterBy.category === "inbox" && email.from === this.user.email) return false
            if (this.filterBy.mode === "read" && !email.isRead) return false
            if (this.filterBy.mode === "unread" && email.isRead) return false
            if (this.filterBy.mode === "all" && this.filterBy.category !== 'drafts' && !email.isDraft && !email.removedAt) return true
            if (this.filterBy.category === "drafts" && !email.isDraft) return false
            return true
        },
        toggleStar(email) {
            email.isStar = !email.isStar
            emailService.update(email).then(email => eventBus.emit('update'))
                .then(res => eventBus.emit('show-msg', 'Starred'))
                .catch(err => eventBus.emit('show-msg', 'Couldnt Star this email'))
        },
        newEmail() {
            this.isNewEmail = true
        },
        sendEmail(email) {
            let msg = email.isDraft ? 'Draft saved' : 'Email sent'
            let newEmail = emailService.getTemplateEmail()
            newEmail.isDraft = email.isDraft
            newEmail.from = this.user.email
            newEmail.to = email.to
            newEmail.subject = email.subject
            newEmail.body = email.body
            newEmail.sentAt = Date.now()
            emailService.addEmail(newEmail).then(this.getEmails)
                .then(res => eventBus.emit('show-msg', `${msg}`))
                .catch(err => eventBus.emit('show-msg', 'Couldnt send email'))
        },
        closeModal(email) {
            this.isNewEmail = false
        },
        changeMode(mode) {
            mode === 'dark' ? this.isDarkMode = true : this.isDarkMode = false
        }
    },
    computed: {
        emailsToShow() {
            return this.emails.filter(this.isEmailValid)
        },
        getEmailCount() {
            let unread = this.emails.filter((email) => !email.isRead && !email.isDraft)
            let all = this.emails.filter((email) => !email.isDraft && email.from !== this.user.email)
            let width = 100 - (100 * unread.length) / all.length
            return { all: all.length, unread: unread.length, width }
        }

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
        userMsg
    },
}