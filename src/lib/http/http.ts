import { ErrorResponseHttp, SuccessResponseStatus } from '../../helpers/apiResponse'
import { ResponseWS } from '../../interfaces/httpInterfaces'

const baseURL = 'https://edukar-api.herokuapp.com/v1.0/edukar'

const headers = {
  'Content-Type': 'application/json'
}

const get = async <T> (url: string): Promise<ResponseWS<T>> => {
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
}

const post = async <T> (url: string, body: any): Promise<ResponseWS<T>> => {
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
}

const put = async <T> (url: string, body: any): Promise<ResponseWS<T>> => {
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
  if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('POST', data)
  return data
}

const _delete = async <T> (url: string): Promise<ResponseWS<T>> => {
  const response = await fetch(`${baseURL}/${url}`, {
    method: 'DELETE',
    headers
  })
  const resp = await response.json()

  const data = {
    status: response.status,
    data: resp
  }
  if (!SuccessResponseStatus.includes(response.status)) throw new ErrorResponseHttp('POST', data)
  return data
}

export default {
  get,
  post,
  put,
  delete: _delete
}
