
import { io, Socket } from 'socket.io-client'
import { STATE_GLOBAL } from '../constants/costants'
import store from '../utils/storage/storage'

export default class SocketIO {
  private static instance: SocketIO
  socket!: Socket
  socketStatus!: boolean

  public static getInstance (): SocketIO {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO()
    }
    return SocketIO.instance
  }

  private constructor () {
    this.socket = io('https://edukar-api.herokuapp.com/')
    this.setCheckStatus()
  }

  setCheckStatus = (): void => {
    this.socket.on('connect', () => {
      this.socketStatus = true
      this.makeDispatch(this.socketStatus)
    })

    this.socket.on('disconnect', () => {
      this.socketStatus = false
      this.makeDispatch(this.socketStatus)
    })
  }

  getCheckStatus = (): boolean => this.socketStatus

  on = (evento: string, callback: Function): void => {
    this.socket.on(evento, callback)
  }

  makeDispatch = (network: boolean): void => {
    store.dispatch({
      type: STATE_GLOBAL.changeNetworkStatus,
      networkStatus: network
    })
  }
}
