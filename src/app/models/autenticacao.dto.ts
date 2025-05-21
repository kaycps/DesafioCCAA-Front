export interface AutenticacaoDTO {
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
  email: string;
  nome: string;
}