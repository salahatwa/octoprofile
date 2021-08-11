import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public id: string;
  public photo: string = 'assets/me.png';
  public name: string = 'Carlos Dubón';
  public githubUrl: string = 'https://google.com';

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.titleService.setTitle(`OctoProfile | ${this.id}`);
  }
}
