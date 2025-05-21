import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-solicitar-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-reset.component.html',
  styleUrls: ['./solicitar-reset.component.css']
})
export class SolicitarResetComponent {
  email: string = '';
  mensagem: string = '';
  erro: string = '';

  constructor(
    private usuarioService: UsuarioService,
    public router: Router
  ) { }

  solicitarReset(): void {
    this.usuarioService.solicitarResetSenha(this.email).subscribe({
      next: (response) => {
        
        this.mensagem = 'Email de recuperação enviado com sucesso!';
        this.erro = '';

        setTimeout(() => {
          this.router.navigate(['/resetar-senha'], {
            state: { 
              id: response 
            }
          });
        }, 2000);
      },
      error: (error) => {
        this.erro = error.error?.mensagem || 'Erro ao solicitar reset de senha';
        this.mensagem = '';
      }
    });
  }
}