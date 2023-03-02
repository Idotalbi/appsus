export default {
  props: ["emails"],
  template: `
        <section v-if="emails" :class="menuOpen">
          <div class="email-folder-list">
          <button class="btn" @click="compose">               
          <div class="btn-container"><img  src="../../../assets/img/mail/compose.png"/></div>
          <span>Compose</span>
          </button>
          <ul class="clean-list">
            <li @click="setStatus('inbox')">
              <img class="icon" src="../../../assets/img/mail/inbox.png" alt="">
              <span> Inbox</span>
              <span class="unread-count">{{unread}}</span>
            </li>
            <li @click="setStarredFilter">
              <img class="icon" src="../../../assets/img/mail/star-side.png" alt="">
              <span> Starred</span>
            </li>
            <li @click="setStatus('sent')">
              <img class="icon" src="../../../assets/img/mail/sent.png" alt="">
              <span> Sent</span>
            </li>
            <li @click="setStatus('draft')">
              <img class="icon" src="../../../assets/img/mail/draft.png" alt="">
              <span> Draft</span>
            </li>
            <li @click="setStatus('trash')">
            <img class="icon" src="../../../assets/img/mail/trash.png" alt="">
              <span> Trash</span>
            </li>
          </ul>
          </div>
        </section>
    `,
  components: {},
  created() {

  },
  data() {
    return {
      status: 'inbox',
      isMenuOpen: false,

    }
  },
  methods: {
    setStatus(status) {
      this.$router.push({ path: '/mail/inbox' })
      this.status = status;
      this.$emit('StatusFiltered', this.status)
    },
    
    setStarredFilter(){
      this.$emit('StarredFiltered')
    },

    compose() {
      this.$emit('isCompose', true)
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },

  },
  computed: {
    
    unread() {
      const unreads = this.emails.filter(email => !email.isRead && email.status === 'inbox')
      if (!unreads.length) return ''
      else return unreads.length
    },

    menuOpen() {
      return this.isMenuOpen ? 'menu-open' : '';
    },

  },
  
}