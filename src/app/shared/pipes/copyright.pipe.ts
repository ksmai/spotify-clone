import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spotCopyright',
})
export class CopyrightPipe implements PipeTransform {
  transform(text: string): string {
    return text
      .replace(/\(c\)/gi, String.fromCharCode(169))
      .replace(/\(p\)/gi, String.fromCharCode(8471));
  }
}
