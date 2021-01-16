import { fromJS, Map as iMap } from 'immutable'

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null) {
      return  // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    return fromJS(JSON.parse(serializedData)) // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return  // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}

export const saveState = (state: any) => {
  const stateAux = iMap(state)
  try {
    let serializedData = JSON.stringify(stateAux.toJS())
    localStorage.setItem('state', serializedData)
  } catch (error) {
    console.error(error)  // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.    
  }
}
