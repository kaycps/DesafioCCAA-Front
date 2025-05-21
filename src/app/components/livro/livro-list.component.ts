import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {
  livros: Livro[] = [];
  termoBusca: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private livroService: LivroService,
    public router: Router,
    private authService: AutenticacaoService 

  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    debugger
    this.isLoading = true;
    this.livroService.buscar(this.termoBusca).subscribe({
      next: (livros) => {
        this.livros = livros;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar livros';
        this.isLoading = false;
      }
    });
  }

  buscar(): void {
    this.carregarLivros();
  }

  gerarRelatorio(): void {
    this.livroService.gerarRelatorioPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio-livros.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

    editarLivro(id: string): void {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: string): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.isLoading = true;
      this.livroService.remover(id).subscribe({
        next: () => {
          this.carregarLivros();
        },
        error: (err) => {
          this.errorMessage = 'Erro ao excluir livro';
          this.isLoading = false;
        }
      });
    }
  }

  cadastrar(): void {
    this.router.navigate(['/livros/novo']);
  }

  logout(): void {
    this.authService.clearToken(); 
    this.router.navigate(['/login']); 
  }
}