import { LanguageStat, RepositoryI } from './../../../models/repository.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

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

  public repositories: any[] = [];

  // Pie
  public topLanguagesChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public labels: Label[];
  public instances: SingleDataSet;

  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];

      this.userService.getUserRepos(id).subscribe((repos: RepositoryI[]) => {
        this.repositories = repos;
        this.labels = this.buildTopLanguagesChart(
          this.repositories
        )[0] as Label[];
        this.instances = this.buildTopLanguagesChart(
          this.repositories
        )[1] as SingleDataSet;
      });
    });
  }

  public buildTopLanguagesChart(repos: RepositoryI[]) {
    // Get only a languages array
    let languages: string[] = [];

    repos.forEach((repo: RepositoryI) => {
      languages.push(repo.language);
    });

    // List containing all the languages the user uses
    let uniq: string[] = [...new Set(languages)];
    // Remove null elements from the list
    uniq = uniq.filter((s: string) => s);

    let instances: number[] = [];
    uniq.forEach((language: string) => {
      let count: number = 0;
      count = languages.filter((lang) => lang === language).length;

      instances.push(count);
    });

    let languageStats: LanguageStat[] = [];

    // Create objects for further sorting
    uniq.forEach((lang, index: number) => {
      languageStats.push(new LanguageStat(lang, instances[index]));
    });

    // Sort by quantity and stay with the top 6
    languageStats = languageStats
      .sort((a: LanguageStat, b: LanguageStat) =>
        a.quantity < b.quantity ? 1 : -1
      )
      .slice(0, 6);

    // Clear the arrays
    uniq = [];
    instances = [];

    // Build the arrays to be returned
    languageStats.forEach((langStat: LanguageStat) => {
      uniq.push(langStat.name);
      instances.push(langStat.quantity);
    });

    return [uniq, instances];
  }
}
