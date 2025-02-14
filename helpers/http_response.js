import _object from '~/helpers/object.js'

const HttpStatusCode = {
  connectionRefused: 111,
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
  notImplement: 501
}

const ResponseMessage = {
  title: '',
  description: ''
}

const Response = {
  success: false,
  code: 0,
  message: '',
  data: null
}

const HttpResponseMessage = function (statusCode) {
  switch (statusCode) {
    case HttpStatusCode.connectionRefused:
      ResponseMessage.title = 'Connection refused'
      ResponseMessage.description = 'A network error occurred.'
      break

    case HttpStatusCode.ok:
      ResponseMessage.title = 'OK'
      ResponseMessage.description = 'The request has succeeded.'
      break

    case HttpStatusCode.created:
      ResponseMessage.title = 'Created'
      ResponseMessage.description = 'The request has succeeded and a new resource has been created as a result.'
      break

    case HttpStatusCode.noContent:
      ResponseMessage.title = 'No Content'
      ResponseMessage.description = 'There is no content to send for this request.'
      break

    case HttpStatusCode.badRequest:
      ResponseMessage.title = 'Bad Request'
      ResponseMessage.description =
        'The server could not understand the request due to invalid syntax.'
      break

    case HttpStatusCode.unauthorized:
      ResponseMessage.title = 'Unauthorized'
      ResponseMessage.description = 'The request does not have valid authentication credentials for the operation.'
      break

    case HttpStatusCode.forbidden:
      ResponseMessage.title = 'Forbidden'
      ResponseMessage.description =
        'The client does not have access rights to the content.'
      break

    case HttpStatusCode.notFound:
      ResponseMessage.title = 'Not Found'
      ResponseMessage.description = 'The server can not find the requested resource.'
      break

    case HttpStatusCode.internalServerError:
      ResponseMessage.title = 'Internal Server Error'
      ResponseMessage.description = 'Oops! Something went wrong. Please try again.'
      break

    default:
      break
  }

  return ResponseMessage
}

const HttpResponse = function ({ success = false, statusCode, data = null, pagination = null }) {
  const responseMessage = HttpResponseMessage(statusCode)
  const response = _object.fill(Response, {
    success: false,
    code: 0,
    message: '',
    data: null,
    pagination: null
  })

  response.success = success
  response.code = statusCode
  response.message = responseMessage
  response.data = data
  response.pagination = pagination

  return response
}

export const httpStatusCode = HttpStatusCode
export const response = Response
export const httpResponseMessage = HttpResponseMessage
export const httpResponse = HttpResponse
