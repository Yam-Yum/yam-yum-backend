export class Response {
  private _message: string;
  private _statusCode: number;
  private _data: object[];

  constructor(message = '', data = [], statusCode?) {
    this._message = message;
    this._statusCode = statusCode;
    this._data = data;
  }

  success() {
    return {
      message: this._message,
      statusCode: this._statusCode || 200,
      data: this._data,
      length: this._data.length,
    };
  }

  created() {
    return {
      message: this._message,
      statusCode: 201,
      data: this._data,
    };
  }

  //   list() {
  //     return {
  //       message: this.message,
  //       statusCode: 200,
  //       data: this.data,
  //     };
  //   }
}
