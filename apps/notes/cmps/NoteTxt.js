
import { eventBus } from "../../../services/event-bus.service.js"
import { notesService } from "../services/notes.service.js"
import NoteEdit from "../cmps/NoteEdit.js"

export default {
    props: ['note'],
    template: `
    
    <section class="note note-text" @mouseleave="hover = false" @mouseover="hover = true" :style="{ 'background-color': note.bgColor }">
            <h3>{{note.title}}</h3>
            <p>{{note.info.txt}}</p>
       <NoteEdit class="note-edits-container" :class="{'show-note-edits':hover}" 
       :note="note" @duplicateNote="duplicateNote" @removeNote="removeNote" @togglePin="togglePin"
         @updateColor="updateColor" />
          </section>
          `,
    components: {
        NoteEdit,
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
            notesService
                .update(this.currNote)
                .then(() => eventBus.emit('updateNotes'))
        },
        removeNote() {
            const id = this.currNote.id
            notesService.remove(id).then(() => eventBus.emit('updateNotes'))
            eventBus.emit('show-msg', {
                txt: 'Note removed',
                type: 'success',
            });
        },
        duplicateNote() {
            notesService.save(this.currNote).then(() => eventBus.emit('updateNotes'))
            eventBus.emit('show-msg', { txt: 'Note Duplicated', type: 'success' })
        },
        created() {
            this.currNote = this.note
        }
    }
}
