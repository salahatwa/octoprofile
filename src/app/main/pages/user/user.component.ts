import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import UserI from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public id: string;
  public photo: string = 'assets/me.png';
  public name: string = 'Carlos Dubón';
  public githubUrl: string;
  public workplace: string = 'Freelance';
  public location: string = 'Guatemala';
  public creationDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.githubUrl = `https://github.com/${this.id}`;

    this.titleService.setTitle(`OctoProfile | ${this.id}`);

    this.userService.getUserData(this.id).subscribe((data: UserI) => {
      console.log(data.followers);
    });
  }
}
