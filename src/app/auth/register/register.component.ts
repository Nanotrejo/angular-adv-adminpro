import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['test100', [Validators.required, Validators.minLength(3)]],
    email: ['www@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    password2: ['1234', Validators.required],
    terms: [true, Validators.required],
  }, {
    validators: this.passwordEquals('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(resp => {
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
    )
  }

  fieldInvalid(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted ? true : false;
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordInvalid() {
    const pass_1 = this.registerForm.get('password').value;
    const pass_2 = this.registerForm.get('password2').value;

    return pass_1 !== pass_2 && this.formSubmitted ? true : false;
  }

  passwordEquals(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEquals: true })
      }
    }
  }

}
