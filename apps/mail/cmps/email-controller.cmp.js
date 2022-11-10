export default {
    template: `
    <div :class="{open : isOpen}" class="email-controller">
        <button class="toggle-menu-btn" @click="toggleMenu">☰</button>
        <button @click="this.$emit('new-email')" className="compose-btn">Compose</button>
        <button @click="onCategory('inbox',$event)" :class="{active: active==='inbox'}" class="controller-btn"> Inbox </button>
        <button @click="onCategory('starred')" :class="{active: active==='starred'}" class="controller-btn">Starred</button>
        <button @click="onCategory('sent')" :class="{active: active==='sent'}" class="controller-btn">Sent Mail</button>
        <button @click="onCategory('drafts')" :class="{active: active==='drafts'}" class="controller-btn">Drafts</button>
        <div className="view-mode-btns">
            <button @click="this.$emit('change-mode','dark')" class="dark-mode-btn">Dark</button>
            <button @click="this.$emit('change-mode','light')" class="light-mode-btn">Light</button>
        </div>
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
            this.isOpen = false
        },
        toggleMenu(){
            this.isOpen = !this.isOpen
        }
    }

}