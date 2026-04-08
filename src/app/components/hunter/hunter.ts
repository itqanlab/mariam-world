import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, Category, LearningItem } from '../../data/game-data';
import { SpeechService } from '../../services/speech.service';
import { StarsService } from '../../services/stars.service';
import { ConfettiService } from '../../services/confetti.service';
import { GameResultComponent } from '../game-result/game-result';

interface HintKey {
  key: string;
  state: 'default' | 'correct' | 'wrong' | 'target';
}

@Component({
  selector: 'app-hunter',
  standalone: true,
  imports: [GameResultComponent],
  templateUrl: './hunter.html',
  styleUrl: './hunter.scss',
})
export class HunterComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly speech = inject(SpeechService);
  private readonly stars = inject(StarsService);
  private readonly confetti = inject(ConfettiService);
  private keyListener!: (e: KeyboardEvent) => void;
  private hintTimer: any;

  categoryKey = '';
  category!: Category;
  hunterItems: LearningItem[] = [];
  hunterIndex = 0;
  hunterCorrect = 0;
  hunterTotal = 10;
  hunterStreak = 0;
  hintText = '';
  streakText = '';
  keys: HintKey[] = [];
  active = true;

  showResult = false;
  resultTrophy = '';
  resultTitle = '';
  resultStars = '';
  resultText = '';

  get currentItem(): LearningItem { return this.hunterItems[this.hunterIndex]; }
  get progress(): string { return `${this.hunterIndex + 1} / ${this.hunterTotal}`; }

  ngOnInit(): void {
    this.categoryKey = this.route.snapshot.params['category'];
    this.category = data[this.categoryKey];
    if (!this.category) {
      this.router.navigate(['/']);
      return;
    }
    this.startHunter();

    this.keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { this.goHome(); return; }
      this.handleKey(e);
    };
    document.addEventListener('keydown', this.keyListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyListener);
    clearTimeout(this.hintTimer);
    this.speech.cancel();
  }

  goHome(): void { this.router.navigate(['/']); }

  startHunter(): void {
    this.showResult = false;
    this.active = true;
    const pool = this.categoryKey === 'numbers'
      ? this.category.items.slice(0, 9)
      : this.category.items;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    this.hunterTotal = Math.min(10, pool.length);
    this.hunterItems = shuffled.slice(0, this.hunterTotal);
    this.hunterIndex = 0;
    this.hunterCorrect = 0;
    this.hunterStreak = 0;
    this.showRound();
  }

  private showRound(): void {
    if (this.hunterIndex >= this.hunterItems.length) {
      this.active = false;
      this.showHunterResult();
      return;
    }

    const item = this.currentItem;
    this.hintText = '';
    this.streakText = this.hunterStreak >= 2
      ? '\u2B50'.repeat(Math.min(this.hunterStreak, 5)) + ' Streak: ' + this.hunterStreak + '!'
      : '';

    const keyChars = this.categoryKey === 'numbers'
      ? '123456789'.split('')
      : 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

    this.keys = keyChars.map(k => ({ key: k, state: 'default' as const }));

    setTimeout(() => this.speech.speak(item.speech, item.lang), 300);

    clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => {
      const target = this.keys.find(k => k.key === item.char.toUpperCase());
      if (target) target.state = 'target';
      this.hintText = 'Look for the glowing key!';
    }, 5000);
  }

  private handleKey(e: KeyboardEvent): void {
    if (!this.active) return;
    const key = e.key.toUpperCase();
    const item = this.currentItem;
    const targetKey = item.char.toUpperCase();

    clearTimeout(this.hintTimer);

    if (key === targetKey) {
      this.hunterCorrect++;
      this.hunterStreak++;
      const starsCount = this.hunterStreak >= 3 ? 2 : 1;
      this.stars.addStars(starsCount);
      this.confetti.burst();
      this.speech.speak(item.speech, item.lang);

      const targetHint = this.keys.find(k => k.key === targetKey);
      if (targetHint) targetHint.state = 'correct';

      this.hintText = '';
      this.streakText = this.hunterStreak >= 2
        ? '\u2B50'.repeat(Math.min(this.hunterStreak, 5)) + ' Streak: ' + this.hunterStreak + '!'
        : '';

      setTimeout(() => {
        this.hunterIndex++;
        this.showRound();
      }, 1000);
    } else {
      this.hunterStreak = 0;
      const wrongHint = this.keys.find(k => k.key === key);
      if (wrongHint) wrongHint.state = 'wrong';
      this.hintText = 'Try again! Look at the letter...';

      setTimeout(() => {
        this.keys.forEach(k => { if (k.state === 'wrong') k.state = 'default'; });
      }, 500);
    }
  }

  private showHunterResult(): void {
    const starsEarned = this.hunterCorrect >= this.hunterTotal ? 3 :
                        this.hunterCorrect >= this.hunterTotal * 0.7 ? 2 :
                        this.hunterCorrect >= this.hunterTotal * 0.4 ? 1 : 0;
    if (starsEarned > 0) this.stars.addStars(starsEarned);

    this.resultTrophy = this.hunterCorrect === this.hunterTotal ? '\uD83C\uDFC6' :
                        this.hunterCorrect >= this.hunterTotal * 0.7 ? '\uD83C\uDF89' : '\uD83D\uDCAA';
    this.resultTitle = this.hunterCorrect === this.hunterTotal ? 'Keyboard Master!' :
                       this.hunterCorrect >= this.hunterTotal * 0.7 ? 'Great Typing!' : 'Keep Practicing!';
    this.resultStars = '\u2B50'.repeat(starsEarned) + '\u2606'.repeat(3 - starsEarned);
    this.resultText = `${this.hunterCorrect} out of ${this.hunterTotal} keys found!`;
    this.showResult = true;
    this.confetti.burst();
    this.confetti.burst();
  }
}
