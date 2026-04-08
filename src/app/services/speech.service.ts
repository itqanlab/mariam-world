import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  speak(text: string, lang: string): void {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.85;
    utter.pitch = 1.1;
    speechSynthesis.speak(utter);
  }

  cancel(): void {
    speechSynthesis.cancel();
  }
}
