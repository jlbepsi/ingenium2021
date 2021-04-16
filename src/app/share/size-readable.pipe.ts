import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeReadable'
})
export class SizeReadablePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const unite = ['Ko', 'Mo', 'Go', 'To'];
    let taille = value / 1024;
    if (taille > 1073741824) {
      taille /= 1073741824;
      return `${taille.toFixed(2)} To}`;
    } else {
      let cpt = 0;
      while (taille >= 1024) {
        taille /= 1024;
        cpt++;
      }
      return `${taille.toFixed(2)} ${unite[cpt]}`;
    }
  }
}
