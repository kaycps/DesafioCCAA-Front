import { Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { SolicitarResetComponent } from './components/solicitar-reset/solicitar-reset.component';
import { ResetSenhaComponent } from './components/resetar-senha/resetar-senha.component';
import { LoginComponent } from './components/login/login.component';
import { LivroListComponent } from './components/livro/livro-list.component';
import { LivroFormComponent } from './components/livro/livro-form.component';


export const routes: Routes = [
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'solicitar-reset', component: SolicitarResetComponent },
  { path: 'resetar-senha', component: ResetSenhaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'livros', component: LivroListComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'livros/editar/:id', component: LivroFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];