import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataUrl'
})
export class DataUrlPipe implements PipeTransform {

  transform(value: any, fallbackUrl?: string, forceHttps?: boolean): any {
    let url = '';
    if (value) {
      url = value;
    } else {
      url = fallbackUrl;
    }

    if (forceHttps) {
      url = url.replace('http', 'https');
    }
    return url;
  }

}
