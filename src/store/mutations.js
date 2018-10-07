import * as types from './mutation-types'

const mutations = {
  [types.SET_ACCESS_TOKEN] (state, v) {
    state.accessToken = v
  },
  [types.SET_USER_NAME] (state, v) {
    state.username = v
  }
}

export default mutations
