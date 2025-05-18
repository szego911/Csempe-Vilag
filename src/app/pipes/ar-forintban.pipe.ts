import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arForintban',
})
export class ArForintbanPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toLocaleString('hu-HU')} Ft/m²`;
  }
}
