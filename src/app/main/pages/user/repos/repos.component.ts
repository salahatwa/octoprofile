import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  @ViewChild('menuBtn') menu: ElementRef<HTMLElement>;
  menuOpened: boolean = false;

  currentFilter: string = 'Stars';

  reposForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reposForm = this.fb.group({
      input: [''],
    });
  }

  ngOnInit(): void {}

  openMenu(): void {
    // Toggle the menu
    this.menuOpened ? (this.menuOpened = false) : (this.menuOpened = true);

    if (this.menuOpened) {
      // Open the menu animation
      this.menu.nativeElement.classList.remove('rotate--animation__out');
      this.menu.nativeElement.classList.add('rotate--animation__in');
    } else {
      // Close the menu animation
      this.menu.nativeElement.classList.remove('rotate--animation__in');
      this.menu.nativeElement.classList.add('rotate--animation__out');
    }
  }
}
