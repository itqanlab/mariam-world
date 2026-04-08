import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  burst(): void {
    const colors = ['#FF6B9D', '#C084FC', '#60A5FA', '#4ADE80', '#FACC15', '#FB923C', '#F87171'];
    const shapes = ['circle', 'rect', 'star'];
    const container = document.createElement('div');
    container.className = 'confetti';
    container.style.left = '50%';
    container.style.top = '35%';
    document.body.appendChild(container);

    for (let i = 0; i < 35; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 6 + Math.random() * 12;
      piece.style.width = size + 'px';
      piece.style.height = shape === 'circle' ? size + 'px' : size * 0.6 + 'px';
      piece.style.borderRadius = shape === 'circle' ? '50%' : '2px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = (Math.random() - 0.5) * 500 + 'px';
      piece.style.setProperty('--fall-y', (200 + Math.random() * 200) + 'px');
      piece.style.setProperty('--drift-x', (Math.random() - 0.5) * 200 + 'px');
      piece.style.setProperty('--spin', (360 + Math.random() * 720) + 'deg');
      piece.style.animationDelay = Math.random() * 0.4 + 's';
      piece.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
      container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 2000);
  }
}
