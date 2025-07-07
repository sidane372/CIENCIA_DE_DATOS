import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.success = 'Usuario registrado correctamente';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = 'Error al registrar usuario';
        console.error(err);
      }
    });
  }
}
