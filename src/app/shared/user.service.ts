import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder) { }

  formModel = this.fb.group({
    DNI: [''],
    FirstName: [''] ,
    LastName: [''] ,
    Password: [''] ,
  });
}
