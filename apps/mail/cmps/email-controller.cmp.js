export default {
    props:['user','status'],
    template: `
    <div :class="{open : isOpen}" class="email-controller">
        <button class="toggle-menu-btn" @click="toggleMenu">☰</button>
        <div class="logged-user">
            <img class="user-img" src="./assets/img/svg/user.svg" />
            <h4 class="user-name">{{user.fullname}}</h4>
            <h4 class="user-email">{{user.email}}</h4>
            <div class="progress-bar">
                <div class="bar" :style="{width: status.width + '%'}"></div>
            </div>
            <div className="email-stats">
                <small><i class="fa-solid fa-eye-slash"></i> {{status.unread}} Emails unread</small><br>
                <small><i class="fa-solid fa-envelope"></i> {{status.all}} Emails total</small>
            </div>
        </div>
        <div class="controller">  
        <button @click="this.$emit('new-email')" className="compose-btn"><i class="fa-solid fa-pen"></i> <span>Compose</span></button>
        <button @click="onCategory('inbox')" :class="{active: active==='inbox'}" class="controller-btn"> <i class="fa-solid fa-inbox"></i> Inbox </button>
        <button @click="onCategory('starred')" :class="{active: active==='starred'}" class="controller-btn"><i class="fa-regular fa-star"></i> Starred</button>
        <button @click="onCategory('sent')" :class="{active: active==='sent'}" class="controller-btn"> <i class="fa-solid fa-paper-plane"></i> Sent</button>
        <button @click="onCategory('drafts')" :class="{active: active==='drafts'}" class="controller-btn"><i class="fa-regular fa-file"></i> Drafts</button>
        <button @click="onCategory('trash')" :class="{active: active==='trash'}" class="controller-btn"><i class="fa-solid fa-trash"></i> Trash</button>
        <div className="view-mode-btns">
            <button @click="this.$emit('change-mode','dark')" class="dark-mode-btn"><i class="fa-solid fa-moon"></i> Dark</button>
            <button @click="this.$emit('change-mode','light')" class="light-mode-btn"><i class="fa-solid fa-sun"></i> Light</button>
        </div>
        </div>
    </div>`,
    data() {
        return {
            active: 'inbox',
            isOpen: false
        }
    },
    methods: {
        onCategory(category) {
            this.active = category
            this.$emit('on-category', category)
            this.isOpen = false
        },
        toggleMenu() {
            this.isOpen = !this.isOpen
        }
    },
}