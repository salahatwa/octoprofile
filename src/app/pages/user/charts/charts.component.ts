import { mostStarredReposChartColors } from '../../../models/language.colors';
import { RepositoryI } from '../../../models/repository.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  Colors,
} from 'ng2-charts';
import {
  buildMostStarredRepositoriesChart,
  buildStarsPerLanguageChart,
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

  public AOSDuration: number = 750; //ms

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
  public topLanguagesChartColors: Colors;

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
  public mostStarredReposCharData: SingleDataSet;
  public mostStarredReposChartColors: Colors;

  // Stars per Language Chart
  public starsPerLanguageChartLabels: Label[];
  public starsPerLanguageChartData: SingleDataSet;
  public starsPerLanguageChartColors: Colors;

  ngOnInit(): void {
    AOS.init();

    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];

      this.userService.getUserRepos(id).subscribe((repos: RepositoryI[]) => {
        this.userService.repos.next(repos);
        this.repositories = repos;

        // Building most used languages chart
        const mostUsedLanguagesData = buildTopLanguagesChart(this.repositories);
        this.topLanaguagesChartLabels = mostUsedLanguagesData[0] as Label[];
        this.topLanaguagesChartData = mostUsedLanguagesData[1] as SingleDataSet;
        this.topLanguagesChartColors = [
          {
            backgroundColor: mostUsedLanguagesData[2],
          },
        ] as Colors;

        // Building most starred repos chart
        const mostStarredReposChartData = buildMostStarredRepositoriesChart(
          this.repositories
        );
        this.mostStarredReposChartLabels =
          mostStarredReposChartData[0] as Label[];
        this.mostStarredReposCharData =
          mostStarredReposChartData[1] as SingleDataSet;
        this.mostStarredReposChartColors = [
          {
            backgroundColor: mostStarredReposChartColors,
          },
        ] as Colors;

        // Building stars per language chart
        const starsPerLanguageData = buildStarsPerLanguageChart(
          this.repositories
        );
        this.starsPerLanguageChartLabels = starsPerLanguageData[0] as Label[];
        this.starsPerLanguageChartData =
          starsPerLanguageData[1] as SingleDataSet;
        this.starsPerLanguageChartColors = [
          {
            backgroundColor: starsPerLanguageData[2],
          },
        ] as Colors;
      });
    });
  }
}
