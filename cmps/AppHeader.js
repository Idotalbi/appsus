export default {
    template: `
        <header class="app-header">
            <h1>Books</h1>
            <nav>
            <router-link to="/">Home</router-link> 
            <router-link to="/book">Book</router-link>
            <router-link to="/mail">Mail</router-link>
            <router-link to="/notes">notes</router-link>
            <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
    methods: {
    }
}