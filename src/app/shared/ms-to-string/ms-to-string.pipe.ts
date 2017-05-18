import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spotMSToString',
})
export class MSToStringPipe implements PipeTransform {
  transform(ms: number, showMS = false): string {
    const h = Math.floor(ms / 1000 / 3600);
    const m = Math.floor(Math.floor(ms / 1000) % 3600 / 60);
    const s = Math.floor(ms / 1000) % 60;
    const extraMS = ms % 1000;

    let timeString = '';
    if (h > 0) {
      timeString += String(h);
    }

    if (h > 0) {
      timeString += ':';
      timeString += this.pad(String(m), 2, '0');
    } else {
      timeString += String(m);
    }

    timeString += ':';
    timeString += this.pad(String(s), 2, '0');

    if (showMS) {
      timeString += `:${this.pad(String(extraMS), 3, '0')}`;
    }

    return timeString;
  }

  private pad(str: string, len: number, c = '0'): string {
    while (str.length < len) {
      str = c + str;
    }

    return str;
  }
}
