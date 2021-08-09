import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  public usernameForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usernameForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(38),
          this.githubUsernameValidator(),
        ],
      ],
    });
  }

  public resetInput(): void {
    this.usernameForm.reset();
  }

  // Returns true if the input has text
  get inputHasText(): boolean {
    return this.usernameForm.get('username')?.errors?.required ? false : true;
  }

  get hasLengthError(): boolean {
    return this.usernameForm.get('username')?.errors?.maxlength ? true : false;
  }

  get firstErrorMsg(): string {
    // Returns 'required', 'maxlength', 'unvalidUsername'
    return Object.keys(this.usernameForm.get('username')?.errors)[0].toString();
  }

  public submit(): void {
    this.usernameForm.get('username')?.markAsTouched();
    if (this.usernameForm.valid) {
      console.log('OK');
    }
  }

  private githubUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.

      const githubUsername: RegExp = /\B@([A-Za-z0-9](?:-?[A-Za-z0-9]){0,38})/;
      const validUser: RegExpMatchArray = String(`@${control.value}`).match(
        githubUsername
      );

      return validUser && String(`@${control.value}`) === validUser[0]
        ? null
        : { unvalidUsername: control.value };
    };
  }
}
