import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      title: `${item.title}`,
      route: `reactive/${item.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Paises',
      route: './country',
    },
  ];
}
