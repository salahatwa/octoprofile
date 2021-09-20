import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  constructor() {}

  public show: boolean = false;

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  scrollEvent(e: Event) {
    this.show = window.scrollY > 600 ? true : false;
  }

  public goToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
