import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    form:{}
}

const mutations = {
    UPDATE_FORM(state, id, value) {
        state.form[id] = value
    },
    INIT_FORM(state, data) {
        state.form = data
    }
}

export default new Vuex.Store({
    state,
    mutations
})