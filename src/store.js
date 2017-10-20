/**
 * Created by Администратор on 13.09.2017.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import Crypto from 'crypto'

Vue.use(Vuex)

const formDataInitialState = {
  isTermsChecked: false,
  certToolPicked: '',
  isContractChecked: false,
  signToolPicked: '',
  isEncryptedMsgValid: false,
  isPassPhraseValid: false,
  passphrase: '',
  contractPassphrase: ''
}

export const store = new Vuex.Store({
  state: {
    testData: {},
    apiUrl: window.agrelloApi.url,
    formData: formDataInitialState,
    step: 1,
    isSpinnerShown: false,
    user: window.agrelloApi.user,
    contractor: window.agrelloApi.contractor,
    contract: window.agrelloApi.contract,
    identity: window.agrelloApi.identity,
    certificate: window.agrelloApi.certificate,
    termsAndConditionsId: 1,
    customerIdent: {
      status: true,
      msg: 'Digital Identity creating...'
    },
    error: {
      isShown: false,
      msg: 'The server has not found anything matching the Request'
    },
    storage: [
      {
        title: 'Smart Contract',
        description: 'Powered by Agrello',
        termsAndConditionsText: null
      },
      {
        title: 'Profile information',
        description: 'Please check if your information is correct' },
      {
        title: 'DI Certificate generation',
        description: 'Please confirm your DI signature generation'
      },
      {
        title: 'Party Details',
        description: 'Please check if your information is correct'
      },
      {
        title: 'Contract',
        description: 'Please view the contract below'
      },
      {
        title: 'Contract signing',
        description: 'Please sign Contract view your Digital Signature'
      },
      {
        title: 'Congratulations',
        description: 'Your smart contract is Signed'
      }
    ],
    encrypted: {
      customerSign: 'JKDJFD9898F09090FKDLKF',
      contractorSign: 'R0YrQUljelVqZnMvcTdTN21wSHdkQT09',
      contractHash: '65RFSD567GGWRTYYH40HUREFFC1FFTR65RFSD567GGWRTYYH40HUREFFC1FFTR65RFSD567GGWRTYYH40HUREFFC1FFTR65RFSD567GGWRTYYH40HUREFFC1FFTR',
      customerSalt: 'W59485948JKDJFD9898F09090FKDLKF',
      contractSalt: 'W59485948JKDJFD9898F09090FKDLKF'
    }
  },
  mutations: {
    setTermsAndConditions (state, data) {
      Vue.set(state.storage[0], 'termsAndConditionsText', data.entity.content_text)
    },
    setUser (state, data) {
      Vue.set(state.user, 'id', data.entity.id)
    },
    spinnerShow (state) {
      state.isSpinnerShown = true
    },
    spinnerHide (state) {
      state.isSpinnerShown = false
    },
    setTestData (state, payload) {
      state.testData = payload
    },
    incrementStep (state) {
      state.step = state.step + 1
    },
    decrementStep (state) {
      state.step = state.step - 1
    },
    resetStep (state) {
      state.step = 1
    },
    updateFormData (state, payload) {
      state.formData = {
        ...state.formData,
        ...payload
      }
    },
    clearFormData (state) {
      state.formData = formDataInitialState
    },
    showError (state) {
      state.error.isShown = true
    },
    closeError (state) {
      state.error.isShown = false
    },
    setIdentity (state, data) {
      Object.assign(state.identity, data.entity)
      this.state.contract.loanProvider = this.state.identity.id
      this.state.contract.loanReceiver = this.state.contractor.id
    },
    setIdentityContractor (state, data) {
      state.identityContractor = data.entity
    },
    setContract (state, data) {
      Object.assign(state.contract, data.entity)
    },
    setPublicKey (state, data) {
      state.publicKey = data.entity.public_key
    },
    setCertificate (state, data) {
      Object.assign(state.certificate, data.entity)
    },
    signContract (state, data) {
      state.signContract = data.entity
    },
    signContractor (state, data) {
      state.signContractor = data.entity
    },
    setPassphrase (state, data) {
      state.formData.passphrase = data
    },
    setContractPassphrase (state, data) {
      state.formData.contractPassphrase = data
    }
  },
  actions: {
    decrementStep ({commit}) {
      commit('decrementStep')
    },
    incrementStep ({commit}) {
      commit('incrementStep')
    },
    resetStep ({commit}) {
      commit('resetStep')
    },
    updateFormData ({commit}, payload) {
      commit('updateFormData', payload)
    },
    clearFormData ({commit}) {
      commit('clearFormData')
    },
    showError ({commit}) {
      commit('showError')
    },
    closeError ({commit}) {
      commit('closeError')
    },
    dummyAction ({commit}) {
      let dummyData = {user: 'Marina', id: 123}
      commit('spinnerShow')
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(dummyData)
          // reject()
        }, 4000)
      })
      promise.then(response => {
        commit('incrementStep')
        commit('spinnerHide')
        commit('setTestData', response)
      }).catch(error => {
        console.log(error)
        commit('spinnerHide')
        commit('showError')
      })
    },
    getTermsAndConditions (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/terms-and-conditions/' + this.state.termsAndConditionsId
      })).then(function (response) {
        context.commit('setTermsAndConditions', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    setApprovingTermsAndConditions (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/terms-and-conditions/' + this.state.termsAndConditionsId + '/approvals',
        data: {user_id: this.state.user.id},
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    /**
     * @param Object $data | first_name , last_name, email
     */
    createUser (context) {
      context.commit('spinnerShow')
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/users/',
        data: this.state.user,
        method: 'POST'
      })).then(function (response) {
        context.commit('spinnerHide')
        context.commit('setUser', response.data)
      }).catch(function (error) {
        context.commit('spinnerHide')
        console.log(error)
      })
    },
    getIdentity (context, identityId) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/identities/' + (identityId || this.state.identity.id),
        method: 'GET'
      })).then(function (response) {
        console.log(response.data)
        if (identityId) {
          context.commit('setIdentityContractor', response.data)
        } else {
          context.commit('setIdentity', response.data)
          context.commit('incrementStep')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    createIdentity (context, action) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/users/' + this.state.user.id + '/identities/',
        data: this.state.user,
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
        context.commit('setIdentity', response.data)
        action()
      }).catch(function (error) {
        console.log(error)
      })
    },
    createContract (context) {
      this.state.contract.variables = JSON.stringify(this.state.contract.variables)
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/contracts/',
        data: this.state.contract,
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
        context.commit('setContract', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getContract (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/contracts/' + this.state.contract.id
      })).then(function (response) {
        console.log(response.data)
        context.commit('setContract', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getPublicKey (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/certificates/1'
      })).then(function (response) {
        console.log(response.data)
        context.commit('setPublicKey', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    createCertificate (context, action) {
      var encryptedMessage = this.state.formData.passphrase
      if (this.state.formData.certToolPicked === 'online') {
        var publicKey = {key: this.state.publicKey, padding: Crypto.constants.RSA_PKCS1_PADDING}
        encryptedMessage = Crypto.publicEncrypt(publicKey, Buffer(this.state.formData.passphrase)).toString('base64')
      }
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/users/' + this.state.user.id + '/identities/' + this.state.identity.id + '/certificates',
        data: {
          encrypted_message: encryptedMessage
        },
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
        context.commit('spinnerShow')
        context.commit('setCertificate', response.data)
        action()
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCertificate (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/users/' + this.state.user.id + '/identities/' + this.state.identity.id + '/certificates/' + this.state.certificate.id
      })).then(function (response) {
        console.log(response.data)
        if (!response.data.entity.status) {
          setTimeout(() => {
            context.dispatch('getCertificate')
          }, 2000)
        } else if (response.data.entity.status === 2) {
          context.commit('spinnerHide')
          context.state.error.msg = 'Сertificate creation error'
          context.commit('showError')
        } else {
          context.commit('spinnerHide')
          context.commit('incrementStep')
          context.commit('setCertificate', response.data)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    signContract (context) {
      var encryptedMessage = this.state.formData.contractPassphrase
      if (this.state.formData.certToolPicked === 'online') {
        var publicKey = {key: this.state.publicKey, padding: Crypto.constants.RSA_PKCS1_PADDING}
        encryptedMessage = Crypto.publicEncrypt(publicKey, Buffer(JSON.stringify({contractHash: this.state.contract.hash, passPhrase: this.state.formData.contractPassphrase}))).toString('base64')
      }
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/contracts/' + this.state.contract.id + '/identities/' + this.state.identity.id,
        data: {
          encrypted_message: encryptedMessage,
          total_contract_hash: this.state.contract.hash
        },
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
        context.commit('signContract', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    signContractor (context) {
      axios.post(this.state.apiUrl, qs.stringify({
        url: '/contracts/' + this.state.contract.id + '/identities/' + this.state.contractor.identityId,
        data: {
          total_contract_hash: this.state.contract.hash
        },
        method: 'POST'
      })).then(function (response) {
        console.log(response.data)
        context.commit('signContractor', response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    setPassphrase (context, data) {
      context.commit('setPassphrase', data)
    },
    setContractPassphrase (context, data) {
      context.commit('setContractPassphrase', data)
    }
  }
})
