export default {
    template: `
    <section class="review-add">
        <h1>Add review:</h1>
        <form  @submit.prevent="add">
            <label>
                Full name:
                <input ref="fullName" type="text" v-model="review.name">
            </label>
            <label>
                Read at:
                <input type="date" v-model="review.date">
            </label>
            <label>
                Rate:
                <select v-model="review.rate">
                    <option v-for="n in 5">{{n}}</option>
                </select>
            </label>
            <label>Review:</label>
                <textarea v-model="review.txt" rows="4"></textarea>
            <button class="add-review-btn">Add</button>
        </form>
        <hr>
    </section>
    `,
    data() {
        return {
            review: {
                name: '',
                date: '',
                rate: 1,
                txt: ''
            }
        }
    },
    created() {

    },
    mounted() {
        this.$refs.fullName.focus();
    },
    methods: {
        add() {
            this.$emit('add-review', { ...this.review });
            this.review = {
                name: '',
                date: '',
                rate: 1,
                txt: ''
            };
        }
    }

}