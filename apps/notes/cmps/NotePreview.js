

import { eventBus } from "../../../services/event-bus.service.js"
import textCmp from './text.cmp.js'
import imgCmp from './img.cmp.js'


export default {
    props: ["note"],
    template: `
  <div class="note-container" >
  <component :is="note.type" :note="note"></component>

  </div>
`,
    components: {
        textCmp,
        imgCmp,
    },
    data() {
        return {
            isPinned: this.note.isPinned,
        }
    },

}