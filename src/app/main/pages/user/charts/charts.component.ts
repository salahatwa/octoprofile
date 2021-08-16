import { mostStarredReposChartColors } from './../../../models/language.colors';
import { RepositoryI } from './../../../models/repository.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import {
  buildMostStarredRepositoriesChart,
  buildTopLanguagesChart,
} from './builders/builders';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  // List containing all the repositories
  public repositories: RepositoryI[] = [];

  // Top Languages Chart
  public topLanguagesChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    aspectRatio: 1,
  };
  public topLanaguagesChartData: SingleDataSet;
  public topLanaguagesChartLabels: Label[];
  public topLanguagesChartColors;

  // Most Starred Repos Chart
  public mostStarredReposChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    aspectRatio: 1.3,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  public mostStarredReposChartLabels: Label[];
  public mostStarredReposCharData;
  public mostStarredReposChartColors;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];

      this.userService.getUserRepos(id).subscribe((repos: RepositoryI[]) => {
        this.repositories = repos;

        // Building most used languages chart
        const mostUsedLanguagesData = buildTopLanguagesChart(this.repositories);
        this.topLanaguagesChartLabels = mostUsedLanguagesData[0] as Label[];
        this.topLanaguagesChartData = mostUsedLanguagesData[1] as SingleDataSet;
        this.topLanguagesChartColors = [
          {
            backgroundColor: mostUsedLanguagesData[2],
          },
        ];

        // Building most starred repos chart
        const mostStarredReposChartData = buildMostStarredRepositoriesChart(
          this.repositories
        );
        this.mostStarredReposChartLabels =
          mostStarredReposChartData[0] as Label[];
        this.mostStarredReposCharData = mostStarredReposChartData[1];
        this.mostStarredReposChartColors = [
          {
            backgroundColor: mostStarredReposChartColors,
          },
        ];
      });
    });
  }
}
