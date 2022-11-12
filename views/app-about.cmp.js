export default {
    template: `
        <section class="about-page">
           <div className="project-info">
               <h1>On this porject</h1>
               <h2>This project was made for sprint3 on Coding Academy Fullstack Bootcamp!</h2>
               <h2>Cloning Google Gmail and Keep Apps</h2>
           </div>
            <div className="profile-container">
                <div className="profile1">
                    <img src="https://img.a.transfermarkt.technology/portrait/big/3139-1459504284.jpg?lm=1" alt="" />
                    <h2>Bar Zaken</h2>
                    <router-link to="/mail"><h3>Gmail App</h3></router-link> 
                </div>
                <div className="profile2">
                    <img src="/assets/img/Tomer.jpg" alt="" />
                    <h2>Tomer Shemer</h2>
                    <router-link to="/notes"><h3>Notes App</h3></router-link> 
                </div>
            </div>
        </section>
    `
}
