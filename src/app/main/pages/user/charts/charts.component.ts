import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  public repositories: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];

      this.userService.getUserRepos(id).subscribe(
        (repos: any[]) => {
          this.repositories.push(...repos);
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('Complete');
          console.log(this.repositories);
        }
      );
    });
  }

  public getLanguagePerRepoList(repos: any[]): string[] {
    const arr: string[] = [];

    repos.forEach((repo: any) => {
      arr.push(repo.language);
    });

    return arr.sort();
  }
}
