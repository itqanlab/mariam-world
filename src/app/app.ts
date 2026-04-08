import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarCounterComponent } from './components/star-counter/star-counter';

@Component({
  imports: [RouterModule, StarCounterComponent],
  selector: 'app-root',
  template: `
    <app-star-counter />
    <div class="stars-container" id="stars"></div>
    <router-outlet />
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class App {
  constructor() {
    this.createStars();
    this.createBubbles();
  }

  private createStars(): void {
    setTimeout(() => {
      const container = document.getElementById('stars');
      if (!container) return;
      const emojis = ['\u2B50', '\uD83C\uDF1F', '\u2728', '\uD83D\uDCAB', '\uD83C\uDF08', '\u2764\uFE0F', '\uD83E\uDD8B'];
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.textContent = emojis[i % emojis.length];
        star.style.fontSize = (18 + Math.random() * 35) + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = -(Math.random() * 15) + 's';
        star.style.animationDuration = (10 + Math.random() * 15) + 's';
        container.appendChild(star);
      }
    });
  }

  private createBubbles(): void {
    setTimeout(() => {
      const container = document.createElement('div');
      container.className = 'bubble-container';
      document.body.appendChild(container);

      const colors = ['rgba(255,107,157,0.2)', 'rgba(192,132,252,0.2)', 'rgba(96,165,250,0.2)',
                      'rgba(74,222,128,0.2)', 'rgba(250,204,21,0.2)', 'rgba(251,146,60,0.2)'];

      function spawnBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 15 + Math.random() * 40;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.setProperty('--drift', String((Math.random() - 0.5) * 200));
        bubble.style.animationDuration = (8 + Math.random() * 12) + 's';
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 20000);
      }

      for (let i = 0; i < 8; i++) {
        setTimeout(() => spawnBubble(), i * 500);
      }
      setInterval(spawnBubble, 2000);
    });
  }
}
