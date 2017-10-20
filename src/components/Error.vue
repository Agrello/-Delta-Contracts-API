<template>
  <div class="error">
    <div class="container">
      <div class="row text-center">
        <div class="error-msg">
          <a href="#" class="error-exit-btn" @click="closeError">
            <svg viewBox="0 0 668 667" xmlns="http://www.w3.org/2000/svg"><title>Slice 1</title><g transform="translate(1)" fill="none" fill-rule="evenodd"><circle class="error-exit-btn-bg" cx="333.333" cy="333.334" r="333.334"/><path class="error-exit-btn-cross" d="M333.335 375.122l116.022 116.026 41.79-41.789L375.12 333.334l116.026-116.026-41.789-41.789-116.022 116.026-116.026-116.026-41.789 41.789 116.026 116.026L175.52 449.359l41.79 41.79z"/></g></svg>
          </a>
          <p>{{errorMsg}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'error',
  props: {
    errorMsg: {
      type: String,
      required: true,
      default: 'Error'
    }
  },
  methods: {
    ...mapActions([
      'closeError'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .error
    position: inherit
    width: 100%
    left: 0
    right: 0
    bottom: -$inner-spacer + $bottom-height + 1rem
    min-height: 10rem
    padding: 0 $inner-spacer
    z-index: 1000
    .error-msg
      position: relative
      background-color: $error-bg
      border-radius: $app-radius
      width: 100%
      height: inherit
      margin: 1rem
      padding: 2.5rem
      box-shadow: 0px 3px 17px 3px rgba(0,0,0,0.21);
      p
        margin: 0
        word-wrap: break-word
        font-family: $error-font
        font-weight: 200
        color: white
  
  // Close icon styles
  .error-exit-btn
    position: absolute
    right: 5px
    top: 5px
    width: 20px
    height: 20px
    margin: .5rem
    .error-exit-btn-bg
      fill: $color-exit-fill
    .error-exit-btn-cross
      fill: $error-bg
      stroke: $error-bg
      stroke-width: 2.338
</style>
