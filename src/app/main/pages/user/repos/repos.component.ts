import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  currentFilter: string = 'Stars';

  reposForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reposForm = this.fb.group({
      input: [''],
    });
  }

  ngOnInit(): void {}

  resetInput(): void {
    this.reposForm.get('input').reset();
  }
}
