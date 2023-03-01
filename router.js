import Home from './pages/Home.js'
import About from './pages/About.js'
import BookApp from './pages/BookApp.js'
import BookDetails from './cmps/BookDetails.js';


const routes = [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/book',
      component: BookApp,
    },
    {
      path: '/book/:bookId',
      component: BookDetails,
    },
    {
        path:'/about',
        component:About,
    }
]


export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
  })