import { RepositoryCardI } from './../../../../models/repository.card.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input() repo: RepositoryCardI;

  constructor() {}

  ngOnInit(): void {
    
  }
}
