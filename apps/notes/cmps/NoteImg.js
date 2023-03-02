import { eventBus } from '../../../services/event-bus.service.js'
import { notesService } from '../services/notes.service.js'
import NoteEdit from './NoteEdit.js'


export default {
  props: ['note'],
  template: `
      
      <section class="note note-img" @mouseleave="hover = false" @mouseover="hover = true">
        <h3>{{note.title}}</h3>
        <img :src="note.info.url" alt="">
       <NoteEdit class="note-edit-container" :class="{'show-note-edits': hover}" :note="note" @duplicateNote="duplicateNote"
       @removeNote="removeNote" @togglePin="togglePin" @updateColor="updateColor"/>
      </section>
    `,
  components: {
    NoteEdit,
  },
  created() {
    this.currNote = this.note
  },
  data() {
    return {
      currNote: null,
      hover: false,
    }
  },
  methods: {
    updateColor(color) {
      this.currNote.bgColor = color
      notesService.update(this.currNote)
      eventBus.emit('show-msg', {
        txt: 'Note color changed',
        type: 'success',
      })
    },
    togglePin() {
      this.currNote.isPinned = !this.currNote.isPinned
      notesService.update(this.currNote).then(res => {
        eventBus.emit('updateNotes')
      })
    },
    removeNote() {
      const id = this.currNote.id
      notesService.remove(id).then(res => {
        eventBus.emit('updateNotes')
        eventBus.emit('show-msg', {
          txt: 'Note removed',
          type: 'success',
        })
      })
    },
    duplicateNote() {
      notesService.save(this.currNote).then(() => eventBus.emit('updateNotes'))
      eventBus.emit('show-msg', { txt: 'Note Duplicated', type: 'success' })
    },
  },
}
