import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSize = new BehaviorSubject<string>('desktop');
  currentScreenSize = this.screenSize.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    if (width <= 767) {
      this.screenSize.next('mobile');
    } else {
      this.screenSize.next('desktop');
    }
  }
}
