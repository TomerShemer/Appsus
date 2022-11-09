import emailDetails from "../pages/email-details.cmp.js"

export default {
    props: ['email'],
    template: `
    <div @click="togglePreview()" :class="{unread : !email.isRead}" class="email-preview" >
        <button className="star-btn">{{getStarIcon}}</button>
        <h3>{{email.from}}</h3>
        <div className="email-info">
            <h3>{{email.subject}}</h3>
            <h3>{{email.body}}</h3>
        </div>
        <h5>{{email.sentAt}}</h5>
    </div>
    <email-details :email="email" v-if="isOpen" />
    `,
    data() {
        return {
            isOpen: false,
        }
    },
    methods:{
        togglePreview(){
            this.isOpen = !this.isOpen
        },

    },
    computed:{
        getStarIcon(){
            return this.email.isStar ? '⭐ ' : '&#9734'
        }
    },
    components:{
        emailDetails
    }


}