export default {
    props: ['info'],
    template: `
        <section class="note note-img">
            <h1>{{info.title}}</h1>
            <img :src="info.url" alt="" />
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
    created() {
        // console.log(this.info);
    }
}