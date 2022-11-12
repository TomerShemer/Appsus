export default {
    template: `
        <header :class="{'menu-open': isMenuOpen}" class="app-header">
            <router-link class="logo" to="/">Appsus</router-link>
            <nav>
                <button class="app-header-menu-btn" @click.stop="toggleMenu"><i class="fa-solid fa-x"></i></button>
                <router-link @click.stop="toggleMenu" to="/">Home</router-link>
                <router-link @click.stop="toggleMenu" to="/about">About</router-link>
                <router-link @click.stop="toggleMenu" to="/notes">Notes</router-link>
                <router-link @click.stop="toggleMenu" to="/mail">Mail</router-link>
                <router-link @click.stop="toggleMenu" to="/book">Books</router-link>  
            </nav>
            <button class="app-header-close-btn" @click.stop="toggleMenu">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div @click.stop="toggleMenu" className="app-header-screen"></div>
        </header>
    `,
    data() {
        return {
            isMenuOpen: false,
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    }
}
