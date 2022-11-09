export default{
    template:`
    <div className="email-controller">
        <button className="compose-btn">Compose</button>
        <button @click="onCategory('inbox')" className="controller-btn">Inbox</button>
        <button @click="onCategory('starred')" className="controller-btn">Starred</button>
        <button @click="onCategory('sent')" className="controller-btn">Sent Mail</button>
        <button @click="onCategory('drafts')" className="controller-btn">Drafts</button>
    </div>`,
    methods:{
        onCategory(category){
            this.$emit('category',category)
        },
    }
    
}