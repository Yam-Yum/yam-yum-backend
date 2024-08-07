import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  buildErrorMessage(): string {
    return 'validation failed (file type does not match file signature)';
  }

  isValid(files: Array<Express.Multer.File> | Express.Multer.File): boolean {
    if (!files) return false;
    if (!Array.isArray(files)) files = [files];

    let isMatch = false;
    for (const file of files) {
      // validate file signature
      const filesSignatures = magicBytes(file.buffer).map((file) => file.mime);
      if (!filesSignatures?.length) break;

      isMatch = filesSignatures.includes(file.mimetype);
      if (!isMatch) break;
    }

    if (!isMatch) return false;

    return true;
  }
}
