import { bookService } from "../services/book.service.js"
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
    <section class="book-add">
        <label>
            Add book:
            <input type="search" v-model="value" placeholder="search book to add">
        </label>
        <button @click="searchBook" class="search-button">search</button>
            <ul v-if="value">
                <li v-for="book in books">
                    <button @click="addBook(book)">+</button>
                    <h1>{{book.volumeInfo.title}}</h1>
                </li>
            </ul>
    </section>
    `,
    data() {
        return {
            value: '',
            books: null,
            newBook: null
        };
    },
    methods: {
        searchBook() {
            bookService.searchGoogleBook(this.value)
                .then(books => this.books = books)
        },
        addBook(book) {
            bookService.addBook(book)
                .then(book => {
                    this.$emit('bookAdded', book);
                    eventBus.showSuccessMsg('Book added !')
                })
                .catch(err => {
                    console.error(err);
                    eventBus.showErrorMsg('Error - try again later')
                });
            this.value = '';

        }
    }
}