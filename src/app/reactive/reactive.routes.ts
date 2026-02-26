import { Routes } from '@angular/router';
import { BasicPage } from './pages/basic-page/basic-page';
import { DinamicPage } from './pages/dinamic-page/dinamic-page';
import { SwitchesPage } from './pages/switches-page/switches-page';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basic',
        component: BasicPage,
      },
      {
        path: 'dinamic',
        title: 'Dinamic',
        component: DinamicPage,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
