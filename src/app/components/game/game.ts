import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, arabicCategories, Category, LearningItem } from '../../data/game-data';
import { SpeechService } from '../../services/speech.service';
import { StarsService } from '../../services/stars.service';
import { ConfettiService } from '../../services/confetti.service';
import { GameResultComponent } from '../game-result/game-result';

interface GameOption {
  item: LearningItem;
  state: 'default' | 'correct' | 'wrong';
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameResultComponent],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly speech = inject(SpeechService);
  private readonly stars = inject(StarsService);
  private readonly confetti = inject(ConfettiService);

  categoryKey = '';
  category!: Category;
  gameItems: LearningItem[] = [];
  gameIndex = 0;
  gameCorrect = 0;
  gameTotal = 10;
  gameLocked = false;
  options: GameOption[] = [];
  currentItem!: LearningItem;

  showResult = false;
  resultTrophy = '';
  resultTitle = '';
  resultStars = '';
  resultText = '';

  get isArabic(): boolean { return arabicCategories.includes(this.categoryKey); }
  get progress(): string { return `${this.gameIndex + 1} / ${this.gameTotal}`; }
  get promptText(): string { return this.isArabic ? '\u0627\u0639\u062B\u0631 \u0639\u0644\u0649 \u0647\u0630\u0627!' : 'Find this one!'; }

  ngOnInit(): void {
    this.categoryKey = this.route.snapshot.params['category'];
    this.category = data[this.categoryKey];
    if (!this.category) {
      this.router.navigate(['/']);
      return;
    }
    this.startGame();
  }

  ngOnDestroy(): void {
    this.speech.cancel();
  }

  goHome(): void { this.router.navigate(['/']); }

  startGame(): void {
    this.showResult = false;
    const shuffled = [...this.category.items].sort(() => Math.random() - 0.5);
    this.gameTotal = Math.min(10, this.category.items.length);
    this.gameItems = shuffled.slice(0, this.gameTotal);
    this.gameIndex = 0;
    this.gameCorrect = 0;
    this.gameLocked = false;
    this.showRound();
  }

  handleAnswer(option: GameOption): void {
    if (this.gameLocked) return;
    this.gameLocked = true;

    if (option.item.name === this.currentItem.name) {
      option.state = 'correct';
      this.gameCorrect++;
      this.stars.addStars(1);
      this.confetti.burst();
      this.speech.speak(this.currentItem.isColor ? this.currentItem.name : this.currentItem.speech, this.currentItem.lang);
    } else {
      option.state = 'wrong';
      this.options.forEach(o => {
        if (o.item.name === this.currentItem.name) o.state = 'correct';
      });
    }

    setTimeout(() => {
      this.gameIndex++;
      if (this.gameIndex >= this.gameItems.length) {
        this.showGameResult();
      } else {
        this.showRound();
      }
    }, 1200);
  }

  private showRound(): void {
    this.gameLocked = false;
    this.currentItem = this.gameItems[this.gameIndex];

    const allItems = this.category.items.filter(i => i.name !== this.currentItem.name);
    const wrongItems = allItems.sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [this.currentItem, ...wrongItems].sort(() => Math.random() - 0.5);
    this.options = combined.map(item => ({ item, state: 'default' as const }));

    setTimeout(() => this.speech.speak(this.currentItem.speech, this.currentItem.lang), 300);
  }

  private showGameResult(): void {
    const starsEarned = this.gameCorrect >= this.gameTotal ? 3 :
                        this.gameCorrect >= this.gameTotal * 0.7 ? 2 :
                        this.gameCorrect >= this.gameTotal * 0.4 ? 1 : 0;

    if (starsEarned > 1) this.stars.addStars(starsEarned - this.gameCorrect);

    this.resultTrophy = this.gameCorrect === this.gameTotal ? '\uD83C\uDFC6' :
                        this.gameCorrect >= this.gameTotal * 0.7 ? '\uD83C\uDF89' : '\uD83D\uDCAA';
    this.resultTitle = this.gameCorrect === this.gameTotal ? 'Perfect!' :
                       this.gameCorrect >= this.gameTotal * 0.7 ? 'Great Job!' : 'Keep Trying!';
    this.resultStars = '\u2B50'.repeat(starsEarned) + '\u2606'.repeat(3 - starsEarned);
    this.resultText = `${this.gameCorrect} out of ${this.gameTotal} correct!`;
    this.showResult = true;
    this.confetti.burst();
    this.confetti.burst();
  }
}
