import { emailService } from '../apps/mail/services/email.service.js';
import { eventBus } from '../services/event-bus.service.js';

import EmailFolderList from '../apps/mail/cmps/EmailFolderList.cmp.js'
import EmailFilter from '../apps/mail/cmps/EmailFilter.cmp.js'
import EmailCompose from '../apps/mail/cmps/EmailCompose.cmp.js'

export default {
    template: `
        <section :class="menuOpen">
          <div class="main-screen" @click="toggleMenu"></div>
          <div class="flex filter-menu">
            <button class="btn-menu" @click="toggleMenu">☰</button>
            <EmailFilter v-if="emails" @filtered="setFilter"/>
          </div>
          <div class="flex main-content">
            <EmailFolderList @StatusFiltered="setStatusFilter" @isCompose="isComposed" @StarredFiltered="setStarredFilter" :emails='emails'/>
            <RouterView v-if='!isCompose' @onMoveToTrash="onMoveToTrash"></RouterView>
            <EmailCompose v-else @sentEmail="onSentEmail" @closeEmail="isComposed" :noteInfo="mailVal"/>
          </div>
        </section>
    `,
    components: {
        EmailFilter,
        EmailFolderList,
        EmailCompose
    },
    created() {

    },
    data() {
        return {
            emails: null,
            filterBy: null,
            status: 'inbox',
            isCompose: false,
            isChangeToggle: false,
            isMenuOpen: false,
            mailVal: null,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
            eventBus.emit('setEmails', this.emailsForDisplay)
        },

        setStatusFilter(status) {
            this.status = status;
            this.isCompose = false;
            this.isChangeToggle = !this.isChangeToggle;
            if (window.innerWidth < 740) this.isMenuOpen = !this.isMenuOpen
        },

        setStarredFilter() {
            emailService.query()
                .then(emails => this.emails = emails)
                .then((emails) => emails.filter((email) => email.isStarred))
                .then((emails) => eventBus.emit('setEmails', emails))
        },

        isComposed(bool) {
            this.isCompose = bool;
            this.mailVal = null
        },

        onSentEmail(newSentEmail) {
            this.isCompose = false
            emailService.sentEmail(newSentEmail.to, newSentEmail.subject, newSentEmail.body)
                .then(email => this.emails.push(email))
        },

        onMoveToTrash(email, emailId) {
            emailService.moveToTrash(emailId)
                .then(currEmail => email = currEmail)
                .then(() => this.isChangeToggle = !this.isChangeToggle)
        },

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    },
    computed: {
        emailsForDisplay() {
            const isFilterRead = this.filterBy.isRead === 'read';
            const regex = new RegExp(this.filterBy.txt, 'i')

            if (this.filterBy.isRead === 'all') return this.emails.filter((email) => regex.test(email.from + email.subject))
            return this.emails.filter(email => regex.test(email.from + email.subject)
                && ((email.isRead && isFilterRead)
                    || (!email.isRead && !isFilterRead)));
        },

        state() {
            return this.$route.params
        },

        menuOpen() {
            return this.isMenuOpen ? 'menu-open' : '';
        },

        noteVal() {
            return this.$route.params.noteMsg
        },
    },
    unmounted() { },
    watch: {
        noteVal: {
            handler() {
                if (this.$route.params.noteMsg) {
                    console.log(this.$route.params.noteMsg);
                    var x = JSON.parse(this.$route.params.noteMsg)
                    this.isCompose = true
                    this.mailVal = x
                }
            },
            immediate: true,
        },

        isChangeToggle: {
            handler() {
                emailService.query()
                    .then(emails => this.emails = emails)
                    .then((emails) => emails.filter((email) => email.status === this.status))
                    .then((emails) => eventBus.emit('setEmails', emails))
            },
            immediate: true,
        },

        state: {
            handler() {
                emailService.query()
                    .then(emails => this.emails = emails)
                    .then((emails) => emails.filter((email) => email.status === this.status))
                    .then((emails) => eventBus.emit('setEmails', emails))
            },
            immediate: true,
            deep: false
        },


        isCompose: {
            handler() {
                emailService.query()
                    .then(emails => this.emails = emails)
                    .then((emails) => emails.filter((email) => email.status === 'inbox'))
                    .then((emails) => eventBus.emit('setEmails', emails))
            },
            immediate: true,
        },
    }
}