import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string, className: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [className],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  handleSuccess(message: string): void {
    this.openSnackBar(message, 'OK', 'snack-bar-success');
  }

  handleError(message: string): void {
    this.openSnackBar(message, 'CLOSE', 'snack-bar-error');
    console.error(message);
  }
}
