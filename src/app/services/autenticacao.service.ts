import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoDTO, TokenResponse } from '../models/autenticacao.dto';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) { }

  login(dto: AutenticacaoDTO): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}`, dto);
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  clearToken(): void {
    localStorage.removeItem('auth_token');
  }
}