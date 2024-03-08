import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { matchValidator } from '../../../../core/validators/matchValidator';
import { AuthService } from '../../../../core/services/auth.service';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(4)]],
      pass: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
          Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#%$£&\.*])\S{4,100})$/),
        ],
      ],
      confirmPass: ['', [Validators.required, matchValidator('pass')]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { username, pass: password } = this.registerForm.value;
      this.authService.register({ username, password }).subscribe({
        next: () => {
          this.loggerService.handleSuccess('Registration success!');
          this.router.navigate(['/login']);
        },
      });
    }
  }

  getErrorMessage(field: string): string {
    if (this.registerForm?.get(field)?.hasError('required')) {
      return `Debes ingresar un ${field}`;
    }
    if (this.registerForm?.get(field)?.hasError('minlength')) {
      return `El ${field} debe tener al menos 4 caracteres`;
    }
    if (this.registerForm?.get(field)?.hasError('maxlength')) {
      return `El ${field} debe tener maximo 100 caracteres`;
    }
    if (this.registerForm?.get(field)?.hasError('pattern')) {
      return `El ${field} debe tener al menos una mayúscula, una minúscula, un numero y un caracter especial`;
    }
    if (this.registerForm?.get(field)?.hasError('match')) {
      return 'Las contraseñas deben coincidir';
    }
    return '';
  }
}
