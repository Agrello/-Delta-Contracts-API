<template>
  <div class="tool-box text-center">
    <div class="container">
      <div class="row row-apple">
        <div class="column">
          <div class="online-wrap">
            <input
              type="radio"
              name="tool"
              id="toolOnline"
              value="online"
              v-model="picked">
            <label class="label-inline" for="toolOnline">Use Online tool</label>
          </div>
        </div>
        <div class="column">
          <div class="offline-wrap">
            <input
              type="radio"
              name="tool"
              id="toolOffline"
              value="offline"
              v-model="picked">
            <label class="label-inline" for="toolOffline">Use Offline tool</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'toolbox',
  props: {
    formProp: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'formData'
    ]),
    picked: {
      get () {
        return this.formData[this.formProp]
      },
      set (value) {
        this.updateFormData({[this.formProp]: value})
      }
    }
  },
  methods: {
    ...mapActions([
      'updateFormData'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .tool-box
    position: relative
    background-color: $color-confirm
    border-radius: $app-radius
    padding: 3rem 3rem 1rem 3rem
    label
      font-size: 1.6rem
      font-family: $sub-title-font
  .online-wrap,
  .offline-wrap
    padding-bottom: 1.7rem
</style>
