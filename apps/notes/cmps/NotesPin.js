import NotePreview from "./NotePreview.js";



export default {
    props: ['notes'],
    template: `
          <span v-if="notesPin.length">pinned</span>
          <section class="notes-area">
            <NotePreview v-for="note in notesPin" :key="note.id" :note="note"/>
          </section>
          <span v-if="notesPin.length">not pinned</span>
          <section class="notes-area">
            <NotePreview v-for="note in notesNotPin" :key="note.id" :note="note"/>
          </section>
      `,
    components: {
        NotePreview,
    },
    methods: {
        togglePin(noteId) {
            this.$emit('togglePin', noteId)
        },
    },
    computed: {
        notesPin() {
            return this.notes.filter((note) => note.isPinned)
        },
        notesNotPin() {
            return this.notes.filter((note) => !note.isPinned)
        },
    },
}
