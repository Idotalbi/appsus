export default{
    props: ['review'],
    template:`
    <section class="review-preview">
        <div class="review">
        <span class="remove-review" @click="remove(review)">X</span>
            <h1>{{review.name}}</h1>
            <p class="date"><span>Read at: </span>{{review.date}}</p>
            <p>{{rate}}</p>
            <p class="review-txt"><span>Review: </span>{{review.txt}}</p>
        </div>
    </section>
    `,
    methods:{
        remove(review){
            this.$emit('remove', review)
        }
    },
    computed:{
        rate(){
            return '★'.repeat(this.review.rate)+'☆'.repeat(5 -this.review.rate)
        }
    }
}