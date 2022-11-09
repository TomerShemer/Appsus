export default{
    template:`
    <div className="email-filter">
        <input @input="onFilter" className="filter-input" placeholder="Search email" type="text" v-model="filter.txt" />
    </div>`,
    data(){
        return{
            filter:{txt:null}
        }
    },
    methods:{
        onFilter(){
            this.$emit('filtered',{...this.filter})
        }
    }
}