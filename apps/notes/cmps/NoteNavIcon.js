import { eventBus } from '../../../services/event-bus.service.js'
import ColorPalette from './ColorPalette.cmp.js'

export default {
    props: ['note'],

    template: `
    <section class='note-nav-icon'>
    <div @click="goBack" title="Go Back">
        <i class="fa-solid fa-arrow-left-long"></i>
     </div>

     <div class="color-palette" @click="chooseColor = !chooseColor" title="Change note color">
     <i class="fa-solid fa-palette"></i>
     <ColorPalette v-if="chooseColor" @updateColor="updateColor"/>
     </div>

     <div @click="removeNote" title="Delete note">
     <i class="fa-solid fa-trash-can"></i>
     </div>

     <div @click="sendNote"  title="Send note">
        <i class="fa-solid fa-paper-plane"></i>
     </div>

</section>
        `,
    components: {
        ColorPalette,
    },
    data() {
        return {
            chooseColor: false,
        }
    },
    methods: {
        updateColor(color) {
            this.$emit('updateColor', color)
        },
        removeNote() {
            this.$emit('removeNote')
        },
        goBack() {
            eventBus.emit('closeEdit')
        },
        sendNote() {
            this.$emit('sendNote')
        }


    },

    unmounted() { },
}