
import { notesService } from '../apps/notes/services/notes.service.js'
// import { eventBus } from '../services/event-bus.service.js'
import NoteFilter from '../apps/notes/cmps/NoteFilter.js'
import noteAdd from '../apps/notes/cmps/NoteAdd.js'

export default {
    template: `
        <section class="note-app">
          <NoteFilter @filtered="filter"/>
          <h2>{{notes}}</h2>
        </section>
    `,
    components: {
        NoteFilter,
        noteAdd,
    },
    data() {
        return {
            notes: null,
            filterBy: null,
        }
    },
    created() {
        this.reload()
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

    },
    computed: {


    },

}