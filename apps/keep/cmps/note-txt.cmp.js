export default {
    props: ['info'],
    template: `
        <section className="note note-txt">
            <pre>{{info.txt}}</pre>
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