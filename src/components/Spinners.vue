<template>
  <div class="spinner">
    <transition name="slideInUp">
      <div class="spinner-overlay" v-show="isSpinnerShown"></div>
    </transition>
    <div class="spinner-wrap text-center" v-show="isSpinnerShown">
      <img class="spinner-body" src="../assets/wavy_loader.svg">
      <h4 v-if="customerIdent.status">{{customerIdent.msg}}</h4>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState([
      'customerIdent',
      'isSpinnerShown'
    ])
  }
</script>


<style lang="sass">
  $spinner-size: 10rem

  .spinner-overlay
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    height: 100%
    width: 100%
    z-index: 2
    background-color: $color-primary
  .slideInUp-enter-active
    animation: slideInUp .5s ease-in-out
  .slideInUp-leave-active
    animation: slideInUp .5s ease-out reverse
  @keyframes slideInUp 
    from 
      transform: translate3d(0, -100%, 0)
      visibility: visible
    to 
      transform: translate3d(0, 0, 0)
  .spinner-wrap
    position: absolute
    top: 30%
    width: 100%
    z-index: 5
    h4
      color: white
  .spinner-body
    height: $spinner-size
    width: $spinner-size
    margin: 5rem
    margin-top: $inner-spacer + $spinner-size/2 + 1rem
</style>
