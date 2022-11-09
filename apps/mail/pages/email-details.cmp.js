export default{
    props:["email"],
    template:`
    <div className="email-details">
        <div className="details-actions">
            <button className="action-btn" v-on:click="onDelete">🗑️</button>
            <button className="action-btn" v-on:click="onReply">📩</button>
            <button className="action-btn" v-on:click="onStar">⭐</button>
        </div>
        <div className="details-info">
            <h2>{{email.subject}}</h2>
            <h2>{{email.from}}</h2>
            <h2>{{email.sentAt}}</h2>
        </div>
        <div className="details-body">
            <p>{{email.body}}</p>
        </div>
    </div>`,
}