import NotePreview from './NotePreview.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteVideo from './NoteVideo.cmp.js'
import NoteTodo from './NoteTodo.cmp.js'


export default {
    props: ['notes'],
    template: `
                  <section class="notes-list-container" >
    
                    <ul class="notes-list" >
                      <li v-for="note in notes" :key="note.id" class="note-preview-container">
                        <component :is="note.type" :note="note" :style="{ 'background-color': note.bgColor }"></component>
                      
                      </li>
                    </ul>
                  </section>
              
              `,
    components: {
        NotePreview,
        NoteTxt,
        NoteTodo,
        NoteImg,
        NoteVideo
    }
}