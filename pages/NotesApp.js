
import { notesService } from '../apps/notes/services/notes.service.js'
import { eventBus } from '../services/event-bus.service.js'
import NoteFilter from '../apps/notes/cmps/NoteFilter.js'
import NoteAdd from '../apps/notes/cmps/NoteAdd.js'
import NotesPin from '../apps/notes/cmps/NotesPin.js'

export default {
    template: `
        <section class="note-app" :class="editOpen">
        <div class="main-screen-note" @click="closeScreen"></div>
          <NoteFilter @filtered="filter"/>
          <NoteAdd @saved-note="addNote"/>
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
            isEditOpen: false,
            selectedNote: null,

        }
    },
    created() {
        this.reload()
        this.unsubscribe = eventBus.on('duplicate', this.duplicate)
        this.unsubscribe = eventBus.on('remove', this.remove)
        this.unsubscribe = eventBus.on('setBgClr', this.setBgClr)
        this.unsubscribe = eventBus.on('togglePin', this.togglePin)
        this.unsubscribe = eventBus.on('updateNote', this.updateNote)
        this.unsubscribe = eventBus.on('reload', this.reload)
        this.unsubscribe = eventBus.on('openScreen', this.openScreen)
        this.unsubscribe = eventBus.on('closeScreen', this.closeScreen)
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
        updateNote(newNote) {
            console.log(newNote);
            notesService.update(newNote)
                .then(() => {
                    console.log('updates')
                    this.reload()
                })
        },
        addNote(newNote) {
            notesService
                .addNewNote(newNote)
                .then(() => this.reload())
                .then(() => eventBus.showSuccessMsg('Note added !'))
                .catch((err) => {
                    console.error(err)
                    eventBus.showErrorMsg('Error -  try again later')
                })
        },
        duplicate(noteId) {
            notesService
                .get(noteId)
                .then((note) => notesService.addNew({ ...note }))
                .then(() => this.reload())
        },
        remove(noteId) {
            notesService
                .remove(noteId)
                .then(() => {
                    this.reload()
                    eventBus.showSuccessMsg('Note deleted !')
                    if (this.isEditOpen) this.closeScreen()
                })
                .catch((err) => {
                    console.error(err)
                    eventBus.showErrorMsg('Error -try again later')
                })
        },
        setBgClr({ className, id }) {
            notesService
                .get(id)
                .then((currNote) => {
                    console.log('changing2', className, id);
                    currNote.style.bgc = className
                    notesService.update({ ...currNote })
                    if (this.isEditOpen) this.closeScreen()
                })
                .then(() => this.reload())
        },
        openScreen() {
            this.isEditOpen = !this.isEditOpen
        },
        closeScreen() {
            this.isEditOpen = !this.isEditOpen
            eventBus.emit('closeEdit')
        }

    },
    computed: {
        NotesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            if (this.filterBy.type === 'all') return this.notes.filter((note) => regex.test(note.value + note.title))
            return this.notes.filter((note) => regex.test(note.value + note.title) && note.type === this.filterBy.type)
        },
        editOpen() {
            return this.isEditOpen ? 'edit-open' : ''
        },
    },

}