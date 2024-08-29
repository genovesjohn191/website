import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySearch'
})
export class FilterBySearchPipe implements PipeTransform {

  transform(options: any[], searchValue: string): any[] {
    if (!options || !searchValue) {
      return options;
    }
    const lowerCaseSearchValue = searchValue.toLowerCase();

    return options.filter(option => option.label.toLowerCase().includes(lowerCaseSearchValue));
  }
}
