<template>
  <div class="hash-box">
    <h5 class="mb-sm">{{title}}</h5>
    <p class="hash">{{hashcode}}</p>
  </div>
</template>

<script>
export default {
  name: 'hashbox',
  props: {
    hashcode: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: 'Title'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .hash
    background-color: $color-tertiary
    padding: 2rem
    border-radius: $app-radius
    word-wrap: break-word
    font-size: 1.5rem
    font-weight: 400
    color: $hash-font-color
</style>
