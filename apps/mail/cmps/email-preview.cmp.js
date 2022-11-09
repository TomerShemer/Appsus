import emailDetails from "../pages/email-details.cmp.js"

export default {
    props: ['email'],
    template: `
    <div @click="togglePreview()" :class="{unread : !email.isRead}" class="email-preview" >
        <button className="star-btn">{{getStarIcon}}</button>
        <h3>{{email.from}}</h3>
        <div className="email-info">
            <h3 class="bold">{{email.subject}}</h3>
            <h3>{{getSummaryBody}}</h3>
        </div>
        <h5>{{getDate}}</h5>

    </div>
    <email-details :email="email" v-if="isOpen" />
    `,
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        togglePreview() {
            this.isOpen = !this.isOpen
        },

    },
    computed: {
        getStarIcon() {
            return this.email.isStar ? '⭐ ' : '☆'
        },
        getDate() {
            let date = new Date(this.email.sentAt)
            let day = 1000 * 60 * 60 * 24
            if (Date.now() - this.email.sentAt < day) return date.toLocaleTimeString()
            return date.toLocaleDateString()
        },
        getSummaryBody() {
            if (this.email.body.length > 30) return this.email.body
            return this.email.body.substring(0, 50).trim() + '...'
        },

    },
    components: {
        emailDetails,
    }


}