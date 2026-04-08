import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { data, Category } from '../../data/game-data';

type GameMode = 'learn' | 'game' | 'piano' | 'hunter';

interface ModeConfig {
  icon: string;
  name: string;
  detail: string;
  badge: string;
  badgeEmoji: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);

  currentMode: GameMode = 'learn';
  categories: Array<{ key: string; cat: Category }> = [];

  readonly modeConfig: Record<string, ModeConfig> = {
    learn: {
      icon: '\uD83D\uDCD6',
      name: 'Learn Mode',
      detail: 'Explore letters, numbers, shapes & colors at your own pace',
      badge: 'Learn',
      badgeEmoji: '\uD83D\uDCD6',
    },
    game: {
      icon: '\uD83C\uDFAF',
      name: 'Match Game',
      detail: 'Pick the right answer from 4 choices!',
      badge: 'Quiz',
      badgeEmoji: '\u2753',
    },
    hunter: {
      icon: '\u2328\uFE0F',
      name: 'Key Hunter',
      detail: 'Find the letter on your keyboard!',
      badge: 'Keyboard',
      badgeEmoji: '\u2328\uFE0F',
    },
  };

  constructor() {
    this.renderCategories();
  }

  setMode(mode: GameMode): void {
    this.currentMode = mode;
    this.renderCategories();
  }

  startPiano(): void {
    this.currentMode = 'piano';
    this.router.navigate(['/piano']);
  }

  onCategoryClick(key: string): void {
    if (this.currentMode === 'learn') {
      this.router.navigate(['/lesson', key]);
    } else if (this.currentMode === 'hunter') {
      this.router.navigate(['/hunter', key]);
    } else {
      this.router.navigate(['/game', key]);
    }
  }

  private renderCategories(): void {
    if (this.currentMode === 'hunter') {
      this.categories = [
        { key: 'english', cat: data['english'] },
        { key: 'numbers', cat: data['numbers'] },
      ];
    } else {
      this.categories = Object.entries(data).map(([key, cat]) => ({ key, cat }));
    }
  }
}
