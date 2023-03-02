import { emailService } from "../services/email.service.js";

export default {
  template: `
        <section v-if="email" class="email-details">
          <hr>
          <div class="details-icons"> 
               <img class="icon trash" title="remove" src="../../../assets/img/mail/trash.png" @click="moveToTrash">  
               <img class="icon back" title="back" src="../../../assets/img/mail/back.png" @click="backToList">
          </div>
            <h1>{{email.subject}}</h1>
            <h2>{{email.from.name}}</h2>
            <h3><span>to: </span>{{email.to.email}}</h3>
            <hr class="body">
            <p>{{email.body}}</p>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {
      email: null
    }
  },
  mounted() { },
  methods: {
    loadMail() {
      mailService.get(this.emailId)
        .then(email => this.email = email);
    },
    moveToTrash() {
      mailService.moveToTrash(this.emailId)
        .then(email => this.email = email)
      this.$router.push({ path: '/mail/inbox' })
    },
    backToList() {
      this.$router.push({ path: '/mail/inbox' })
    }
  },
  computed: {
    emailId() {
      return this.$route.params.emailId
    },

  },
  watch: {
    emailId: {
      handler() {
        this.loadMail()
      },
      immediate: true,
    }
  },
  unmounted() { },
}