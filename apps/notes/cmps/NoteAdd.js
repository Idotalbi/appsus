import { notesService } from "../services/notes.service.js"
import { utilService } from "../../../services/util.service.js"
import { eventBus } from "../../../services/event-bus.service.js"


export default {
    template: `
<section class="notes-add-container">
    
<input :placeholder="placeholder"  v-model="title" type="text"  @keyup.enter="onSaveNote">
                <div class="note-types-add">
                    <div title="Text" @click="setType('note-txt')" :class="{'active-type-add': active === 'text'}">
                    <i class="fa-solid fa-square-pen"></i>
                    <i class="fa-regular fa-text"></i>
                    </div>
                    <div title="Image" @click="setType('note-img')" :class="{'active-type-add': active === 'image'}">
                   <i class="fa-solid fa-image"></i>
                    </div>
                    <div title="Video" @click="setType('note-video')" :class="{'active-type-add': active === 'video'}">
                    <i class="fa-brands fa-youtube"></i>
                    </div>
                    <div title="Todo list" class="note-list-icon" @click="setType('note-todo')" :class="{'active-type-add': active === 'todo'}">
                        <i class="fa-solid fa-list"></i>
                    </div>

                    <div @click="onSaveNote" class="add-note-btn" title="Add note">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>


</section>

`,
    created() {
        this.note = notesService.getEmptyNote()
        if (this.$route.query.subject || this.$route.query.body) {
            this.note.title = this.$route.query.subject
            this.note.info.txt = this.$route.query.body
            notesService.save(this.note).then(() => {
                eventBus.emit('updateNotes')
                this.$router.push('/notes')
            });
        }
    },
    data() {
        return {
          note: null,
          title: '',
          placeholder: `What's on your mind...`,
          active: 'text',
        }
    },
    methods: {
        onSaveNote() {
            if (!this.title) return
            if (this.note.type === 'note-img' || this.note.type === 'note-video')
              this.note.info.url = this.title
            if (this.note.type === 'note-txt') this.note.info.txt = this.title
            if (this.note.type === 'note-todo') {
              var todos = this.title.split(',').map(todoTxt => {
                return { id: utilService.makeId(), txt: todoTxt, doneAt: null }
              })
              this.note.info.todos = todos
            }
            notesService.save(this.note).then(() => {
              eventBus.emit('updateNotes')
              eventBus.emit('show-msg', { txt: 'Note Added', type: 'success' })
            })
            this.title = ''
          },
          setType(type) {
            this.note.type = type
            switch (type) {
              case 'note-img':
                this.active = 'image'
                this.placeholder = 'Enter image URL...'
                break
              case 'note-video':
                this.active = 'video';
                this.placeholder = 'Enter video URL...'
                break;
              case 'note-txt':
                this.active = 'text'
                this.placeholder = `What's on your mind...`
                break;
              case 'note-todo':
                this.active = 'list';
                this.placeholder = 'Enter todo list...';
            }
          },
        },
}