import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResetSenhaDTO } from '../../models/usuario-reset-senha.dto';

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetSenhaComponent {
  dto: UsuarioResetSenhaDTO = {
    idUsuario: '',
    token: '',
    novaSenha: ''
  };

  mensagem: string = ''; 
  erro: string = '';    

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: string };

    if (state) {
      this.dto.idUsuario = state.id;
    }
    
  }

  resetarSenha(): void {
    this.mensagem = '';
    this.erro = '';

    console.log(this.dto)
    this.usuarioService.resetarSenha(this.dto).subscribe({
      next: () => {
        this.mensagem = 'Senha alterada com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.erro = error.error?.mensagem || 'Erro ao resetar senha';
      }
    });
  }
}