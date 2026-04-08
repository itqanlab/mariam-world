import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.HomeComponent) },
  { path: 'lesson/:category', loadComponent: () => import('./components/lesson/lesson').then(m => m.LessonComponent) },
  { path: 'game/:category', loadComponent: () => import('./components/game/game').then(m => m.GameComponent) },
  { path: 'piano', loadComponent: () => import('./components/piano/piano').then(m => m.PianoComponent) },
  { path: 'hunter/:category', loadComponent: () => import('./components/hunter/hunter').then(m => m.HunterComponent) },
  { path: '**', redirectTo: '' },
];
