export interface ResponseWS<T extends any> {
  status: number
  data: T
}
