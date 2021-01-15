const url = ''

const headers = {
  'Content-Type': 'application/json'
}

interface ResponseWS<T extends any> {
    status: number
    data: T
  }

const mutation = async <T> (body:any): Promise<ResponseWS<T>> => {

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        query:body})
  })
  const resp = await response.json()

  const data = {
    status: response.status,
    data: resp
  }
  
  return data
}

/*
 `mutation {
        createUser(input: {nombres: "Nestor", apellidos: "Cortina", identificacion: "1143271190", correo: "junior110120@gmail.com", usuario: "ncortina", clave: "110120"}) {
          id
          atributos {
            correo
          }
        }
      }`
*/

export default {
    mutation
}