import { notesService } from "../services/notes.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import NoteEdit from "./NoteEdit.js"


export default {
    props: ['note'],
    template: `
    <section class="note note-todo" @mouseleave="hover = false" @mouseover="hover = true">
        <h3>{{note.title}}</h3>
        <ul class="todo-list">
        <li v-for ="todo in note.info.todos" class='todo'>
        <label :class="{'done':todo.doneAt}" :for="todo.txt">{{todo.txt}}
    <input @click="done(todo)" :checked="todo.doneAt" type="checkbox" name="" :id="todo.txt">
    </label>
    </li>
        </ul>
    <NoteEdit class="note-edits-container" :class="{'show-note-edits':hover}" :note="note" @duplicateNote="duplicateNote" 
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
        done(todo) {
            todo.doneAt ? (todo.doneAt = null) : (todo.doneAt = Date.now())
            notesService.update(this.currNote)
        },
        updateColor(color) {
            this.currNote.bgColor = color
            notesService
                .update(this.currNote)
                .then(() => {
                    eventBus.emit('updateNotes')
                    eventBus.emit('show-msg', {
                        txt: 'Note color changed',
                        type: 'success',
                    })
                })
                .catch(() => {
                    console.log('Color Error')
                })
        },
        togglePin() {
            this.currNote.isPinned = !this.currNote.isPinned
            notesService.update(this.currNote).then(() => {
                eventBus.emit('updateNotes')
            })
        },
        removeNote() {
            const id = this.currNote.id;
            notesService.remove(id).then(() => {
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



