export default{
    template:`
    <div className="email-controller">
        <button className="compose-btn">Compose</button>
        <button @click="onCategory('inbox',$event)" className="controller-btn">Inbox</button>
        <button @click="onCategory('starred')" className="controller-btn">Starred</button>
        <button @click="onCategory('sent')" className="controller-btn">Sent Mail</button>
        <button @click="onCategory('drafts')" className="controller-btn">Drafts</button>
    </div>`,
    data(){
        return{
            active:'inbox',
            buttons:[
                {}
            ]
        }
    },
    methods:{
        onCategory(category,ev){
            console.log(ev);
            this.$emit('category',category)
        },
    }
    
}