import { UserMainStatsI } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  @Input() userMainStats: UserMainStatsI;

  repositories: number = 0;
  followers: number = 0;
  following: number = 0;

  constructor() {}

  ngOnInit(): void {}

  // Detect changes on the input
  ngOnChanges() {
    if (this.userMainStats) {
      this.repositories = this.userMainStats.repositories;
      this.followers = this.userMainStats.followers;
      this.following = this.userMainStats.following;
    }
  }
}
