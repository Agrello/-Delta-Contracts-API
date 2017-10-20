<template>
  <div class="signature">
    <div v-if="isOnline" class="sign-online">
      <div class="container">
        <div class="row">
          <div class="column">
            <div class="sign-title-wrap">
              <h4 class="text-center mb-lg">Please enter below you passphrase for signing Smart-Contract with your DI Certificate</h4>
              <hr/>
            </div>
            <label class="text-left mb-sm" for="enterPass">Enter Passphrase</label>
            <input v-bind:class="confirm" type="password" id="enterPass" v-model="password" v-on:change="passphrase">
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sign-offline">
      <div class="container">
        <div class="row">
          <div class="column">
            <div class="sign-title-wrap">
              <h4 class="text-center mb-lg">Please download this tool for for signing Smart-Contract with your DI Certificate, it can be used in offline mode</h4>
              <div class="text-center">
                <button class="button button-download text-center">Download offline tool</button>
              </div>
              <hr/>
            </div>
            <hashbox
              :title="titleHash"
              :hashcode="identity.hash">
            </hashbox>
            <label class="text-left mb-sm" for="enterMsg">Enter Encrypted Messsage</label>
            <textarea type="text" id="enterMsg" name="message" v-model="encryptedMessageContract" v-on:keyup="passphrase"></textarea>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Hashbox from './Hashbox'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'signature',
  data () {
    return {
      titleHash: 'Contract Hash',
      password: '',
      encryptedMessageContract: ''
    }
  },
  computed: {
    ...mapState([
      'formData',
      'encrypted',
      'identity',
      'error'
    ]),
    isOnline () {
      return this.formData.signToolPicked === 'online'
    },
    confirm () {
      var errClass = ''
      if (this.password.length) {
        if (this.formData.passphrase === this.password) {
          this.formData.isPassPhraseValid = true
          this.closeError()
        } else {
          errClass = 'wrong'
          this.formData.isPassPhraseValid = false
          this.error.msg = 'Your passphrases don\'t match'
          this.showError()
        }
        return errClass
      }
    }
  },
  methods: {
    ...mapActions([
      'setContractPassphrase',
      'showError',
      'closeError'
    ]),
    passphrase () {
      this.setContractPassphrase(this.password || this.encryptedMessageContract)
    }
  },
  components: {
    'hashbox': Hashbox
  },
  created () {
    this.formData.isPassPhraseValid = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .sign-online,
  .sign-offline
    label
      font-size: 1.6rem
      font-weight: 200
      position: relative
      font-family: $sub-title-font
</style>
