import { eventBus } from "../../../services/event-bus.service.js"
import { notesService } from "../services/notes.service.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.cmp.js"
import NoteTodo from "./NoteTodo.cmp.js"
import NoteDetails from "./NoteDetails.js"


export default {
    props: ['note'],
    template: `
          <section class="note-modal-container" :style="{'background-color': note.bgColor}">
              <component @updateNote="updateNote"  :is="note.type"  :note="note"></component>
              <p class="last-created-text">Last created {{lastCreatedTime}}</p>
              <NoteDetails @updateNote="updateNote" @updateColor="updateColor" @sendNote="sendNote" @removeNote="removeNote"/>
              </section>
    `,
    components: {
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodo,
        NoteDetails,
    },
    created() {
        this.currNote = this.note
    },
    data() {
      return {
        currNote: null,
      }
    },
    methods: {
        sendNote() {
          let subject = this.note.title
          let body = this.note.info.txt
          if (this.note.type === 'note-img' || this.note.type === 'note-video')
            body = this.note.info.url
          if (this.note.type === 'note-todo') {
            body = this.note.info.todos.map(todo => todo.txt).join(',');
          }
        }
    },
    updateNote(updatedNote) {
        this.currNote.createdAt = Date.now()
        notesService.update(this.note)
        eventBus.emit('show-msg', {
          txt: 'Note updated',
          type: 'success',
        })
    },
    updateColor(color) {
      this.currNote.bgColor = color
      this.currNote.createdAt = Date.now()
      notesService.update(this.currNote)
      eventBus.emit('show-msg', {
        txt: 'Note color changed',
        type: 'success',
      })
    },
    removeNote() {
        const id = this.note.id;
        notesService.remove(id).then(() => {
          this.note.createdAt = Date.now()
          this.$emit('removeNote')
          eventBus.emit('updateNotes')
          eventBus.emit('show-msg', {
            txt: 'Note deleted',
            type: 'success',
          })
        })
      },
    
    computed: {
      lastCreatedTime() {
        var date = new Date(this.note.createdAt);
        date = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${
          date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes()
        }`
        return date
      },
    },
}