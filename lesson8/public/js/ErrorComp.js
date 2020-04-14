Vue.component('error', {
    data(){
        return {
          text: ''
        }
    },
    computed: {
      isVisible(){
          return this.text !== ''
      }
    },
    template: `
      <div class="error-block" v-if="isVisible">
          <p class="error-msg">
          {{ text }}
          </p>
      </div> 
    `
})