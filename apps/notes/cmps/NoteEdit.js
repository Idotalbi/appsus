import { eventBus } from "../../../services/event-bus.service.js"
import ColorPalette from "../cmps/ColorPalette.cmp.js"



export default {
    props: ['note'],
    template: `
          <section class="note-actions" @mouseover="palette = true" @mouseleave="palette = false">
             
                 <div class="color-palette"  @click="chooseColor = !chooseColor" title="Change note color"> 
                      <i class="fa-solid fa-palette"></i>
                      <ColorPalette v-if="palette" v-if="chooseColor" @updateColor="updateColor"/>
                  </div>

                  <div @click="togglePin" class="pinned" title="Pin note">
                    <i v-if="note.isPinned" class="fa-solid fa-thumbtack"></i>
                    <img v-else src="../../../assets/img/pinned.svg"  alt="">
                  </div>

                  <div @click="removeNote" title="Remove note">
                    <i class="fa-solid fa-trash"></i>
                  </div>

                  <div @click="duplicateNote" title="Duplicate note">
                    <i class="fa-solid fa-clone"></i>
                  </div>

                  <div @click="sendNote" title="Send note">
                    <i class="fa-solid fa-paper-plane"></i>
                  </div>

                  <div @click="editNote" title="Edit note">
                     <i class="fa-solid fa-pen-to-square"></i>
                  </div>
          </section>
      `,
    components: {
        ColorPalette,
    },
    created() { },
    data() {
        return {
            chooseColor: false,
            palette: false,
        }
    },
    methods: {
        updateColor(color) {
            this.$emit('updateColor', color);
        },
        togglePin() {
            this.$emit('togglePin');
        },
        removeNote() {
            this.$emit('removeNote');
        },
        duplicateNote() {
            this.$emit('duplicateNote');
        },
        editNote() {
            this.$emit('editNote');
            eventBus.emit('openEdit', this.note)
        },
        sendNote() {
            let subject = this.note.title
            let body = this.note.info.txt
            if (this.note.type === 'note-img' || this.note.type === 'note-video')
                body = this.note.info.url
            if (this.note.type === 'note-todo') {
                body = this.note.info.todos.map(todo => todo.txt).join(',')
            }
        
        },
    }
}