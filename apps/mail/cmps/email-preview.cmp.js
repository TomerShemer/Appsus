import emailDetails from "../pages/email-details.cmp.js"

export default {
    props: ['email'],
    emits:['toggle-star'],
    template: `
    <div @click="togglePreview()" :class="{unread : !email.isRead}" class="email-preview" >
        <button @click.stop="toggleStar" v-html="getStarIcon" className="star-btn"></button>
        <h3 class="sender" :class="[{bold : !email.isRead},{draft : email.isDraft}]">{{email.from}}</h3>
        <div className="email-info">
            <h3 :class="[{bold : !email.isRead},{draft : email.isDraft}]">{{email.subject}}</h3>
            <h3>{{getSummaryBody}}</h3>
        </div>
        <h5 class="date" :class="{bold : !email.isRead}">{{getDate}}</h5>
    </div>
    <email-details :id="email.id" v-if="isOpen" />
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
            return this.email.isStar ? `<i class="fa-solid fa-star"></i>` : '<i class="fa-regular fa-star"></i>'
        },
        getDate() {
            let date = new Date(this.email.sentAt)
            let day = 1000 * 60 * 60 * 24
            if (Date.now() - this.email.sentAt < day) return date.toLocaleTimeString()
            return date.toLocaleDateString()
        },
        getSummaryBody() {
            return this.email.body.substring(0, 90).trim() + '...'
        },


    },
    components: {
        emailDetails,
    }


}