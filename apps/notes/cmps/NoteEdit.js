import { eventBus } from "../../../services/event-bus.service.js";
import textCmp from "./text.cmp.js"
import imgCmp from "./img.cmp.js";
export default {
    props: ['note'],
    template: `
    <component :is="this.currNote.type" :note="this.currNote"></component>

    </section>
    
    `,
    components: {
        textCmp,
        imgCmp
    },
    data() {
        return {
            currNote: this.note,
        }
    },
}