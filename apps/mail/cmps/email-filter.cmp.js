
export default{
    template:`
    <div className="email-filter">
        <input @input="onFilter" className="filter-input" placeholder="Search in mail" type="text" v-model="filter.txt" />
        <div className="filter-btns">
            <button @click="onFilter('all')" :class="{active : filter.mode ==='all'}" class="filter-btn">All</button>
            <button @click="onFilter('read')" :class="{active : filter.mode ==='read'}" class="filter-btn">Read</button>
            <button @click="onFilter('unread')" :class="{active : filter.mode ==='unread'}" class="filter-btn" >Unread</button>
        </div>
    </div>`,
    data(){
        return{
            filter:{txt:'',mode:''}
        }
    },
    methods:{
        onFilter(value){
            if(value) this.filter.mode = value
            this.$emit('filtered',{...this.filter})
        }
    }
}