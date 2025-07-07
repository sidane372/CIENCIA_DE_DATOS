import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  identifier = '';
  password = '';
  error = '';
  showPassword = false; // 🔒 Nueva propiedad

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.identifier, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token.access);
        this.router.navigate(['/component']);
      },
      error: (err) => {
        this.error = 'Credenciales inválidas';
        console.error(err);
      }
    });
  }

  // 👁‍🗨 Agrega esta función para alternar visibilidad de contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
