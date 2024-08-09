import * as bytes from 'bytes';
import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import { FileSizeType } from '../types/files.type';
import { createFileTypeRegex } from '../utils/create-file-type-regex';
import { FileSignatureValidator } from '../validators/file-signature.validator';

export const createParseFilePipe = (maxSize: FileSizeType, fileTypes: string[]): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidators(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
  });

const createFileValidators = (maxSize: FileSizeType, fileTypes: string[]): FileValidator[] => {
  const fileTypeRegex = createFileTypeRegex(fileTypes);
  return [
    new MaxFileSizeValidator({
      maxSize: bytes.parse(maxSize),
      message: (maxSize) => `File is too big. Max file size is ${maxSize} bytes`,
    }),
    new FileTypeValidator({
      fileType: fileTypeRegex,
    }),
    new FileSignatureValidator(),
  ];
};
