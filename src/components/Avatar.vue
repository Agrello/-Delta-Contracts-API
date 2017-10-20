<template>
  <div class="avatar">
    <h1>{{firstSign}}</h1>
    <img :src="imageSrc"/>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  data (props) {
    return {
      firstSign: this.userName.slice(0, 1),
      imageSrc: ''
    }
  },
  methods: {
    drawArray (arr, depth) {
      let offset, height, data
      function conv (size) {
        return String.fromCharCode(size & 0xff, (size >> 8) & 0xff, (size >> 16) & 0xff, (size >> 24) & 0xff)
      }
      offset = depth <= 8 ? 54 + Math.pow(2, depth) * 4 : 54
      height = Math.ceil(Math.sqrt(arr.length * 1 / depth))
      data = 'BM'
      data += conv(offset + arr.length)
      data += conv(0)
      data += conv(offset)
      data += conv(40)
      data += conv(height)
      data += conv(height)
      data += String.fromCharCode(1, 0)
      data += String.fromCharCode(depth, 0)
      data += conv(0)
      data += conv(arr.length)
      data += conv(2835)
      data += conv(2835)
      data += conv(0)
      data += conv(0)
      if (depth <= 8) {
        data += conv(0)
        for (let s = Math.floor(255 / (Math.pow(2, depth) - 1)), i = s; i < 256; i += s) {
          data += conv(i + i * 256 + i * 65536)
        }
      }
      data += String.fromCharCode.apply(String, arr)
      this.imageSrc = 'data:image/bmp;base64,' + btoa(data)
    },
    generateArr () {
      let arr = []
      for (let i = 0; i < 600; i++) {
        arr[i] = Math.floor(Math.random() * 5)
      }
      return arr
    }
  },
  created () {
    this.drawArray(this.generateArr(), 16)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .avatar
    position: relative
    height: 104px
    width: 104px
    background-color: $color-primary
    margin: 0 auto
    border-radius: 50%
    display: flex
    justify-content: center
    align-items: center
    z-index: -2
    h1
      margin: 0
      color: #FFFFFF
    img
      display: block
      width: 100%
      height: 100%
      left: 0
      position: absolute
      z-index: -1
      border-radius: 50%
      image-rendering: -webkit-optimize-contrast
      image-rendering: -moz-crisp-edges
      image-rendering: pixelated
      opacity: 0.1
</style>
