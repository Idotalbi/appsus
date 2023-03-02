

import { eventBus } from "../../../services/event-bus.service.js"
import textCmp from './text.cmp.js'
import imgCmp from './img.cmp.js'
import ColorPalette from '../cmps/ColorPalette.cmp.js'
import NoteEdit from '../cmps/NoteEdit.js'
import listCmp from '../cmps/list.cmp.js'


export default {
  props: ["note"],
  template: `
  <div class="note-container" :class="bgClr" @click="openEditMode">
   <component :is="note.type" :note="note" :isEdit="false"></component>
   <ColorPalette v-if="isPaletteOpen" @setBgClr="setBgClr"/>
   <NoteEdit v-if="isEditOpen" :note="note" @closeEdit="closeEditMode"/>
  </div>
`,
  components: {
    textCmp,
    imgCmp,
    listCmp,
    ColorPalette,
    NoteEdit,

  },
  data() {
    return {
      isPinned: this.note.isPinned,
      isPaletteOpen: false,
      bgClr: this.note.style.bgc,
      isEditOpen: false,

    }
  },
  created() {
    this.unsubscribe = eventBus.on('closeEdit', this.closeEditMode)
  },
  methods: {
    showClrP() {
      this.isPaletteOpen = !this.isPaletteOpen
    },
    setBgClr(className) {
      this.bgClr = className
      this.isPaletteOpen = !this.isPaletteOpen
      eventBus.emit('setBgClr', { className, id: this.note.id })
    },
    openEditMode() {
      console.log('open modal');
      this.isEditOpen = true
      eventBus.emit('openScreen')
    },
    closeEditMode() {
      console.log('close modal');
      this.isEditOpen = false
    },
  },
  unmounted() {
    this.unsubscribe()
  },
}