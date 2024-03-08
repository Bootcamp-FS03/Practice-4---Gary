import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loggerService: LoggerService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(4)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
          Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#%$£&\.*])\S{4,100})$/),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/home']);
          this.loggerService.handleSuccess('Login Successful!');
        },
      });
    }
  }

  getErrorMessage(field: string): string {
    if (this.loginForm?.get(field)?.hasError('required')) {
      return `Debes ingresar un ${field}`;
    }
    if (this.loginForm?.get(field)?.hasError('minlength')) {
      return `El ${field} debe tener al menos 4 caracteres`;
    }
    if (this.loginForm?.get(field)?.hasError('maxlength')) {
      return `El ${field} debe tener maximo 100 caracteres`;
    }
    if (this.loginForm?.get(field)?.hasError('pattern')) {
      return `El ${field} debe tener al menos una mayúscula, una minúscula, un numero y un caracter especial`;
    }
    return '';
  }
}
