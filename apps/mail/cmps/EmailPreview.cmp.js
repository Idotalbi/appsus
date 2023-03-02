// import img from '../../../assets/img/mail'
export default {
    props: ["email"],
    template: `
        <section class="email-preview flex">
                  <img class="icon starred" v-if="isStarred" @click.stop="changeStarMode" src="../../../assets/img/mail/starred.png" alt="">
                  <img class="icon unstarred" v-else @click.stop="changeStarMode" src="../../../assets/img/mail/unstarred.png" alt="">
                  <div class="from-subject">
                      <span class="from">{{fromToPreview}}</span>
                      <span class="subject">{{subject}}</span>
                  </div>
                  <span class="date">{{date}}</span>
                  <div class="icons-container">
                        <RouterLink @click.stop :to="'/note/' + sendAsNote">
                            <img class="icon" src="../../../assets/img/mail/note.svg" alt="">
                        </RouterLink>
                      <img class="icon" @click.stop="moveToTrash" src="../../../assets/img/mail/trash.png" alt="">
                      <img class="icon" v-if="isRead" @click.stop="changeReadMode" src="../../../assets/img/mail/unread.png" alt="">
                      <img class="icon" @click.stop="changeReadMode" v-else src="../../../assets/img/mail/read.png" alt="">
                      <img class="icon" src="../../../assets/img/mail/sent.png" alt="">
                    </div>
        </section>
    `,

    computed: {
        date() {
            const time = new Date(this.email.sentAt);
            const date = `${time.toLocaleString('en', { month: 'short' } )} ${time.getDate()}`;
            return date;
        },

        subject(){
            if (this.email.subject.length > 25) return `${this.email.subject.substring(0,25)}...`
            else return this.email.subject
        },

        isRead(){
            return this.email.isRead ? true : false;
        },

        isStarred(){
            return this.email.isStarred ? true : false;
        },

        sendAsNote(){
            return JSON.stringify({...this.email})
        },

        fromToPreview(){
            if (this.email.status === 'sent') return this.email.to.email
            else return this.email.from.name
        }
    },
    methods: {
        changeReadMode() {
            this.$emit('changeReadMode', this.email, this.email.id)
            this.email.isRead = !this.email.isRead
        },
        moveToTrash() {
            this.email.status = 'trash'
            this.$emit('moveToTrash', this.email, this.email.id)
        },
        changeStarMode() {
            this.$emit('changeStarMode', this.email, this.email.id)
            this.email.isStarred = !this.email.isStarred
        }

    },

}