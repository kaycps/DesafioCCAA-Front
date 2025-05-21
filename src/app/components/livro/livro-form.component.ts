import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { LivroCadastroDTO } from '../../models/livro-cadastro.dto';
import { LivroEdicaoDTO } from '../../models/livro-edicao.dto';
import { Livro } from '../../models/livro.model';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {
    generos = [
    { id: 1, nome: 'Ação' },
    { id: 2, nome: 'Aventura' },
    { id: 3, nome: 'Romance' },
    { id: 4, nome: 'Fantasia' },
    { id: 5, nome: 'FicçãoCiêntifica' },
    { id: 6, nome: 'Outros' }

  ];

  editoras = [
    { id: 1, nome: 'Editora Abril' },
    { id: 2, nome: 'Editora Moderna' },
    { id: 3, nome: 'Editora Saraiva' },
    { id: 4, nome: 'Editora Globo' },
    { id: 5, nome: 'Editora Objetiva' }

  ];
  livro: LivroEdicaoDTO = {
    id: '',
    titulo: '',
    isbn: '',
    autor: '',
    sinopse: '',
    fotoPath: '',
    genero: 1, 
    editora: 1 
  };

  isEditMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private livroService: LivroService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.carregarLivro(id);
    }
  }

  carregarLivro(id: string): void {
    this.isLoading = true;
    this.livroService.getById(id).subscribe({
      next: (livro) => {
        this.livro = {
          id: livro.id,
          titulo: livro.titulo,
          isbn: livro.isbn,
          autor: livro.autor,
          sinopse: livro.sinopse,
          fotoPath: livro.fotoPath,
          genero: livro.genero,
          editora: livro.editora
        };
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar livro';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    
    if (this.isEditMode) {
      this.atualizarLivro();
    } else {
      this.cadastrarLivro();
    }
  }

  cadastrarLivro(): void {
    const livroCadastro: LivroCadastroDTO = {
      titulo: this.livro.titulo,
      isbn: this.livro.isbn,
      autor: this.livro.autor,
      sinopse: this.livro.sinopse,
      fotoPath: this.livro.fotoPath,
      genero: this.livro.genero,
      editora: this.livro.editora
    };

    this.livroService.cadastrar(livroCadastro).subscribe({
      next: () => {
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar livro';
        this.isLoading = false;
      }
    });
  }

  atualizarLivro(): void {
    this.livroService.atualizar(this.livro).subscribe({
      next: () => {
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar livro';
        this.isLoading = false;
      }
    });
  }
}