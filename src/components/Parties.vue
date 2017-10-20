<template>
  <div class="parties">
    <div class="container">
      <div class="row row-apple text-center">
        <div class="column">
          <user></user>
        </div>
        <div class="column">
          <contractor></contractor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User'
import Contractor from './Contractor'
export default {
  name: 'parties',
  components: {
    'user': User,
    'contractor': Contractor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .user
  .contractor
    margin-left: 3rem
    @media (max-width: 60.0rem)
      margin-left: 0
  .contractor
    @media (max-width: 60.0rem)
      margin-top: 4rem
</style>
