import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'callisto-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() opacity = 1;

  public navOptions: {
    name: string;
    link: string;
  }[] = [
    {
      name: 'Creazione Siti Web',
      link: 'website',
    },
    {
      name: 'Sviluppo Brand',
      link: 'website',
    },
    {
      name: 'Grafica Pubblicitaria',
      link: 'website',
    },
    // {
    //   name: 'Home',
    //   link: 'home',
    // },
    // {
    //   name: 'Su di noi',
    //   link: 'about',
    // },
    // {
    //   name: 'Servizi',
    //   link: 'services',
    // },
    // {
    //   name: 'Contatti',
    //   link: 'contacts',
    // },
    // {
    //   name: 'Lavora con noi',
    //   link: 'work-with-us',
    // },
  ];

  constructor() {}

  ngOnInit(): void {}
}
