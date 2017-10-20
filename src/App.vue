<template>
  <div id="app" :class="activeModeClass">
    <top></top>
    <section v-on:scroll="detectScroll">
      <steps></steps>
    </section>
    <spinners></spinners>
    <bottom :class="shadowOnClass"></bottom>
  </div>
</template>

<script>
import { Top, Steps, Spinners, Bottom } from './components'
import { mapState } from 'vuex'
import { debounce } from './utils/helpers'
export default {
  name: 'app',
  data () {
    return {
      isScrolling: false
    }
  },
  computed: {
    ...mapState([
      'storage',
      'step',
      'isSpinnerShown'
    ]),
    isWhiteMode () {
      return [2, 3, 4, 5, 6, 7].indexOf(this.step) !== -1
    },
    isBlueMode () {
      return this.step === 1
    },
    isSpinnerMode () {
      return this.isSpinnerShown
    },
    activeModeClass () {
      return (this.isBlueMode && 'blueMode') || (this.isSpinnerMode && 'spinnerMode') || (this.isWhiteMode && 'whiteMode')
    },
    shadowOnClass () {
      return !this.isScrolling && this.step !== 1 ? 'shadow-on' : ''
    }
  },
  components: {
    'top': Top,
    'steps': Steps,
    'spinners': Spinners,
    'bottom': Bottom
  },
  methods: {
    detectScroll (e) {
      if (!this.isScrolling) {
        this.isScrolling = true
      }
      let debounced = debounce(this.setScrollOff, 1000)
      debounced()
    },
    setScrollOff () {
      if (this.isScrolling) {
        this.isScrolling = false
      }
    }
  },
  created () {
    this.$store.dispatch('createUser')
    this.$store.dispatch('getTermsAndConditions')
  }
}
</script>

<style lang="sass">
  @import "sass/milligram"

  // Alignment settings
  #app
    position: relative
    width: 100%
    height: 100%
    margin: 0 auto
    border-radius: $app-radius
    overflow: hidden
    header
      position: relative
      top: 0px
      z-index: 4
      height: 14rem
      width: 100%
    section
      overflow-y: auto
      position: relative
      height: calc(100% - 14rem - 13rem)
      width: 100%
      padding: $inner-spacer
    footer
      position: absolute
      bottom: 0
      left: 0
      z-index: 1
      height: 9rem + $inner-spacer
      width: 100%

  // Mode settings
  .blueMode
    color: $color-initial
    background-color: $color-primary
    border-radius: $app-radius
    box-shadow: none
    background-image: url("./assets/background.jpg")
    background-origin: content-box
    background-position: bottom center
    background-size: contain
    background-repeat: repeat-x
  .whiteMode
    box-shadow: inset 0px 0px 0px 1px lighten($color-separator, 6)
    border-radius: $app-radius
  .spinnerMode
    background-color: transparent
  .shadow-on
    box-shadow: 0px -20px 40px -40px rgba(0,0,0,0.7)
</style>
