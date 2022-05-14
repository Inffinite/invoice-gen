import Vue from 'vue'
import Vuex from 'vuex'
import Invoice from './Invoice.js'
import Data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    Invoice,
    Data
  }
})