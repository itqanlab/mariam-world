import { Component, inject, effect, ElementRef, viewChild } from '@angular/core';
import { StarsService } from '../../services/stars.service';

@Component({
  selector: 'app-star-counter',
  standalone: true,
  template: `
    <div class="star-counter" #counter>
      <span>&#11088;</span>
      <span>{{ starsService.stars() }}</span>
    </div>
  `,
  styles: [`
    .star-counter {
      position: fixed;
      top: 20px;
      right: 25px;
      background: white;
      border-radius: 50px;
      padding: 8px 20px;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--orange);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.3s;
      animation: star-shimmer 3s ease-in-out infinite;
    }
    @keyframes star-shimmer {
      0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      50% { box-shadow: 0 4px 25px rgba(250, 204, 21, 0.4), 0 0 15px rgba(251, 146, 60, 0.2); }
    }
    @keyframes star-pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
  `],
})
export class StarCounterComponent {
  readonly starsService = inject(StarsService);
  private readonly counter = viewChild<ElementRef>('counter');

  constructor() {
    let prevStars = this.starsService.stars();
    effect(() => {
      const current = this.starsService.stars();
      if (current > prevStars) {
        const el = this.counter()?.nativeElement;
        if (el) {
          el.style.animation = 'none';
          el.offsetWidth; // force reflow
          el.style.animation = 'star-pop 0.4s ease-out, star-shimmer 3s ease-in-out infinite';
        }
      }
      prevStars = current;
    });
  }
}
