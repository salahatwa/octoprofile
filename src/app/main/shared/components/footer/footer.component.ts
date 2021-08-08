import { Component, OnInit } from '@angular/core';
import { NgxSingletonProps } from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  singletonTransitions: NgxSingletonProps = {
    animation: 'shift-away',
    interactiveBorder: 30,
    interactiveDebounce: 75,
    theme: 'dark',
    offset: [0, 15],
    arrow: true,
    moveTransition: 'transform 0.4s ease-in-out',
  };
}
