export default {
    props: ['txt'],
    template: `
        <section class="long-text">
            <p>{{txtForDisplay}}<span v-if="isReadMore">{{restTxt}}</span></p>
            <p class="read-more" v-if="txt.length > 100" @click="txtToggle">{{msg}}</p>
        </section>
    `,

    data() {
        return {
            isReadMore: false,
        }
    },
    created() {

    },
    methods: {
        txtToggle() {
            this.isReadMore = !this.isReadMore
        }

    },
    computed: {
        txtForDisplay() {
            if (this.txt.length > 100) {
                return this.isReadMore ? this.txt.substring(0, 100) : `${this.txt.substring(0, 100)}...`
            }
            else return this.txt;
        },
        restTxt() {
            return this.txt.substring(101)
        },

        msg() {
            return this.isReadMore ? 'Read less' : 'Read more'
        }

    }
}