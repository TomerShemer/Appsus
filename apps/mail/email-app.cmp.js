

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
        <email-controller  @category="setCategory" />
        <div className="img-container"></div>
        <email-list :emails="emailsToShow" />
    </div>`,

    data() {
        return {
            isEdit:false,
            emails: [],
            filterBy: {txt:'',category:''},
        }
    },
    methods: {
        getEmails(){
            emailService.query().then(emails => this.emails = emails)
        },
        setFilter(filter){
            this.filterBy.txt = filter.txt
        },
        setCategory(category){
            this.filterBy.category = category
        },
    },
    computed:{
        emailsToShow(){
            const regex = new RegExp(this.filterBy.txt,'i')
            return this.emails.filter(email => regex.test(email.subject))
        },

    },
    created() {
        emailService.query().then(emails => this.emails = emails)
        eventBus.on('update',this.getEmails)
    },
    components: {
        emailFilter,
        emailController,
        emailList,
    },
}