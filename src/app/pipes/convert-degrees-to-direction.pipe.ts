import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDegreesToDirection'
})
export class ConvertDegreesToDirectionPipe implements PipeTransform {

  transform(degrees: number): string {
    return "";
  }

}
