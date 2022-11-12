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
                    <img src="https://pps.whatsapp.net/v/t61.24694-24/57045468_385204402332672_2733956432926867456_n.jpg?ccb=11-4&oh=01_AdRuIb5fafmcjE6MZn6yNBTEXGeJfKiI9RM1JwiG_gxOXg&oe=637D0531" alt="" />
                    <h2>Tomer Shemer</h2>
                    <router-link to="/notes"><h3>Notes App</h3></router-link> 
                </div>
            </div>
        </section>
    `
}
