export default {
    template: `
          <section class="color-palette">
                  <div v-for="color in colors" :style="{'background-color:color.color'}" :title="color.title" 
                  class="color-option" @click.stop="updateColor(color.color)"></div>
          </section>
      `,
    data() {
        return {
            colors: [
                { color: '#add8e6', title: 'lightblue' },
                { color: '#f08080', title: 'lightcoral' },
                { color: '#20b2aa', title: 'lightseagreen' },
                { color: '#ffb6c1', title: 'lightpink' },
                { color: '#ffa07a', title: 'lightsalmon' },
                { color: '#fafad2', title: 'lightgoldenrodyellow' },
            ],
        }
    },
    methods: {
        updateColor(color) {
            this.$emit('updateColor', color)
        }
    },

}