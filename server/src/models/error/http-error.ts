export interface IHttpError {
  code: number;
  message: string;
}

class HttpError extends Error implements IHttpError {
  constructor(message = 'Woops, something went wront!', code = 500) {
    super(message);
    this.code = code;
  }
  code: number;
}

export default HttpError;
