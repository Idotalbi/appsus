import BookPreview from './BookPreview.js'

export default {
    props:['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <router-link :to="/book/+book.id" class="details-btn">Details</router-link><button @click="remove(book.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
       
    },
    components: {
        BookPreview,
    }
}