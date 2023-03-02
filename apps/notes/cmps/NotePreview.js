

import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteVideo from '../cmps/NoteVideo.cmp.js'
import NoteTodo from './NoteTodo.cmp.js'


export default {
  props: ['note'],
  template: `
   <component :is="note.type" :note="note" :style="{'backgroundColor' :note.bgColor}"></component>
`,
  components: {
    NoteTxt,
    NoteImg,
    NoteTodo,
    NoteVideo,

  },
  data() {
    return {}
  },
  computed: {

    noteType() {
      return ``
    }

  }
}
