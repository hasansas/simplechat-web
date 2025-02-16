import HttpRequest from '~/helpers/http_request.js';
import { httpResponse } from '~/helpers/http_response.js';
import Convert from '~/helpers/convert.js'
import { UserModel } from './model'

const Cookie = process.client ? require('js-cookie') : 'undefined'
const jwt = require('jsonwebtoken')

export default {
  async auth({ }, { sdkKey }) {
    const vm = this
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/chats/auth'
      const _body = { sdkKey }

      httpRequest.post(_url, _body).then(async (res) => {
        return resolve(res)
      })
    })
  },
  async sendMessage({ }, { key, body }) {
    const httpRequest = new HttpRequest(this.$axios);
    return new Promise(function (resolve) {
      const _url = '/v1/chats/message/send'
      const _body = body
      const _headers = [
        { name: 'sdk-key', value: key }
      ];

      httpRequest.post(_url, _body, _headers).then(async (res) => {
        return resolve(res)
      })
    })
  },
};

