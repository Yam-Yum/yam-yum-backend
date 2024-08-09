import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { createParseFilePipe } from 'src/shared/pipes/file-parse.pipe';

@Injectable()
export class FileFieldsValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const images = context.switchToHttp().getRequest().files.images;
    const videos = context.switchToHttp().getRequest().files.video;

    const imagesValidators = createParseFilePipe('2MB', ['jpg', 'jpeg', 'png']);
    const videoValidators = createParseFilePipe('30MB', ['mp4', 'mkv']);

    if (images && images.length === 0) {
      throw new BadRequestException('Images are required.');
    }

    // Check if images are present and validate
    if (images && images.length > 0) {
      for (const validator of imagesValidators.getValidators()) {
        for (const image of images) {
          const valid = validator.isValid(image);
          if (!valid) {
            throw new BadRequestException(validator.buildErrorMessage(image));
          }
        }
      }
    }

    // Check if video is present and validate
    if (videos && videos.length > 0) {
      for (const validator of videoValidators.getValidators()) {
        for (const video of videos) {
          const valid = validator.isValid(video);
          if (!valid) {
            throw new BadRequestException(validator.buildErrorMessage(video));
          }
        }
      }
    }

    return next.handle();
  }
}
