export default {
    template: `
        <section class="book-filter">
            <form>
                <label>
                    Name:
                    <input
                     class="name-input"
                     @input="setFilter" 
                     type="text" 
                     v-model="filterBy.name" 
                     placeholder="Search book name">
                </label>
                <label>
                    Price:
                    <input 
                    class="price-input"
                     @input="setFilter"
                      type="number"
                      min=0
                       v-model.number="filterBy.fromPrice"
                        placeholder="From price">
                    <input 
                    class="price-input"
                    @input="setFilter" 
                    min=0
                    type="number" 
                    v-model.number="filterBy.toPrice"
                     placeholder="To price">
                </label>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: null,
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter', { ...this.filterBy })
        }
    }
}