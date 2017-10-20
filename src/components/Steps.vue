<template>
  <div>
    <!-- step 1: terms and conditions -->
    <legal v-if="step == 1"></legal>
    <!-- step 2: profile view -->
    <profile v-if="step == 2"></profile>
    <!-- step 3: certificate creation -->
    <certificate v-if="step == 3"></certificate>
    <!-- step 4: parties of the contract -->
    <parties v-if="step == 4"></parties>
    <!-- step 5: contract view -->
    <contract v-if="step == 5"></contract>
    <!-- step 6: sign a contract -->
    <signature v-if="step == 6"></signature>
    <!-- step 7: success scenario -->
    <success v-if="step == 7"></success>
  </div>
</template>

<script>
import Legal from './Legal'
import Parties from './Parties'
import Profile from './Profile'
import Certificate from './Certificate'
import Contract from './Contract'
import Signature from './Signature'
import Success from './Success'

import { mapState } from 'vuex'
export default {
  name: 'steps',
  components: {
    'legal': Legal,
    'parties': Parties,
    'profile': Profile,
    'certificate': Certificate,
    'contract': Contract,
    'signature': Signature,
    'success': Success
  },
  computed: mapState([
    'step'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass"></style>
