import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioCadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioResetSenhaDTO {
  email: string;
  token: string;
  novaSenha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5000/usuario'; 

  constructor(private http: HttpClient) { }

  cadastrar(usuario: UsuarioCadastroDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}`, usuario);
  }

  solicitarResetSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitar-reset-senha`, `"${email}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  resetarSenha(dto: UsuarioResetSenhaDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/resetar-senha`, dto);
  }
}