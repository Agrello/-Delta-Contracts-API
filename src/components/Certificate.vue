<template>
  <div class="certificate">
    <div v-if="isOnline" class="cert-online">
      <div class="container">
        <div class="row">
          <div class="column">
            <div class="cert-title-wrap">
              <h4 class="text-center mb-lg">Please create Passphrase for generation of Digital Identity Certificate, it can be used for sign Smart-Contract</h4>
              <hr/>
            </div>
            <label class="text-left mb-sm" for="enterPass">Enter Passphrase</label>
            <input type="password" id="enterPass" v-model="password" v-on:change="passphrase">
            <label class="text-left mb-sm" for="confirmPass">Confirm Passphrase</label>
            <input v-bind:class="confirm" type="password" id="confirmPass" v-model="passwordConfirm">
          </div>
        </div>
      </div>
    </div>
    <div v-else class="cert-offline">
      <div class="container">
        <div class="row">
          <div class="column">
            <div class="cert-title-wrap">
              <h4 class="text-center mb-lg">Please download this tool for generation Digital Identity Certificate on your device, it can be used in offline mode</h4>
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
            <textarea type="text" id="enterMsg" v-model="encryptedMessage" v-on:keyup="passphrase"></textarea>
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
  name: 'certificate',
  data () {
    return {
      titleHash: 'Customer’s data Hash',
      password: '',
      passwordConfirm: '',
      encryptedMessage: ''
    }
  },
  methods: {
    ...mapActions([
      'setPassphrase',
      'showError',
      'closeError'
    ]),
    passphrase () {
      this.setPassphrase(this.password || this.encryptedMessage)
    }
  },
  computed: {
    ...mapState([
      'formData',
      'encrypted',
      'error',
      'identity'
    ]),
    isOnline () {
      return this.formData.certToolPicked === 'online'
    },
    isOffline () {
      return this.formData.certToolPicked === 'offline'
    },
    confirm () {
      if (this.passwordConfirm.length) {
        var errClass = ''
        if (this.password === this.passwordConfirm) {
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
  components: {
    'hashbox': Hashbox
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .wrong
    border-color: $error-bg !important
</style>
