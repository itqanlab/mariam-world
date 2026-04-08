import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { data, arabicCategories, shapeCategories, LearningItem, Category } from '../../data/game-data';
import { letterIcons } from '../../data/letter-icons';
import { SpeechService } from '../../services/speech.service';
import { ConfettiService } from '../../services/confetti.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
})
export class LessonComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly speech = inject(SpeechService);
  private readonly confetti = inject(ConfettiService);
  private readonly sanitizer = inject(DomSanitizer);
  private keyListener!: (e: KeyboardEvent) => void;

  categoryKey = '';
  category!: Category;
  currentIndex = 0;
  entrance = 'bounce-in';
  iconHtml: SafeHtml = '';

  get item(): LearningItem { return this.category.items[this.currentIndex]; }
  get isArabic(): boolean { return arabicCategories.includes(this.categoryKey); }
  get isShape(): boolean { return shapeCategories.includes(this.categoryKey); }
  get hasLetterIcon(): boolean { return !!(this.item.hasIcon && letterIcons[this.item.char]); }
  get progress(): string { return `${this.currentIndex + 1} / ${this.category.items.length}`; }

  ngOnInit(): void {
    this.categoryKey = this.route.snapshot.params['category'];
    this.category = data[this.categoryKey];
    if (!this.category) {
      this.router.navigate(['/']);
      return;
    }
    this.showItem();

    this.keyListener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === ' ') this.speakCurrent();
      if (e.key === 'Escape') this.goHome();
    };
    document.addEventListener('keydown', this.keyListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyListener);
    this.speech.cancel();
  }

  goHome(): void { this.router.navigate(['/']); }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.category.items.length;
    this.showItem();
    this.confetti.burst();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.category.items.length) % this.category.items.length;
    this.showItem();
  }

  speakCurrent(): void {
    this.speech.speak(this.item.speech, this.item.lang);
  }

  private showItem(): void {
    const entrances = ['bounce-in', 'flip-in', 'slide-in-left', 'slide-in-right'];
    this.entrance = entrances[Math.floor(Math.random() * entrances.length)];

    if (this.hasLetterIcon) {
      this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(letterIcons[this.item.char]);
    } else {
      this.iconHtml = '';
    }

    setTimeout(() => this.speakCurrent(), 300);
  }
}
