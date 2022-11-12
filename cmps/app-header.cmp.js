export default {
    template: `
        <header class="app-header">
        <router-link class="logo" to="/">Appsus</router-link>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/notes">Notes</router-link> | 
                <router-link to="/mail">Mail</router-link>  
            </nav>
        </header>
    `,
}
