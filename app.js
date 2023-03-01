import { router } from './router.js';

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './pages/UserMsg.js'
import About from './pages/About.js'

const options = {
    template: `
        <section>
            <app-header />
            <user-msg />
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
        About
    }
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');