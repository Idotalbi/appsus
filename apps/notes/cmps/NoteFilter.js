
export default {
    template: `
<section class ="notes-filter-container">
    <input type="search" @input="setFilter" v-model="filterBy.title" placeholder="Search Notes"/>
    <i class="fa-solid fa-magnifying-glass"></i>
    <select v-model="filterBy.type" @change="setFilter">
    <option disabled value="">Select</option>
        <option value=''>All</option>
        <option value ='note-txt'>Text</option>
        <option value ='note-img'>Image</option>
        <option value ='note-video'>Video</option>
        <option value="note-sound">Sound</option>
        <option value="note-todo">Todos</option>
    </select>

</section>
`,
    data() {
        return {
            filterBy: {
                title: '',
                type: '',
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        },
    },

}