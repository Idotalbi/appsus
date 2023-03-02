import Home from './pages/Home.js'
import About from './pages/About.js'
import BookApp from './pages/BookApp.js'
import BookDetails from './cmps/BookDetails.js'
import MailApp from './pages/MailApp.js'
import EmailList from './apps/mail/cmps/EmailList.cmp.js'
import EmailDetails from './apps/mail/pages/‏‏EmailDetails.cmp.js'
import NotesApp from './pages/NotesApp.js'
import NoteDetails from './apps/notes/cmps/NoteDetails.js'


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
    path: '/about',
    component: About,
  },
  {
    path: '/mail',
    component: MailApp,
    children: [
      {
        path: 'inbox/:noteMsg?',
        component: EmailList,
      },
      {
        path: 'details/:emailId',
        component: EmailDetails,
      },
    ],
  },
  {
    path: '/notes',
    component: NotesApp,
  }    {
      path: '/notes/:noteId',
      component: NoteDetails,
    },



export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})