
export default {
    template: `
        <section class="home-page">
            <div class="hero-image">
                <div class="hero-text">
                    <h1>Appsus</h1>
                    <p>Made By</p>
                    <div className="links">
                        <router-link to="/notes"><button>Notes</button></router-link> |
                        <router-link to="/mail"><button>Mail</button></router-link>
                    </div>
                </div>
            </div>
        </section>
    `,
}
