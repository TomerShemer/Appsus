import emailDetails from "../pages/email-details.cmp.js"

export default {
    props: ['email'],
    emits:['toggle-star'],
    template: `
    <div @click="togglePreview()" :class="{unread : !email.isRead}" class="email-preview" >
        <button @click.stop="toggleStar" className="star-btn">{{getStarIcon}}</button>
        <h3 :class="[{bold : !email.isRead},{draft : email.isDraft}]">{{getSenderName}}</h3>
        <div className="email-info">
            <h3 :class="{bold : !email.isRead}">{{email.subject}}</h3>
            <h3>{{getSummaryBody}}</h3>
        </div>
        <h5 :class="{bold : !email.isRead}">{{getDate}}</h5>

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
        toggleStar(){
            this.$emit('toggle-star',this.email)
        }

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
        getSenderName(){
            return this.email.from.split('@')[0]
        }

    },
    components: {
        emailDetails,
    }


}