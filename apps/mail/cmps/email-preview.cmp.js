import emailDetails from "../pages/email-details.cmp.js"

export default {
    props: ['email'],
    template: `
    <div @click="togglePreview()" className="email-preview">
        <button className="star-btn">⭐</button>
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
        }
    },
    components:{
        emailDetails
    }


}