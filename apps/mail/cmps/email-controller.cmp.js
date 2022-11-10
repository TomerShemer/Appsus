export default {
    template: `
    <div :class="{open : isOpen}" class="email-controller">
        <button class="toggle-menu-btn" @click="toggleMenu">☰</button>
        <button @click="this.$emit('new-email')" className="compose-btn">Compose</button>
        <button @click="onCategory('inbox',$event)" :class="{active: active==='inbox'}" class="controller-btn"> Inbox </button>
        <button @click="onCategory('starred')" :class="{active: active==='starred'}" class="controller-btn">Starred</button>
        <button @click="onCategory('sent')" :class="{active: active==='sent'}" class="controller-btn">Sent Mail</button>
        <button @click="onCategory('drafts')" :class="{active: active==='drafts'}" class="controller-btn">Drafts</button>
    </div>`,
    data() {
        return {
            active: 'inbox',
            isOpen:false
        }
    },
    methods: {
        onCategory(category) {
            this.active = category
            this.$emit('category', category)
        },
        toggleMenu(){
            this.isOpen = !this.isOpen
        }
    }

}