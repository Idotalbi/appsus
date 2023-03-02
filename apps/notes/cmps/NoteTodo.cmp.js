export default {
    props: ["todo", "idx"],
    template: `
     <input v-model="currTodo.txt" type="text">
     <span @click="delete" title="delete">X</span>

     `,
    data() {
        return {
            currTodo: this.todo,
            currIdx: this.idx,
        }
    },
    methods: {
        toggleTodo() {
            this.$emit(toggleTodo, currIdx)
        },
        delete() {
            this.$emit('delete', currIdx)
        }
    },
}


