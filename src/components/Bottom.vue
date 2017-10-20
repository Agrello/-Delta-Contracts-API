<template>
  <footer>
    <error v-if="error.isShown" :errorMsg="error.msg"></error>
    <div class="container container-custom">
      <div class="row row-custom">
        <div
          v-if="isBackBtnShown"
          class="column column-30 text-left">
          <button
            class="button button-custom"
            @click="goBack">back</button>
        </div>
        <div
          v-if="isCloseBtnShown"
          class="column column-30 text-center">
          <button
            class="button button-custom"
            @click="closeBtn">Close</button>
        </div>
        <div
          v-if="isNextBtnShown"
          class="column column-30 text-right">
          <button
            class="button button-custom"
            @click="goNext"
            :disabled="isNextBtnDisabled">next</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Error from './Error'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bottom',
  components: {
    'error': Error
  },
  computed: {
    ...mapState([
      'error',
      'formData',
      'step'
    ]),
    isBackBtnShown () {
      return [2, 3, 4, 5, 6].indexOf(this.step) !== -1
    },
    isNextBtnShown () {
      return [1, 2, 3, 4, 5, 6].indexOf(this.step) !== -1
    },
    isCloseBtnShown () {
      return this.step === 7
    },
    isNextBtnDisabled () {
      return this.step === 1 && !this.formData.isTermsChecked ||
        this.step === 2 && this.isEmptyRadio(this.formData.certToolPicked) ||
        ((this.step === 3 && !this.formData.isPassPhraseValid && this.formData.certToolPicked === 'online') || (this.step === 3 && this.formData.passphrase === '' && this.formData.certToolPicked === 'offline')) ||
        this.step === 5 && this.isEmptyRadio(this.formData.signToolPicked) ||
        ((this.step === 6 && !this.formData.isPassPhraseValid && this.formData.certToolPicked === 'online') || (this.step === 6 && this.formData.contractPassphrase === '' && this.formData.certToolPicked === 'offline'))
    }
  },
  methods: {
    ...mapActions([
      'dummyAction',
      'incrementStep',
      'decrementStep',
      'resetStep',
      'clearFormData',
      'createIdentity',
      'getIdentity',
      'createContract',
      'getPublicKey',
      'createCertificate',
      'getCertificate',
      'signContract',
      'signContractor'
    ]),
    isEmptyRadio (storeProp) {
      return ['online', 'offline'].indexOf(storeProp) === -1
    },
    goNext () {
      if (this.step === 1) {
        this.createIdentity(this.getIdentity)
        this.getIdentity(4)
      } else if (this.step === 2) {
        this.createContract()
        this.getPublicKey()
        this.incrementStep()
      } else if (this.step === 3) {
        this.createCertificate(this.getCertificate)
      } else if (this.step === 6) {
        this.signContract()
        this.signContractor()
        this.incrementStep()
      } else {
        this.incrementStep()
      }
    },
    goBack () {
      this.decrementStep()
    },
    closeBtn () {
      this.clearFormData()
      this.resetStep()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  footer
    padding: $inner-spacer
</style>
