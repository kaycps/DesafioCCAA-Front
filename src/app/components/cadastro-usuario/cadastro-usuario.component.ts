import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService,  } from '../../services/usuario.service';
import {UsuarioCadastroDTO} from '../../models/usuario-cadastro.dto';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'] 
})
export class CadastroUsuarioComponent {
  usuario: UsuarioCadastroDTO = {
    nome: '',
    email: '',
    senha: '',
    dataNascimento: new Date()

  };

  mensagem = '';
  erro = '';

  constructor(
    private usuarioService: UsuarioService,
    public router: Router
  ) {}

  cadastrar(): void {
    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: () => {
        this.mensagem = 'Conta criado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.erro = 'Erro ao cadastrar usuário.';
        this.mensagem = '';
      }
    });
  }
}
