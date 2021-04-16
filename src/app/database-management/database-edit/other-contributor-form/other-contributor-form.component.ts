import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DialogContributor} from '../dialog-contributor/dialog-contributor.component';
import {FormBuilder, Validators} from '@angular/forms';
import {specialCharactersValidator} from '../../../share/specialCharactersValidator';

@Component({
  selector: 'app-other-contributor-form',
  templateUrl: './other-contributor-form.component.html',
  styleUrls: ['./other-contributor-form.component.scss']
})
export class OtherContributorFormComponent implements OnInit {

  @Output() userSelected = new EventEmitter<DialogContributor>();

  loginForm = this.fb.group({
    login: ['', [Validators.required,  Validators.minLength(6), specialCharactersValidator]],
    }
  );
  private password: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  updateUser(): void {
    const result: DialogContributor = { login: '', sqlLogin: '', password: this.password, permissionId: 0};
    if (this.loginForm.valid) {
      result.sqlLogin = this.loginForm.get('login').value;
    }
    this.userSelected.emit(result);
  }

  errorHandling = (error: string) => {
    return this.loginForm.get('login').hasError(error);
  }

  onChangePassword(password: string): void {
    this.password = password;
    this.updateUser();
  }

  onChangeLogin($event: Event): void {
    this.updateUser();
  }
}
