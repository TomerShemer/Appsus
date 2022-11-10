import emailPreview from "./email-preview.cmp.js"

export default{
    props:['emails'],
    template:`
    <div className="email-list">
        <email-preview @toggle-star="toggleStar" v-for="email in emails" :email="email" :key="email.id" />
    </div>`,
    methods:{
        toggleStar(email){
            console.log("here");
            this.$emit('toggle-star',email)
        }
    },
    components:{
        emailPreview
    },

}