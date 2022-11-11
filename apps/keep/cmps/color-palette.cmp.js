export default {
    props: [],
    template: `
        <section className="color-palette">
            <div @click="setColor(color)" class="color-palette-div" :style="{'backgroundColor': color}" v-for="color in colors"></div>
        </section>
    `,
    data() {
        return {
            colors: ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e8eaed']
        }
    },
    methods: {
        setColor(color) {
            // console.log(color);
            this.$emit('change-color', color)
        }
    },
    computed: {
    },
}