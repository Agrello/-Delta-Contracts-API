<template>
  <div class="profile">
    <div class="container">
      <div class="row text-center">
        <div class="column">
          <user></user>
          <hr>
          <h4 class="message text-center mb-lg">Please select the way of Digital Identity Certificate generation, based on your personal information:</h4>
          <toolbox formProp="certToolPicked"></toolbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User'
import Toolbox from './Toolbox'
import { mapState } from 'vuex'
export default {
  name: 'profile',
  computed: mapState([
    'user'
  ]),
  components: {
    'user': User,
    'toolbox': Toolbox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

</style>
