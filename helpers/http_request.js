import { httpResponse, response as Response, httpStatusCode } from '~/helpers/http_response.js'

const apiKey = process.env.API_KEY
let response = Response

class HttpRequest {
  constructor(axios) {
    this.axios = axios
  }

  post(url, body, headers) {
    const self = this
    return new Promise(function (resolve) {
      self.axios.defaults.headers.common['x-api-key'] = apiKey
      delete self.axios.defaults.headers.common['Authorization'];
      if (headers) {
        headers.forEach(header => {
          self.axios.defaults.headers.common[header.name] = header.value
        })
      }
      self.axios.post(url, body)
        .then(async res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          })
          resolve(response)
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused })
            return resolve(response)
          }
          response = httpResponse({ statusCode: error.response.status, data: error.response.data })
          resolve(response)
        })
    })
  }

  get(url, headers) {
    const self = this
    return new Promise(function (resolve) {
      self.axios.defaults.headers.common['x-api-key'] = apiKey
      delete self.axios.defaults.headers.common['Authorization'];
      if (headers) {
        headers.forEach(header => {
          self.axios.defaults.headers.common[header.name] = header.value
        })
      }
      self.axios.get(url, headers)
        .then(res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          })
          resolve(response)
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused })
            return resolve(response)
          }
          response = httpResponse({ statusCode: error.response.status, data: error.response.data })
          resolve(response)
        })
    })
  }

  patch(url, body, headers) {
    const self = this
    return new Promise(function (resolve) {
      self.axios.defaults.headers.common['x-api-key'] = apiKey
      delete self.axios.defaults.headers.common['Authorization'];
      if (headers) {
        headers.forEach(header => {
          self.axios.defaults.headers.common[header.name] = header.value
        })
      }
      self.axios.patch(url, body)
        .then(async res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          })
          resolve(response)
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused })
            return resolve(response)
          }
          response = httpResponse({ statusCode: error.response.status, data: error.response.data })
          resolve(response)
        })
    })
  }

  put(url, body, headers) {
    const self = this;
    return new Promise(function (resolve) {
      self.axios.defaults.headers.common['x-api-key'] = apiKey;
      delete self.axios.defaults.headers.common['Authorization'];
      if (headers) {
        headers.forEach(header => {
          self.axios.defaults.headers.common[header.name] = header.value;
        });
      }
      self.axios.put(url, body)
        .then(async res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          });
          resolve(response);
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused });
            return resolve(response);
          }
          response = httpResponse({ statusCode: error.response.status, data: error.response.data });
          resolve(response);
        });
    });
  }

  delete(url, headers) {
    const self = this
    return new Promise(function (resolve) {
      self.axios.defaults.headers.common['x-api-key'] = apiKey
      delete self.axios.defaults.headers.common['Authorization'];
      if (headers) {
        headers.forEach(header => {
          self.axios.defaults.headers.common[header.name] = header.value
        })
      }
      self.axios.delete(url, headers)
        .then(res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          })
          resolve(response)
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused })
            return resolve(response)
          }
          response = httpResponse({ statusCode: error.response.status, data: error.response.data })
          resolve(response)
        })
    })
  }

  // TODO: fix requset code
  request({ method, url, body, headers }) {
    const self = this
    const request = self.axios

    request.defaults.headers.common['x-api-key'] = apiKey
    if (headers) {
      headers.forEach(header => {
        request.defaults.headers.common[header.name] = header.value
      })
    }

    let res
    return new Promise(async function (resolve) {
      switch (method) {
        case 'POST':
          res = await request.post(url, body)
          break
        case 'PATCH':
          res = await request.patch(url, body)
          break
        case 'GET':
          res = await request.get(url)
          break
        case 'DELETE':
          res = await request.delete(url)
          break
      }

      console.log('res', res)
      request
        .then(async res => {
          response = httpResponse({
            success: true,
            statusCode: res.status,
            data: res.data
          })
          resolve(response)
        })
        .catch(function (error) {
          if (!error.response) {
            response = httpResponse({ statusCode: httpStatusCode.connectionRefused })
            return resolve(response)
          }
          response = httpResponse({ statusCode: error.response.status })
          resolve(response)
        })
    })
  }
}

export default HttpRequest
