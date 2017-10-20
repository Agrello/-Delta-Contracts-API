<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="column">
          <h3 v-if="isSpinnerShown" class="title">Loading...</h3>
          <h3 v-else class="title">{{title}}</h3>
          <h4 v-if="isSpinnerShown"  class="powered-agrello">Please wait</h4>
          <h4 v-else class="powered-agrello">{{description}}</h4>
        </div>
        <div class="column" v-if="showLogo">
          <img class="logo float-right" src="../assets/agrello_logo.svg">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'top',
  data () {
    return {
      showLogo: true
    }
  },
  computed: {
    ...mapState([
      'isSpinnerShown',
      'storage',
      'step'
    ]),
    title () {
      return this.storage[this.step - 1].title
    },
    description () {
      return this.storage[this.step - 1].description
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  // Header styles
  header
    color: $color-initial
    background-color: $color-primary
    border: 1px solid $color-primary
    border-bottom-color: transparent
    border-radius: $app-radius $app-radius 0 0
    padding: $inner-spacer
    h3,h4
      line-height: 3rem
      margin: 0
      padding: 0
    .logo
      height: 6rem
      @media (max-width: 50.0rem)
        display: none
</style>
