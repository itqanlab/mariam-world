import { Component, inject, OnInit, OnDestroy, ElementRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../../services/speech.service';
import { ConfettiService } from '../../services/confetti.service';

@Component({
  selector: 'app-piano',
  standalone: true,
  templateUrl: './piano.html',
  styleUrl: './piano.scss',
})
export class PianoComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly speech = inject(SpeechService);
  private readonly confetti = inject(ConfettiService);
  private readonly display = viewChild<ElementRef>('pianoDisplay');

  private audioCtx!: AudioContext;
  private keyNotes: Record<string, number> = {};
  private keyListener!: (e: KeyboardEvent) => void;

  private readonly pianoColors = [
    '#FF6B9D', '#C084FC', '#60A5FA', '#4ADE80', '#FACC15',
    '#FB923C', '#F87171', '#2DD4BF', '#A78BFA', '#F472B6',
    '#34D399', '#FBBF24', '#F97316', '#EC4899', '#8B5CF6',
  ];

  ngOnInit(): void {
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.audioCtx.resume();

    const baseNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25,
      587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c, i) => {
      this.keyNotes[c] = baseNotes[i % baseNotes.length];
    });
    '0123456789'.split('').forEach((c, i) => {
      this.keyNotes[c] = baseNotes[i % baseNotes.length] * 1.5;
    });

    this.keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { this.goHome(); return; }
      this.handlePianoKey(e);
    };
    document.addEventListener('keydown', this.keyListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyListener);
    this.speech.cancel();
  }

  goHome(): void { this.router.navigate(['/']); }

  private handlePianoKey(e: KeyboardEvent): void {
    const key = e.key.toUpperCase();
    if (!key.match(/^[A-Z0-9]$/)) return;

    const displayEl = this.display()?.nativeElement;
    if (!displayEl) return;

    const color = this.pianoColors[Math.floor(Math.random() * this.pianoColors.length)];
    const freq = this.keyNotes[key] || 440;
    this.playNote(freq, 0.5);
    this.speech.speak(key.toLowerCase(), 'en-US');

    // Big letter burst
    const letter = document.createElement('div');
    letter.className = 'piano-letter bounce-in';
    letter.textContent = key;
    letter.style.color = color;
    letter.style.animation = 'piano-letter-burst 1.2s ease-out forwards';
    displayEl.appendChild(letter);
    setTimeout(() => letter.remove(), 1300);

    // Ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'piano-ripple';
    ripple.style.borderColor = color;
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    displayEl.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);

    // Color flash
    const flash = document.createElement('div');
    flash.className = 'piano-color-flash';
    flash.style.background = color;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);

    // Floating trail letters
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const trail = document.createElement('div');
        trail.className = 'piano-trail';
        trail.textContent = key;
        trail.style.color = this.pianoColors[Math.floor(Math.random() * this.pianoColors.length)];
        trail.style.left = (20 + Math.random() * 60) + '%';
        trail.style.top = (30 + Math.random() * 40) + '%';
        trail.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1500);
      }, i * 80);
    }

    this.confetti.burst();
  }

  private playNote(frequency: number, duration: number): void {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }
}
