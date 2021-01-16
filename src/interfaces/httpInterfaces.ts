export interface ResponseWS<T extends any> {
  status: number
  data: T
}

export enum MESSAGES_HTTP {
  NETWORK_ERROR = 'NO TIENES INTERNET',
  DEFAULT_ERROR = 'ERROR TECNICO'
}
