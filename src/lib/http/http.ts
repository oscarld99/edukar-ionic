import { ErrorResponseHttp, SuccessResponseStatus, ErrorResponseStatus } from '../../helpers/apiResponse'
import { MESSAGES_HTTP, ResponseWS } from '../../interfaces/httpInterfaces'

const baseURL = 'https://edukar-api.herokuapp.com/v1.0/edukar'

const headers = {
  'Content-Type': 'application/json'
}

const get = async <T>(url: string): Promise<ResponseWS<T>> => {
  try {
    const response = await fetch([baseURL, url].join('/'), {
      method: 'GET',
      headers
    })
    const resp = await response.json()

    const data = {
      status: response.status,
      data: resp
    }
    if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('HTTP GET', data)
    return data
  } catch (error) {
    const data = {
      status: 500,
      data: { mensajeError: MESSAGES_HTTP.DEFAULT_ERROR }
    }
    if (String(error).includes('Failed to fetch')) {
      data.data.mensajeError = MESSAGES_HTTP.NETWORK_ERROR
      throw new ErrorResponseHttp('GET', data)
    }
    throw new ErrorResponseHttp('GET', data)
  }
}

const post = async <T>(url: string, body: any): Promise<ResponseWS<T>> => {
  try {
    const response = await fetch([baseURL, url].join('/'), {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    const resp = await response.json()

    const data = {
      status: response.status,
      data: resp
    }
    if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('POST', data)
    return data
  } catch (error) {
    const data = {
      status: 500,
      data: { mensajeError: MESSAGES_HTTP.DEFAULT_ERROR }
    }
    if (String(error).includes('Failed to fetch')) {
      data.data.mensajeError = MESSAGES_HTTP.NETWORK_ERROR
      throw new ErrorResponseHttp('POST', data)
    }
    if (ErrorResponseStatus.includes(error.error.status)) {
      throw new ErrorResponseHttp('POST', error.error)
    }
    throw new ErrorResponseHttp('POST', data)
  }
}

const put = async <T>(url: string, body: any): Promise<ResponseWS<T>> => {
  try {
    const response = await fetch(`${baseURL}/${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
    const resp = await response.json()

    const data = {
      status: response.status,
      data: resp
    }
    if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('PUT', data)
    return data
  } catch (error) {
    const data = {
      status: 500,
      data: { mensajeError: MESSAGES_HTTP.DEFAULT_ERROR }
    }
    if (String(error).includes('Failed to fetch')) {
      data.data.mensajeError = MESSAGES_HTTP.NETWORK_ERROR
      throw new ErrorResponseHttp('PUT', data)
    }
    throw new ErrorResponseHttp('PUT', data)
  }
}

const _delete = async <T>(url: string): Promise<ResponseWS<T>> => {
  try {
    const response = await fetch(`${baseURL}/${url}`, {
      method: 'DELETE',
      headers
    })
    const resp = await response.json()

    const data = {
      status: response.status,
      data: resp
    }
    if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('DELETE', data)
    return data
  } catch (error) {
    const data = {
      status: 500,
      data: { mensajeError: MESSAGES_HTTP.DEFAULT_ERROR }
    }
    if (String(error).includes('Failed to fetch')) {
      data.data.mensajeError = MESSAGES_HTTP.NETWORK_ERROR
      throw new ErrorResponseHttp('DELETE', data)
    }
    throw new ErrorResponseHttp('DELETE', data)
  }
}

export default {
  get,
  post,
  put,
  delete: _delete
}
