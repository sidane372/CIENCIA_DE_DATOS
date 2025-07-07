import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  isDragging = false;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  analysisResult: any = null;
  analysisHistory: any[] = [];

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Generar vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  analyzePlant() {
    if (!this.selectedFile) return;

    setTimeout(() => {
      this.analysisResult = {
        hasDisease: true,
        diseaseName: 'Mancha foliar',
        confidence: 92,
        treatment: 'Aplicar fungicida natural y mejorar ventilación de la planta.'
      };

      // Guardar en historial
      this.analysisHistory.unshift({
        ...this.analysisResult,
        date: new Date(),
        preview: this.previewImage
      });
    }, 1000);
  }
}
