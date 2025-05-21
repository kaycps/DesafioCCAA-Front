import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroCadastroDTO } from '../models/livro-cadastro.dto';
import { LivroEdicaoDTO } from '../models/livro-edicao.dto';
import { Livro } from '../models/livro.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = `${environment.apiUrl}/api/livro`;

  constructor(private http: HttpClient) { }

  cadastrar(dto: LivroCadastroDTO): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}`, dto);
  }

  buscar(termo?: string): Observable<Livro[]> {
    const params = termo ? { params: { termo } } : {};
    return this.http.get<Livro[]>(`${this.apiUrl}/todos`, params);
  }

  atualizar(dto: LivroEdicaoDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, dto);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  gerarRelatorioPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/relatorio/pdf`, {
      responseType: 'blob'
    });
  }

  getById(id: string): Observable<Livro> {
  return this.http.get<Livro>(`${this.apiUrl}/${id}`);
}
}