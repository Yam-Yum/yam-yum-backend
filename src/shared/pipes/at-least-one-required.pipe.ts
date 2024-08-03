import { PipeTransform, Injectable, BadRequestException, Global } from '@nestjs/common';

@Global()
@Injectable()
export class AtLeastOneRequired implements PipeTransform {
  constructor(private fields: string[]) {}
  transform(value: { [key: string]: string | number }) {
    const fields = this.fields;
    if (fields.some((field) => !!value[field])) return value;
    else throw new BadRequestException('At least one field is required');
  }
}
