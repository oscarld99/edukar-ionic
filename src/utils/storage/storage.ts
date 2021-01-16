import { saveState } from './configStorage'
import { createStore } from 'redux'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'd':
      return {
        ...state,
        evaluationData: action.evaluationData
      }

    default:
      break
  }
  return state
}

const store = createStore(
  reducer,
  {

  }
)

store.subscribe(function () {
  saveState(store.getState())
})


export default store 
