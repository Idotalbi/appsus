import { bookService } from '../services/book.service.js'
import { eventBus } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import BookDetails from '../cmps/BookDetails.js'
import BookEdit from '../cmps/BookEdit.js'

export default {
    template: `
        <section class="book-index">
            <BookFilter @filter="setFilterBy"/>
            <BookEdit @book-saved="onSaveBook"/>
            <BookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <BookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBus.showSuccessMsg('Book removed !')
                })
                .catch(err => {
                    console.error(err);
                    eventBus.showErrorMsg('Error - try again later')
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        onSaveBook(newBook) {
            this.books.unshift(newBook)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.name, 'i')
            const min = this.filterBy.fromPrice || 0
            const max = this.filterBy.toPrice || Infinity
            return this.books.filter(book => regex.test(book.title))
                .filter(book => book.listPrice.amount > min)
                .filter(book => book.listPrice.amount < max)
        },

    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookFilter,
        BookList,
        BookDetails,
        BookEdit,
    }
}