export default {
    props: [],
    template: `
        <section className="color-palette">
            <div class="color-palette-div" :style="{'backgroundColor': color}" v-for="color in colors"></div>
        </section>
    `,
    data() {
        return {
            colors: ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e8eaed']
        }
    },
    methods: {
    },
    computed: {
    },
}