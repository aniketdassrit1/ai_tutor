import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';

export const routes: Routes = [{
  path: 'dashboard',
  loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
}, {
  path:'**',
  redirectTo: 'dashboard'
}];
