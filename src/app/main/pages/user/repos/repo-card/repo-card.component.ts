import {
  generateRandomRGBAColor,
  languageColors,
} from './../../../../models/language.colors';
import { RepositoryCardI } from './../../../../models/repository.card.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input() repo: RepositoryCardI;

  public titleCharLimit: number = 26;
  public descriptionCharLimit: number = 118;

  constructor() {}

  ngOnInit(): void {}

  public getLanguageColor(language: string): string {
    return languageColors[language] || generateRandomRGBAColor();
  }
}
