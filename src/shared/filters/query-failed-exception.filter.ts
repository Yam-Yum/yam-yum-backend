import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message = 'Database error';
    if (exception.message.includes('Duplicate entry')) {
      message = 'Duplicate entry detected. Please use a unique value.';
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.message,
    });
  }
}
