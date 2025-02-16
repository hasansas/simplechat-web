import VuexState from '~/helpers/vuex-state.js'

export default {
  setClient(state, { items }) {
    state.data = items
  },
  setConfiguration(state, { items }) {
    state.configurations = items
  },
};
