
import { io, Socket } from 'socket.io-client'

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
    this.socket = io('http://localhost:9002')
    this.setCheckStatus()
  }

  setCheckStatus = (): void => {
    this.socket.on('connect', () => {
      this.socketStatus = true
    })

    this.socket.on('disconnect', () => {
      this.socketStatus = false
    })
  }

  getCheckStatus = (): boolean => this.socketStatus

  on = (evento: string, callback: Function): void => {
    this.socket.on(evento, callback)
  }
}
