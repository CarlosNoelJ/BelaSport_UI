import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI: string = 'https://localhost:5001/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    DNI: ['', Validators.required],
    FirstName: ['', Validators.required] ,
    LastName: ['', Validators.required] ,
    Passwords: this.fb.group({
      Password: ['', Validators.required] ,
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.conparePasswords})
  });

  conparePasswords(fb: FormGroup) {
    const confirmPasswordCtrl = fb.get('ConfirmPassword');

    if (fb.get('Password').value !== confirmPasswordCtrl.value) {
      confirmPasswordCtrl.setErrors({ passwordMismatch: true});
    } else {
      confirmPasswordCtrl.setErrors(null);
    }
  }

  register() {
    const body = {
      DNi: this.formModel.value.DNI,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Password
    };
    return this.http.post(this.BaseURI + '/host', body);
  }
}
