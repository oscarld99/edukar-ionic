import { saveState } from './configStorage'
import { createStore } from 'redux'
import { STATE_GLOBAL } from '../../constants/costants'

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case STATE_GLOBAL.changeNetworkStatus:
      return {
        ...state,
        networkStatus: action.networkStatus
      }

    default:
      break
  }
  return state
}

const store = createStore(
  reducer,
  {
    networkStatus: true
  }
)

store.subscribe(function () {
  saveState(store.getState())
})

export default store 
