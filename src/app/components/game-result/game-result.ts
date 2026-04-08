import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-game-result',
  standalone: true,
  template: `
    <div class="game-result" [class.active]="visible()">
      <div class="game-result-card">
        <span class="trophy">{{ trophy() }}</span>
        <h2>{{ title() }}</h2>
        <span class="stars-earned">{{ starsDisplay() }}</span>
        <p>{{ text() }}</p>
        <button class="play-again-btn" (click)="playAgain.emit()">Play Again</button>
        <button class="play-again-btn secondary" (click)="goHome.emit()">Home</button>
      </div>
    </div>
  `,
  styles: [`
    .game-result {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 200;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .game-result.active { display: flex; }
    .game-result-card {
      background: white;
      border-radius: 30px;
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 100%;
      animation: bounce-in 0.5s ease-out;
    }
    .trophy { font-size: 5rem; display: block; margin-bottom: 10px; }
    h2 { font-size: 2rem; color: #1F2937; margin-bottom: 10px; }
    .stars-earned { font-size: 2.5rem; display: block; margin: 10px 0; }
    p { font-size: 1.3rem; color: #6B7280; margin-bottom: 20px; }
    .play-again-btn {
      display: inline-block;
      padding: 12px 30px;
      border-radius: 50px;
      border: none;
      font-family: 'Baloo 2', cursive;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      margin: 5px;
      background: var(--pink);
      color: white;
      transition: transform 0.2s;
      animation: pulse-button 2s ease-in-out infinite;
    }
    .play-again-btn:hover { transform: scale(1.1); animation: none; }
    .play-again-btn.secondary {
      background: white;
      color: var(--pink);
      border: 3px solid var(--pink);
    }
    @keyframes bounce-in {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.1); }
      70% { transform: scale(0.95); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pulse-button {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `],
})
export class GameResultComponent {
  visible = input(false);
  trophy = input('');
  title = input('');
  starsDisplay = input('');
  text = input('');
  playAgain = output<void>();
  goHome = output<void>();
}
