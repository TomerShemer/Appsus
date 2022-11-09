export default{
    template:`
    <div className="email-filter">
        <input @input="onFilter" className="filter-input" placeholder="Search email" type="text" v-model="filter.txt" />
        <div className="filter-btns">
            <button @click="onFilter('all')" className="filter-btn">All</button>
            <button @click="onFilter('read')"  className="filter-btn">Read</button>
            <button @click="onFilter('unread')"  className="filter-btn" >Unread</button>
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