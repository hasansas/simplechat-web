import _ from 'lodash'
import { AuthModel } from './model'

const jwt = require('jsonwebtoken')

export default {
  setAuthUser(state, authUser) {
    const token = authUser.token
    const userId = jwt.decode(token).id
    const userRole = jwt.decode(token).role

    state.authUser.id = userId
    state.authUser.role = userRole
    state.authUser.token = token
    state.authUser.authenticated = authUser.authenticated
  },
  unsetAuthUser(state) {
    state.authUser = AuthModel().model;
  },
  updateUser(state, { item }) {
    const user = state.user
    _.forOwn(user, function (value, key) {
      user[key] = item[key] ?? user[key]
    });
  }
}
