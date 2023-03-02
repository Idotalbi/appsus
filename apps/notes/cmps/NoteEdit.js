import { eventBus } from "../../../services/event-bus.service.js"
import textCmp from "./text.cmp.js"
import imgCmp from "./img.cmp.js"
import ColorPalette from "../cmps/ColorPalette.cmp.js"
import listCmp from "../cmps/list.cmp.js"
import NoteNavIcon from "./NoteNavIcon.js"



export default {
    props: ['note'],
    template: `
     <section class="edit-modal" :class="currNote.style.bgc" @click.stop>
    <component :is="this.currNote.type" :note="this.currNote" :isEdit="true"></component>
    <NoteNavIcon @showClrP="toggleClrP" :note="this.currNote" />
    <button @click="closeEdit" class="close-btn">Close</button>
    <ColorPalette v-if="isPaletteOpen" @setBgClr="setBgClr"/>
    </section>
    
    `,
    components: {
        textCmp,
        imgCmp,
        ColorPalette,
        listCmp,
        NoteNavIcon
    },
    data() {
        return {
            currNote: this.note,
            isPaletteOpen: false,

        }
    },
    methods: {
        setBgClr(className) {
            this.currNote.style.bgc = className
            this.isPaletteOpen = !this.isPaletteOpen
        },
        closeEdit(){
            eventBus.emit('closeScreen')
        },
        toggleClrP() {
            this.isPaletteOpen = !this.isPaletteOpen
          },
    }


}