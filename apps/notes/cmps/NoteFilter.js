

export default {
    template: `
<section class ="search-container">
<div class="search-nav round">
    <input type="search" @input="setFilter" v-model="filterBy.txt" placeholder="Search Notes">
    <select v-model="filterBy.type" @change="setFilter" class="round">
        <option value='all'>All</option>
        <option value ='textCmp'>Text</option>
        <option value ='imgCmp'>Image</option>
        <option value ='videoCmp'>Video</option>
        <option value="soundCmp">Sound</option>
        <option value="listCmp">List</option>
    </select>
</div>

</section>
`,
    data() {
        return {
            filterBy: {
                txt: '',
                type: 'all'
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        },
    },

}