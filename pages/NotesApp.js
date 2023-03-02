
import { notesService } from '../apps/notes/services/notes.service.js'
import { eventBus } from '../services/event-bus.service.js'
import NoteFilter from '../apps/notes/cmps/NoteFilter.js'
import NoteAdd from '../apps/notes/cmps/NoteAdd.js'
import ModalDetails from '../apps/notes/cmps/Modal.js'
import NoteList from '../apps/notes/cmps/Note.list.cmp.js'

export default {
    // props: ['note'],

    template: `
        <section class="notes-app-container">
        <div class="screen" :class="{'open-screen':currNote}" @click="currNote = null"></div>
        <!-- <div class="main-screen-note" @click="closeScreen"></div> -->
        <NoteAdd/>
        <NoteFilter @filtered="setFilter"/>
                <p v-if="noNotes">There Are No Notes</p>
                  <p v-if="!pinnedNotes && !notes"></p>
                  <p v-if="pinnedNotes && pinnedNotes.length">Pinned Notes</p>
                  <NoteList :notes="pinnedNotesToDisplay"/>
                    <p v-if="pinnedNotes.length && notes.length">Other Notes</p>
          <NoteList @openModal="openModal" :notes="notesToDisplay"/>
          <ModalDetails v-if="currNote" :is="currNote.type"  :note="currNote" @removeNote="hideModal"/>
        </section>
    `,
    components: {
        NoteFilter,
        NoteAdd,
        NoteList,
        ModalDetails,
    },
    data() {
        return {
            notes: null,
            filterBy: null,
            pinnedNotes: null,
            currNote: null,

        }
    },
    created() {
        this.unsubscribe = eventBus.on('updateNotes', this.updateNotes)
        this.unsubscribe1 = eventBus.on('openScreen', this.openModal)
        this.unsubscribe2 = eventBus.on('closeScreen', this.hideModal)
        this.updateNotes()
    },
    methods: {
        hideModal() {
            this.currNote = null
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        updateNotes() {
            notesService.query().then(notes => {
                this.notes = notes.filter(note => !note.isPinned)
                this.pinnedNotes = notes.filter(note => note.isPinned)
            })
        },
        openModal(note) {
            this.currNote = note
        },
    },

    computed: {
        notesToDisplay() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.title, 'i')
            if (this.filterBy.type) {
                return this.notes.filter(note => {
                    return regex.test(note.title) && note.type === this.filterBy.type
                })
            } else {
                return this.notes.filter(note => {
                    return regex.test(note.title)
                })
            }
        },

        noNotes() {
            return (
                (!this.notes && !this.pinnedNotes) ||
                (!this.notes.length && !this.pinnedNotes.length)
            )
        }
    },
    
    pinnedNotesToDisplay() {
        if (!this.filterBy) return this.pinnedNotes
        const regex = new RegExp(this.filterBy.title, 'i')
        if (this.filterBy.type) {
          return this.pinnedNotes.filter(note => {
            return regex.test(note.title) && note.type === this.filterBy.type
          })
        } else {
          return this.pinnedNotes.filter(note => {
            return regex.test(note.title)
          })
        }
      
    },
    unmounted() {
      this.unsubscribe()
      this.unsubscribe1()
      this.unsubscribe2()
    },
}