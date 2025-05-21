import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { AutenticacaoDTO } from '../../models/autenticacao.dto';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credenciais: AutenticacaoDTO = {
    email: '',
    senha: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credenciais).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Falha no login. Verifique suas credenciais.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}