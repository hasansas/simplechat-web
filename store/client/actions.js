import HttpRequest from '~/helpers/http_request.js';
import { httpResponse } from '~/helpers/http_response.js';
import { ClientModel, ClientConfigurationModel } from "./model.js";

export default {
  get({ }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/clients/me';
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.get(_url, _headers).then(function (res) {
        resolve(res);
      });
    });
  },
  show({ commit }, { id }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/clients/' + id;
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.get(_url, _headers).then(async function (res) {
        if (!res.success) {
          return resolve(res);
        }

        const _data = res.data.data;

        // set state configuration
        const clientModel = ClientModel()
        const items = await clientModel.fromJson(_data);

        commit("setClient", { items });

        const response = httpResponse({
          success: true,
          statusCode: 200,
          data: items,
        });

        // set response
        resolve(response);
      });
    });
  },
  async getConfiguration({ commit }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/clients/config';
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.get(_url, _headers).then(async function (res) {
        if (!res.success) {
          return resolve(res);
        }

        const _data = res.data.data.rows;
        const _pagination = res.data.data.pagination;
        const rows = _data.rows;

        // set state configuration
        const clientConfigurationModel = ClientConfigurationModel()
        const items = await clientConfigurationModel.fromJson(rows);

        commit("setConfiguration", { items });

        const response = httpResponse({
          success: true,
          statusCode: 200,
          data: _data,
          pagination: _pagination,
        });

        // set response
        resolve(response);
      });
    });
  },
  updateConfiguration({ commit }, { body }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/clients/config';
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];
      const _body = body;

      httpRequest.put(_url, _body, _headers).then(async function (res) {
        if (!res.success) {
          return resolve(res);
        }

        // set state configuration
        const clientConfigurationModel = ClientConfigurationModel()
        const items = await clientConfigurationModel.fromJson(body);

        commit("setConfiguration", { items });

        const response = httpResponse({
          success: true,
          statusCode: 200,
        });

        // set response
        resolve(response);
      });
    });
  },
  getNotifications({ }, { params }) {
    const authUser = this.getters['users/auth'];
    const httpRequest = new HttpRequest(this.$axios);

    return new Promise(function (resolve) {
      const _params = params ? '?' + params : '';
      const _url = '/v1/clients/notifications' + _params;
      const _headers = [
        { name: 'Authorization', value: 'Bearer ' + authUser.token }
      ];

      httpRequest.get(_url, _headers).then(function (res) {
        if (!res.success) {
          return resolve(res);
        }

        const _data = res.data.data.rows;
        const _pagination = res.data.data.pagination;

        const response = httpResponse({
          success: true,
          statusCode: 200,
          data: _data,
          pagination: _pagination,
        });

        // set response
        resolve(response);
      });
    });
  },
};

