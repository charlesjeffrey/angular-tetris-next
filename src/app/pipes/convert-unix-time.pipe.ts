import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnixTime'
})
export class ConvertUnixTimePipe implements PipeTransform {

  transform(seconds: number): string {
    const unix_milliseconds = seconds * 1000
    return new Date(unix_milliseconds).toLocaleString();
  }

}
