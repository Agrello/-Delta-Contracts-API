<template>
  <div class="contract">
    <div class="container">
      <div class="row">
        <div class="column">
          <div class="contract-body">
            <div v-html="contract.content">
              {{contract.content}}
            </div>
            <div class="confirm-box">
              <input
                class="float-left"
                id="checkbox0"
                type="checkbox"
                v-model="checked"
                v-on:change="toggleToolbox(checked)"
              />
              <label for="checkbox0">
                I agree that all information is correct
              </label>
            </div>
            <transition name="slideInDown">
              <toolbox
                formProp="signToolPicked"
                v-if="checked">
              </toolbox>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbox from './Toolbox'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'contract',
  created () {
    this.$store.dispatch('getContract')
  },
  computed: {
    ...mapState([
      'formData',
      'contract'
    ]),
    checked: {
      get () {
        return this.formData.isContractChecked
      },
      set (value) {
        this.updateFormData({isContractChecked: value})
      }
    }
  },
  components: {
    'toolbox': Toolbox
  },
  methods: {
    ...mapActions([
      'updateFormData'
    ]),
    toggleToolbox (checked) {
      !checked && this.updateFormData({signToolPicked: ''})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .contract-body
    @media (max-width: 40.0rem)
      font-size: 1.2rem
    p
      color: $font-color-text
      font-size: 1.5rem
      font-family: $text-area-font
  // Confirm box styles
  .confirm-box
    background-color: $color-confirm
    padding: 2rem
    border-radius: 1rem
    margin-bottom: 1rem
    input:after
      background-color: white
      top: -10px
    label
      font-weight: 300
      padding-left: 4rem
  .slideInDown-enter-active
    animation: slideInDown .35s
  @keyframes slideInDown
    from
      opacity: 0
      transform: translate3d(0, -80%, 0)
      visibility: visible
    to
      opacity: 1
      transform: translate3d(0, 0, 0)
</style>
