export default {
    props:['book'],
    template:`
        <section class="book-preview">
            <p>{{book.title}}</p>
            <img :src="book.thumbnail">
            <p>{{bookPrice}}</p>
        </section>
    `,
    data(){
        return{}
    },
    created(){

    },
    methods:{

    },
    computed:{
        bookPrice() {
            const { amount, currencyCode } = this.book.listPrice
            return Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        }
    }
}