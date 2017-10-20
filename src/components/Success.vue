<template>
  <div class="success">
    <div class="container">
      <div class="row">
        <div class="column">
          <hashbox
            :hashcode="contract.hash"
            :title="titleContract">
          </hashbox>
          <div class="row row-apple">
            <div class="column">
              <hashbox
                :hashcode="identity.hash"
                :title="titleCustomer">
              </hashbox>
            </div>
            <div class="column">
              <hashbox
                :hashcode="encrypted.contractorSign"
                :title="titleContractor">
              </hashbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hashbox from './Hashbox'
import { mapState } from 'vuex'
export default {
  name: 'success',
  data () {
    return {
      titleContract: 'Contract Hash',
      titleCustomer: 'Customer Hash',
      titleContractor: 'Contractor Hash'
    }
  },
  computed: mapState([
    'encrypted',
    'contract',
    'identity'
  ]),
  components: {
    'hashbox': Hashbox
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .success h5
    margin: 2rem 0
  .hash-box
    padding-right: 2rem
    @media (max-width: 40.0rem)
      padding: 0
</style>
