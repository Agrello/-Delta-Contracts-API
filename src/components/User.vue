<template>
  <div class="user">
    <h3 v-if="step == 4" class="mb">Customer</h3>
    <avatar :userName="identity.first_name"></avatar>
    <div class="user-data mb">
      <h4>{{fullName}}</h4>
      <h6>{{identity.sex}}</h6>
      <h6>{{identity.email}}</h6>
    </div>
    <hashbox
      v-if="step == 4"
      :hashcode="identity.hash"
      :title="title"
      class="hash-size">
    </hashbox>
    <div class="user-address">
      <h5 class="mt">Address</h5>
      <h6>{{identity.address_street}}</h6>
      <h6>{{identity.address_city + ' ' + identity.address_zip}}</h6>
      <h6>{{identity.address_region + ' ' + identity.address_country}}</h6>
    </div>
    <div class="user-docs">
      <h5 class="mt">Document</h5>
      <h6>{{'Nr.:' + ' ' + identity.personal_doc_number}}</h6>
      <h6>{{'Expire date:' + ' ' + identity.personal_doc_expire_date}}</h6>
      <h6>{{'Recidence:' + ' ' + identity.residence}}</h6>
    </div>
  </div>
</template>

<script>
import Hashbox from './Hashbox'
import Avatar from './Avatar'
import { mapState } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      title: 'Hash of Customer\'s data'
    }
  },
  computed: {
    ...mapState([
      'step',
      'user',
      'encrypted',
      'identity'
    ]),
    fullName () {
      return `${this.user.first_name} ${this.user.middle_name} ${this.user.last_name}`
    }
  },
  components: {
    'hashbox': Hashbox,
    'avatar': Avatar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .user h3
    font-family: $sub-title-font
    font-size: 2.5rem
  .user-data
    display: block
    padding-top: 3rem
    h4
      display: inline
      font-weight: 600
      color: $font-color-text
  .user-data,
  .user-docs,
  .user-address
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
