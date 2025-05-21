import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCadastroDTO } from '../models/usuario-cadastro.dto';
import { UsuarioResetSenhaDTO } from '../models/usuario-reset-senha.dto';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuario`;

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