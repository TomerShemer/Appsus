import { emailService } from "../services/email.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default{
    props:["email"],
    template:`
    <div className="email-details">
        <div className="details-actions">
            <button className="action-btn" v-on:click="onRemove">🗑️</button>
            <button className="action-btn">📩</button>
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
    created(){
        if(!this.email.isRead){
            console.log('update');
            this.email.isRead = true
            emailService.update(this.email).then(email => eventBus.emit('update') )
        }
    },
    methods:{
        onRemove(){
            emailService.remove(this.email.id).then(email => eventBus.emit('update'))
        },
        onStar(){
            this.email.isStar = !this.email.isStar
            emailService.update(this.email).then(email => eventBus.emit('update') )
        },
    }
}