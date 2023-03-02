export default {
    props: ["noteInfo"],
    template: `
        <section class="email-compose">
            <div class="compose-container">
                <div class="compose-header">
                    <h1>New mail</h1>
                    <h2 @click="closeCompose">X</h2>
                </div>
                <div class="compose-main">
                    <label>to:
                        <input type="text" v-model="newSentEmail.to">
                    </label>
                    <hr>
                    <label>Subject:
                        <input type="text" v-model="newSentEmail.subject">
                    </label>
                    <hr>
                        <textarea type="text" rows="10" cols="30" v-model="newSentEmail.body"></textarea>
                    <button @click="sentEmail">Send</button>
                </div>
            </div>
        </section>   
    `,
    data() {
        return {
            newSentEmail: {
                to: '',
                subject: '',
                body: ''
            }
        }
    },
    created() {
        if (this.noteInfo) {
            if (this.noteInfo.type === 'textCmp') {
                this.newSentEmail.subject = this.noteInfo.info.title
                this.newSentEmail.body = this.noteInfo.info.txt
            } else if (this.noteInfo.type === 'imgCmp' || this.noteInfo.type === 'videoCmp')
                this.newSentEmail.subject = this.noteInfo.info.title
            this.newSentEmail.body = this.noteInfo.value
        } else if (this.noteInfo.type === 'listCmp')
            this.newSentEmail.subject = this.noteInfo.info.title
        this.newSentEmail.body = this.noteInfo.todos
    },

    methods: {
        sentEmail() {
            if (this.noteInfo) {
                this.$router.push({ path: '/mail/inbox' })
            }
            this.$emit('sentEmail', { ...this.newSentEmail })
        },
        closeCompose() {
            this.$emit('closeEmail', false)
        }
    },

    computed: {
        x() {
            return this.noteInfo.title
        }
    }

}
