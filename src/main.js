import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueCytoscape from 'vue-cytoscape'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueCytoscape)


const store = new Vuex.Store({
  state: {
    uploadId: null,
    currentTab: "main-view",
    urlBase: "http://127.0.0.1:5000"
  },
  mutations: {
    newId (state, newId) {
      state.uploadId = newId
    },
    changeTab (state, newTab) {
      state.currentTab = newTab
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
