import { notesService } from "../services/notes.service.js"
import NoteNavIcon from "../cmps/NoteNavIcon.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.cmp.js"
import NoteTodo from "./NoteTodo.cmp.js"

export default {
    props: ['note'],
    template: `
    <section v-if="note" class="note-details" :style="{'background-color': note.bgColor}">
           <component :is="note.type" @updateNote="updateNote" :note="note"></component>
          <note-actions-details @updateColor="updateColor" @removeNote="removeNote" />
        </section>
    `,
    components: {
        NoteTxt,
        NoteImg,
        NoteNavIcon,
        NoteTodo,
        NoteVideo
    },
    created() {
        const id = this.$route.params.noteId;
        notesService.get(id).then(note => (this.note = note))
        this.note = this.currNote
    },
    data() {
        return {
          currNote: null,
        }
    },
    methods: {
        loadNote() {
          notesService.get(this.noteId).then(note => (this.note = note));
        },
        updateNote(updatedNote) {
          this.note = updatedNote;
          notesService.update(this.note);
        },
        updateColor(color) {
          this.note.bgColor = color;
          eventBus.emit('show-msg', { txt: 'Note Color Changed', type: 'success' })
          notesService.update(this.note)
        },
        removeNote() {
          const id = this.note.id;
          notesService.remove(id).then(() => {
            this.$router.push('/notes')
            eventBus.emit('show-msg', {
              txt: 'Note has been removed',
              type: 'success',
            })
          })
        },
      },
      watch: {
        noteId: {
          handler() {
            this.loadNote()
          },
          immediate: true,
        },
      },
      computed: {
        noteId() {
          return this.$route.params.noteId
        },
      },
}