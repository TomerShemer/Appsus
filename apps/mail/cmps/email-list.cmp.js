import emailPreview from "./email-preview.cmp.js"

export default{
    props:['emails'],
    emits:['clicked'],
    template:`
    <div className="email-list">
        <email-preview v-for="email in emails" :email="email" :key="email.id" />
    </div>`,
    methods:{

    },
    components:{
        emailPreview
    },

}