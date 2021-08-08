import { Component, OnInit } from '@angular/core';
import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  singletonTransitions: NgxSingletonProps = {
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    theme: 'light',
    offset: [0, 15],
    arrow: true,
    moveTransition: 'transform 0.4s ease-in-out',
  };
}
