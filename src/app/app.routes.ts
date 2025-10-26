import { Routes } from '@angular/router';
import { SpinWheel } from './spin-wheel/spin-wheel';

export const routes: Routes = [
  { path: '', redirectTo: 'spin-wheel', pathMatch: 'full' },
  { path: 'spin-wheel', component: SpinWheel },
];
