import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spotSplitNumber',
})
export class SplitNumberPipe implements PipeTransform {
  transform(num: string|number, separator = ','): string {
    return String(num).replace(/\B(?=(?:\d{3})+$)/g, separator);
  }
}
