
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
                <textarea v-model="currNote.info.title" type="text" > </textarea> 
                <textarea v-model="currNote.info.txt" rows="4" cols="50" ></textarea>
             
           
      `,
    components: {},
    data() {
        return {
            currNote: this.note,
        }
    },

}