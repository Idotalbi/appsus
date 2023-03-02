import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],

    template: `
     <i class="fa-solid fa-thumbtack" @click.stop="togglePin" title="pinned"></i>
    <i class="fa-solid fa-palette" @click.stop="showClrP"  title="Change note color"></i>
    <i class="fa-solid fa-pen-to-square" @click.stop="openEditMode" title="Edit note"></i>
    <i @click.stop="duplicate" class="fa-regular fa-copy" title="Duplicate note"></i>
    <i @click.stop="remove" class="fa-solid fa-trash-can" title="Delete note"></i> 
`,
    data() {
        return {
            isPinned: this.note.isPinned,
        }
    },
    mounted() { },
    methods: {
        duplicate() {
            eventBus.emit('duplicate', this.note.id)
        },
        remove() {
            eventBus.emit('remove', this.note.id)
        },
        showClrP() {
            this.$emit('showClrP')
        },
        togglePin() {
            eventBus.emit('togglePin', this.note.id)
        },
        openEditMode() {
            this.$emit('openEditMode')
        },
       
    },

    unmounted() { },
}