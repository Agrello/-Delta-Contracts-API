<template>
  <div class="legal">
    <div class="container">
      <div class="row">
        <div class="column">
          <div class="contract-svg">
            <img class="resize-svg" src="../assets/agrello_contract.svg">
          </div>
          <textarea 
            class="textarea-confirm" 
            readonly>{{storage[0].termsAndConditionsText}}
          </textarea>
          <div class="confirm-field-wrap">
            <div class="checkbox">
              <input 
                class="float-left" 
                id="checkbox0" 
                type="checkbox"
                v-model="checked"
                v-on:change="setAgreement(checked)"
              />
              <label for="checkbox0">Agree with Terms & Conditions</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'legal',
    computed: {
      ...mapState([
        'storage',
        'formData'
      ]),
      checked: {
        get () {
          return this.formData.isTermsChecked
        },
        set (value) {
          this.updateFormData({isTermsChecked: value})
        }
      }
    },
    methods: {
      ...mapActions([
        'setApprovingTermsAndConditions',
        'updateFormData'
      ]),
      setAgreement () {
        this.setApprovingTermsAndConditions()
      }
    }
  }
</script>

<style lang="sass">
  .legal
    position: relative
    widht: 100%
    height: 100%
    min-height: 300px
  .textarea-confirm
    min-height: 15rem
    color: $font-color-text
    font-size: 1.5rem
    font-family: $text-area-font
    width: 100%
    @media (max-width: 50.0rem)
      min-height: 20rem
  .contract-svg
    text-align: center
    padding: 2rem
    max-height: 50rem
    margin-bottom: $inner-spacer
    @media (max-width: 50.0rem)
      display: none
      padding: 0
    .resize-svg
      max-width: 100%
      max-height: 260px
      margin-top: -$inner-spacer + 1rem
      @media (max-width: 50.0rem)
        max-height: 180px
  .confirm-field-wrap
    padding: 0
    label
      font-weight: 300
      padding-left: 4rem
</style>
