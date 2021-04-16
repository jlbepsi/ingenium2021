import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmValidParentMatcher, passwordValidator} from '../passwords-validator.directive';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  hide = true;

  @Input() verify = true;
  @Output() password = new EventEmitter<string>();

  // Formulaire pour les données Utilisateurs
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  passwordForm = this.fb.group({
      password: ['', [Validators.required,  Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordValidator}
  );

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.verify) {
      this.passwordForm.controls.password.markAsTouched({onlySelf: true});
      this.passwordForm.controls.confirmPassword.markAsTouched({onlySelf: true});
    } else {
      this.passwordForm.controls.password.clearValidators();
      this.passwordForm.controls.confirmPassword.clearValidators();
    }
  }

  isFormValid(): boolean {
    return this.passwordForm.valid;
  }

  updatePassword(): void {
    let password = '';
    if (this.isFormValid()) {
      password = this.passwordForm.get('password').value;
    }
    this.password.emit(password);
  }

  public errorHandling = (control: string, error: string) => {
    return this.passwordForm.controls[control].hasError(error);
  }

  public errorValidatorHandling = () => {
    return !!this.passwordForm.errors?.passwordValidator;
  }
}
