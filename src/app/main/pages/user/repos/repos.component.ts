import { RepositoryI } from './../../../models/repository.model';
import { UserService } from './../../../services/user.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import replaceString from 'replace-string';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  @ViewChild('menuBtn') menu: ElementRef<HTMLElement>;
  menuOpened: boolean = false;

  public pageSize = 6;
  public maxPages: number = 5;

  public searchPlaceholder: string = 'The name of the repository';

  currentFilter: BehaviorSubject<string> = new BehaviorSubject('Stars');

  reposForm: FormGroup;

  globalRepos: RepositoryI[] = [];

  repositories: RepositoryI[] = [];
  pageOfRepos: RepositoryI[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.reposForm = this.fb.group({
      input: [''],
    });
  }

  ngOnInit(): void {
    this.maxPages = window.innerWidth < 800 ? 3 : 5;
    this.pageSize = window.innerWidth < 800 ? 3 : 6;

    this.searchPlaceholder =
      window.innerWidth < 800 ? 'Search...' : 'The name of the repository';

    this.userService.repos.subscribe((repos: RepositoryI[]) => {
      // Get repos from user service
      this.repositories = [...repos];
      this.globalRepos = [...repos];

      // Sort by current filter
      this.repositories = this.getFilteredRepos(
        this.currentFilter.value,
        this.repositories
      );
    });

    this.reposForm.get('input').valueChanges.subscribe((val: string) => {
      // Filter values
      if (val) {
        val = replaceString(val.trim().toLowerCase(), ' ', '-');

        this.repositories = this.globalRepos.filter((repo) =>
          repo.name.toLowerCase().includes(val)
        );
      } else {
        this.repositories = this.globalRepos;
      }

      // Sort by current filter
      this.repositories = this.getFilteredRepos(
        this.currentFilter.value,
        this.repositories
      );
    });

    this.currentFilter.subscribe((val: string) => {
      const sorted: RepositoryI[] = this.getFilteredRepos(
        val,
        this.repositories
      );
      this.repositories = [];
      setTimeout(() => {
        this.repositories = sorted;
      });
    });
  }

  onChangePage(pageOfRepos: RepositoryI[]) {
    // update current page of repos
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

  getFilteredRepos(filter: string, repos: RepositoryI[]): RepositoryI[] {
    if (filter == 'Stars') {
      return this.sortReposByStars(repos);
    }

    if (filter == 'Forks') {
      return this.sortReposByForks(repos);
    }

    if (filter == 'Size') {
      return this.sortReposBySize(repos);
    }
  }

  sortReposByStars(repos: RepositoryI[]): RepositoryI[] {
    return repos.sort((a, b) => {
      if (a.stargazers_count > b.stargazers_count) {
        return -1;
      }

      if (a.stargazers_count < b.stargazers_count) {
        return 1;
      }

      return 0;
    });
  }

  sortReposByForks(repos: RepositoryI[]): RepositoryI[] {
    return repos.sort((a, b) => {
      if (a.forks_count > b.forks_count) {
        return -1;
      }

      if (a.forks_count < b.forks_count) {
        return 1;
      }

      return 0;
    });
  }

  sortReposBySize(repos: RepositoryI[]): RepositoryI[] {
    return repos.sort((a, b) => {
      if (a.size > b.size) {
        return -1;
      }

      if (a.size < b.size) {
        return 1;
      }

      return 0;
    });
  }
}
