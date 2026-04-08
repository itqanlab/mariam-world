import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StarsService {
  readonly stars = signal(parseInt(localStorage.getItem('mariam-stars') || '0'));

  addStars(count: number): void {
    const newTotal = this.stars() + count;
    this.stars.set(newTotal);
    localStorage.setItem('mariam-stars', String(newTotal));
  }
}
