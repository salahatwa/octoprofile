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

    this.usernameForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  // Sets the input to an empty string
  public resetInput(): void {
    this.usernameForm.reset();
  }

  // Returns true if the input has text
  get inputHasText(): boolean {
    return this.usernameForm.get('username')?.errors?.required ? false : true;
  }

  get hasLengthError(): boolean {
    // Username is too long (maximum is 39 characters).
    return this.usernameForm.get('username')?.errors?.maxlength ? true : false;
  }

  get firstErrorMsg(): string {
    // Returns 'required', 'maxlength', 'unvalidUsername'
    return Object.keys(this.usernameForm.get('username')?.errors)[0].toString();
  }

  public submit(): void {
    this.usernameForm.get('username')?.markAsTouched();
    console.log('Form valid: ', this.usernameForm.valid);
    console.log('Erros: ', this.usernameForm.controls.username.errors);
  }

  githubUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.

      const regex = /\B@([a-z0-9](?:-?[a-z0-9]){0,38})/;
      const validUser: RegExpMatchArray = String(`@${control.value}`).match(
        regex
      );
      return validUser && String(`@${control.value}`) === validUser[0]
        ? null
        : { unvalidUsername: control.value };
    };
  }
}
