export class ErrorResponseHttp extends Error {
  constructor (readonly message: string, readonly error: { status: number, data: any }) {
    super(message)
  }
}

export const SuccessResponseStatus = [200, 201]
export const ErrorResponseStatus = [400, 401, 500]
