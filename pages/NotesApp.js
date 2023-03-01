
import { notesService } from '../apps/notes/services/notes.service.js'
import { eventBus } from '../services/event-bus.service.js'
import NoteFilter from '../apps/notes/cmps/NoteFilter.js'
import NoteAdd from '../apps/notes/cmps/NoteAdd.js'
import NotesPin from '../apps/notes/cmps/NotesPin.js'

export default {
    template: `
        <section class="note-app">
          <NoteFilter @filtered="filter"/>
          <NotesPin v-if="notes" :notes="NotesToShow"/>
        </section>
    `,
    components: {
        NoteFilter,
        NoteAdd,
        NotesPin,
    },
    data() {
        return {
            notes: null,
            filterBy: null,
            selectedNote: null,

        }
    },
    created() {
        this.reload()
        this.unsubscribe = eventBus.on('togglePin', this.togglePin)
        this.unsubscribe = eventBus.on('updateNote', this.updateNote)
        this.unsubscribe = eventBus.on('reload', this.reload)
    },
    mounted() { },
    methods: {
        reload() {
            notesService.query().then((notes) => {
                this.notes = notes
            })
        },
        filter(filterBy) {
            this.filterBy = filterBy
        },
        togglePin(noteId) {
            notesService.get(noteId)
                .then((note) => {
                    note.isPinned = !note.isPinned
                    notesService.update({ ...note })
                })
                .then(() => this.reload())
        },
       

    },
    computed: {
        NotesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            if (this.filterBy.type === 'all') return this.notes.filter((note) => regex.test(note.value + note.title))
            return this.notes.filter((note) => regex.test(note.value + note.title) && note.type === this.filterBy.type)
        },

    },

}