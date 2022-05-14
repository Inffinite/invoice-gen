import axios from 'axios'

export default {
    state: {
        data: null
    },

    getters: {
        getData(state) {
            return state.data;
        }
    },

    mutations: {
        SET_DATA_STATE(state, datastate) {
            state.data = datastate
        },
    },

    actions: {
        getDataState({ commit }) {
            axios.get(`http://192.168.0.25:3000/documents`)
            .then((res) => {
                console.log(res.data)
                commit('SET_DATA_STATE', res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        },

    }
}