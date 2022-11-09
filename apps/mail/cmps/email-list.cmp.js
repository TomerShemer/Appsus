import emailPreview from "./email-preview.cmp.js"

export default{
    props:['emails'],
    template:`
    <div className="email-list">
        <email-preview v-for="email in emails" :email="email" :key="email.id" @click="clicked(email.id)"/>
    </div>`,
    created(){
        console.log(this.emails);
    },
    methods:{
        clicked(id){
            this.$emit('clicked',id)
        }
    },
    components:{
        emailPreview
    },

}