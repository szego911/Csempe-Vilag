import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keszletSzoveg' })
export class KeszletSzovegPipe implements PipeTransform {
  transform(stock: number): string {
    if (stock === 0) return 'Nincs készleten';
    if (stock < 5) return 'Korlátozott készlet';
    return `${stock} db raktáron`;
  }
}
