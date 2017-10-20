<template>
  <div class="contractor">
    <h3 class="mb">Contractor</h3>
    <avatar :userName="contractor.company_name"></avatar>
    <div class="contractor-data mb">
      <h4>{{contractor.company_name}}</h4>
      <h6>{{contractor.company_type}}</h6>
      <h6>{{identityContractor.email}}</h6>
    </div>
    <hashbox
      :hashcode="encrypted.contractorSign"
      :title="title"
      class="hash-size">
    </hashbox>
    <div class="contractor-address">
      <h5 class="mt">Address</h5>
      <h6>{{identityContractor.address_street}}</h6>
      <h6>{{identityContractor.address_city + ' ' + identityContractor.address_zip}}</h6>
      <h6>{{identityContractor.address_region + ' ' + identityContractor.address_country}}</h6>
    </div>
    <div class="contractor-docs">
      <h5 class="mt">Business card</h5>
      <h6>{{'Reg. nr.:' + ' ' + identityContractor.personal_doc_number}}</h6>
      <h6>{{'VAT nr.:' + ' ' + contractor.company_vat_number}}</h6>
      <h6>{{'Recidence:' + ' ' + identityContractor.residence}}</h6>
    </div>
  </div>
</template>

<script>
import Hashbox from './Hashbox'
import Avatar from './Avatar'
import { mapState } from 'vuex'
export default {
  name: 'contractor',
  data (props) {
    return {
      title: 'Hash of Customer\'s data'
    }
  },
  computed: mapState([
    'contractor',
    'encrypted',
    'identityContractor'
  ]),
  components: {
    'hashbox': Hashbox,
    'avatar': Avatar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .contractor h3
    font-family: $sub-title-font
    font-size: 2.5rem
  .contractor-data
    display: block
    padding-top: 3rem
    h4
      display: inline
      font-weight: 600
      color: $font-color-text
  .contractor-data,
  .contractor-docs,
  .contractor-address
    padding-bottom: 1rem
    word-wrap: break-word
    h6
      font-weight: 300
      margin: .6rem
      color: $color-userdata
  .hash-size
    max-width: 30rem
    margin: 0 auto
</style>
