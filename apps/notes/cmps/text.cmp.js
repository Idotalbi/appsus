
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note', 'isEdit'],
    template: `
               <span v-if="isEdit">
                <textarea v-model="currNote.info.title" type="text" > </textarea> <br>
                <textarea v-model="currNote.info.txt" rows="4" cols="50" ></textarea>
            </span>
            <span v-else>
              <h4>{{currNote.info.title}}</h4>
              <p>{{currNote.info.txt}}</p>
            </span>
      `,
    data() {
        return {
            currNote: this.note,
        }
    },
    unmounted() {
        if (this.isEdit) {
            eventBus.emit('updateNote', this.currNote)
        }
    },

}