
export default {
  props: ['note'],
  template: `
              <textarea v-model="currNote.info.title" type="text"></textarea><br>
              <div class="img-container">
                <img :src="currNote.info.url" alt="">
              </div>
              <h4>{{currNote.info.title}}</h4>
              <img :src="currNote.info.url" alt="">
    `,
  components: {},
  created() {},
  data() {
    return {
      currNote: this.note,
    }
  },
  computed: {},
 
}