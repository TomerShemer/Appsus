

import emailList from "./cmps/email-list.cmp.js"
import emailFilter from "./cmps/email-filter.cmp.js"
import emailController from "./cmps/email-controller.cmp.js"

import { emailService } from "./services/email.service.js"
import { eventBus } from "../../services/event-bus.service.js"
import { router } from '../../routes.js'

export default {
    template: `
    <div className="email-main">
        <email-filter @filtered="setFilter" />
        <email-controller @category="setCategory" />
        <div className="img-container"></div>
        <email-list @toggle-star="toggleStar" :emails="emailsToShow" />
    </div>`,
    data() {
        return {
            user:{},
            isEdit: false,
            emails: [],
            filterBy: { txt: '', mode: 'all' ,category:'' },
        }
    },
    methods: {
        getEmails() {
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
            if(this.filterBy.category === "sent" && email.from !== this.user.email) return false
            if(this.filterBy.category === "inbox" && email.from === this.user.email) return false
            if (!email.subject.toLowerCase().includes(this.filterBy.txt.toLowerCase())) return false
            if (this.filterBy.mode === "all") return true
            if (this.filterBy.mode === "read" && !email.isRead) return false
            if (this.filterBy.mode === "unread" && email.isRead) return false
            return true
        },
        toggleStar(email){
            email.isStar = !email.isStar
            emailService.update(email).then(email => eventBus.emit('update') )
        }
    },
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
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
    },
}