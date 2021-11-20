import { Mode } from '@carlos-dubon/chroma/lib/models/mode.enum';
import Chroma from '@carlos-dubon/chroma';
import { opacity } from '../../../../models/language.colors';
import { RepositoryCardI } from '../../../../models/repository.card.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input() repo: RepositoryCardI;

  public titleCharLimit: number = 26;
  public descriptionCharLimit: number = 105;
  private chroma: Chroma;

  constructor() {
    this.chroma = new Chroma({
      warnings: false,
      colorMode: Mode.rgb,
      opacity: opacity,
    });
  }

  ngOnInit(): void {}

  public getLanguageColor(language: string): string {
    return this.chroma.get(language) as string;
  }
}
