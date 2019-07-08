import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI: string = 'https://localhost:5001/api';

  formModel = this.fb.group({
    dniHost: ['', Validators.required],
    nameHost: ['', Validators.required],
    lastNameHost: ['', Validators.required],
    passwordHost: this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    const confirmPwdCtrl = fb.get('ConfirmPassword');

    if (confirmPwdCtrl.errors === null || 'passwordMismatch' in confirmPwdCtrl.errors) {
      if (fb.get('Password').value !== confirmPwdCtrl.value) {
        confirmPwdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwdCtrl.setErrors(null);
      }
    }
  }

  register() {
    const body = {
      dniHost: Number(this.formModel.value.dniHost),
      nameHost: this.formModel.value.nameHost,
      lastNameHost: this.formModel.value.lastNameHost,
      passwordHost: this.formModel.value.passwordHost.Password
    };
    console.log(body);
    return this.http.post(this.BaseURI + '/host', body);
  }
}
