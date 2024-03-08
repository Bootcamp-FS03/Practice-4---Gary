import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { footerLinks } from 'src/app/core/constants/footer-links';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'fs-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent {
  readonly footerLinks = footerLinks;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
