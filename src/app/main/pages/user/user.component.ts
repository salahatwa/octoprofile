import { UserMainStatsI } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public id: string;
  public photo: string;
  public name: string;
  public githubUrl: string;
  public workplace: string;
  public location: string;
  public creationDate: Date;

  public repositories: number;
  public followers: number;
  public following: number;

  public userMainStats: UserMainStatsI;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.githubUrl = `https://github.com/${this.id}`;

    // Change the title of the current page
    this.titleService.setTitle(`OctoProfile | ${this.id}`);

    this.userService.getUserData(this.id).subscribe(
      (data: UserI) => {
        this.photo = data.avatar_url;
        this.name = data.name;
        this.workplace = data.company;
        this.location = data.location;
        this.creationDate = data.created_at;

        this.userMainStats = {
          repositories: data.public_repos,
          followers: data.followers,
          following: data.following,
        };
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        // Handle errors here, like sending the user to another route
        this.router.navigate(['/']);
        this.titleService.setTitle('OctoProfile');
      }
    );
  }
}
