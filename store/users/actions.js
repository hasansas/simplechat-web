import HttpRequest from '~/helpers/http_request.js';
import { httpResponse } from '~/helpers/http_response.js';
import Convert from '~/helpers/convert.js'
import { UserModel } from './model'

const Cookie = process.client ? require('js-cookie') : 'undefined'
const jwt = require('jsonwebtoken')

export default {
  async register({ }, { input }) {
    const vm = this
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/users/register'
      const _body = {
        name: input.name,
        email: input.email,
        waNumber: input.waNumber,
        countryCode: input.countryCode,
        password: input.password
      }

      // registering user
      httpRequest.post(_url, _body).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        // get response data
        const resData = res.data.data

        // set response
        resolve(
          httpResponse({
            success: true,
            statusCode: 200,
            data: resData
          })
        );
      })
    })
  },
  async confirmRegistration({ }, { input }) {
    const vm = this
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/users/register/confirm'
      const _body = {
        email: input.email,
        code: input.code
      }

      // registering user
      httpRequest.post(_url, _body).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      })
    })
  },
  async login({ commit }, { input }) {
    const vm = this
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/auth/login/client'
      const _body = {
        password: Convert.stringToHex(input.password),
        email: input.email
      }

      // perform login
      httpRequest.post(_url, _body).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        // Save to state
        const resData = res.data.data
        const authUser = {
          token: resData.token,
          authenticated: true
        }
        commit('setAuthUser', authUser)

        // save to cookie
        const authSessionClientName = process.env.PREFIX_SESSION_NAME
        const hexAuth = Convert.stringToHex(JSON.stringify(authUser))
        Cookie.set(authSessionClientName, JSON.stringify(hexAuth))

        // get user info
        const _headers = [
          { name: 'Authorization', value: 'Bearer ' + resData.token }
        ];

        const _getUser = await httpRequest.get('/v1/auth/me', _headers)
        if (!_getUser.success) {
          Cookie.remove(process.env.PREFIX_SESSION_NAME);
          commit('unsetAuthUser');
        } else {
          const userModel = UserModel()
          const userData = _getUser.data.data
          const item = await userModel.fromJson(userData)
          commit('updateUser', { item })
        }

        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      })
    })
  },
  async logout({ commit }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/auth/logout';
      const _body = {}
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.post(_url, _body, _headers).then(async (res) => {
        if (!res.success) {
          return resolve(res);
        }

        Cookie.remove(process.env.PREFIX_SESSION_NAME);
        commit('unsetAuthUser');

        // set response
        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      });
    });
  },
  async unsetUserSession({ commit }) {
    Cookie.remove(process.env.PREFIX_SESSION_NAME);
    commit('unsetAuthUser');
  },

  async me({ commit }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/auth/me'
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.get(_url, _headers).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        const userModel = UserModel()
        const userData = res.data.data
        const item = await userModel.fromJson(userData)
        commit('updateUser', { item })

        // set response
        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        )
      });
    });
  },
  async update({ commit }, { body }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const input = { ...body }
      if (body.image) {
        input.image = body.image.fileName
      }

      const _url = 'v1/auth/me';
      const _body = input
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.patch(_url, _body, _headers).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        commit('updateUser', { item: body })

        // set response
        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        )
      });
    });
  },
  async changePassword({ }, { input }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = 'v1/auth/password/change';
      const _body = {
        oldPassword: Convert.stringToHex(input.oldPassword),
        newPassword: input.newPassword,
        confirmNewPassword: input.confirmNewPassword
      }

      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.patch(_url, _body, _headers).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      });
    });
  },
  async forgotPassword({ }, { email }) {
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = 'v1/auth/password/forgot';
      const _body = {
        email: email,
        confirmationUrl: `${window.origin}/reset-password`
      }
      httpRequest.post(_url, _body).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      });
    });
  },
  async resetPassword({ }, { code }) {
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = 'v1/auth/password/reset';
      const _body = {
        verificationCode: code,
      }
      httpRequest.post(_url, _body).then(async (res) => {
        if (!res.success) {
          return resolve(res)
        }

        resolve(
          httpResponse({
            success: true,
            statusCode: 200
          })
        );
      });
    });
  }
};

