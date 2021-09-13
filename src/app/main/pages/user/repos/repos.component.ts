import { UserService } from './../../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  @ViewChild('menuBtn') menu: ElementRef<HTMLElement>;
  menuOpened: boolean = false;

  currentFilter: BehaviorSubject<string> = new BehaviorSubject('Stars');

  reposForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.reposForm = this.fb.group({
      input: [''],
    });
  }

  ngOnInit(): void {}

  toggleMenu(): void {
    // Toggle the menu
    this.menuOpened = this.menuOpened ? false : true;
  }

  setFilter(filter: string): void {
    this.currentFilter.next(filter);
    this.toggleMenu();
  }
}
