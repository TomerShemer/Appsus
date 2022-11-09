

import emailList from "./cmps/email-list.cmp.js"
import emailFilter from "./cmps/email-filter.cmp.js"
import emailController from "./cmps/email-controller.cmp.js"

import { emailService } from "./services/email.service.js"



export default {
    template: `
    <div className="email-main">
        <email-filter @filtered="setFilter" />
        <email-controller @category="setCategory" />
        <div className="img-container"></div>
        <email-list v-if="emails" :emails="emailsToShow" />
    </div>`,

    data() {
        return {
            emails: [],
            filterBy: {txt:''},
        }
    },
    methods: {
        setFilter(filter){
            this.filterBy = filter
        },
        setCategory(category){
            
        }
    },
    computed:{
        emailsToShow(){
            const regex = new RegExp(this.filterBy.txt,'i')
            return this.emails.filter(email => regex.test(email.subject))
        },
    },
    created() {
        emailService.query().then(emails => this.emails = emails)
    },
    components: {
        emailFilter,
        emailController,
        emailList
    }
}