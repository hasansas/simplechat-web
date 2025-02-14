import Convert from '~/helpers/convert.js'
const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const initUser = { authenticated: false }

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const _authSessionClientName = process.env.PREFIX_SESSION_NAME
        // set auth user
        if (typeof parsed[_authSessionClientName] !== 'undefined') {
          const _userSession = parsed[_authSessionClientName].toString().replace(/"/g, '')
          const _authSession = JSON.parse(Convert.hexToString(_userSession))

          commit('users/setAuthUser', _authSession)
        }
      } catch (err) {
        // No valid cookie found
        console.log(err)
      }
    }
  }
}
