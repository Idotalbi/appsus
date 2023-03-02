export default {
    template: `
          <section class="email-filter">
              <div class="filter-nav round">
              <i class="fa-solid fa-magnifying-glass"></i>
             <input type="search" @input="setFilter" v-model="filterBy.txt" placeholder="Search emails">
                <label>
                  <select v-model="filterBy.isRead" @change="setFilter">
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option  value="unread">Unread</option>
                  </select>
                </label>
              </div>
              <hr>
          </section>
      `,
    data() {
        return {
            filterBy: {
                isRead: 'all',
                txt: ''
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    },
}