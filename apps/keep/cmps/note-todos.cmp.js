export default {
    props: ['info'],
    template: `
        <section className="note note-todos">
            <label>{{info.label}}</label>
            <ul>
                <li v-for="todo in info.todos">
                    <p>{{todo.txt}}</p>
                    
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}