import { RepositoryI } from './../../../models/repository.model';
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

  repositories: RepositoryI[] = [];
  pageOfRepos: RepositoryI[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.reposForm = this.fb.group({
      input: [''],
    });
  }

  ngOnInit(): void {
    this.reposForm.get('input').valueChanges.subscribe((val: string) => {
      console.log(val);
    });

    this.userService.repos.subscribe((repos: RepositoryI[]) => {
      // Get repos from service
      this.repositories = [...repos];
    });
  }
  onChangePage(pageOfRepos: RepositoryI[]) {
    // update current page of items
    this.pageOfRepos = pageOfRepos;
  }

  toggleMenu(): void {
    // Toggle the menu
    this.menuOpened = this.menuOpened ? false : true;
  }

  setFilter(filter: string): void {
    this.currentFilter.next(filter);
    this.toggleMenu();
  }
}
