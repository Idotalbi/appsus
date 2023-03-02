
import { eventBus } from '../../../services/event-bus.service.js'
import { notesService } from '../services/notes.service.js'


export default {
    props: ["note", "isEdit"],
    template: `
          <span v-if="isEdit">
          <textarea v-model="title" type="text"></textarea>
          <ul>
                  <li v-for="(todo, idx) in list" :key="id+idx">
                  <input v-model="todo.txt" type="text">
                  <span @click="removeTodo(idx)" title="delete">X</span>
                  </li>
          </ul>
          </span>
            <span v-else>
            <h4>{{title}}</h4>
            <ul>
                <li v-for="(todo, idx) in list" :key="id+idx">
                    {{todo.txt}}
                </li>
            </ul>
           </span>
`,
    data() {
        return {
            title: this.note.info.title,
            list: this.note.info.todos,
            id: this.note.id,
        }
    },
    methods: {
        toggleTodo(idx) {
            this.list[idx].doneAt = this.list[idx].doneAt ? null : Date.now()
            notesService.update(this.note)
                .then(() => eventBus.emit('reload'))
        },
        removeTodo(idx) {
            this.note.info.todos.splice(idx, 1)
            notesService.update(this.note)
                .then(() => eventBus.emit('reload'))
        },
    },


}