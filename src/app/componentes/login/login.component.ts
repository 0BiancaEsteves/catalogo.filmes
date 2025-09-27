import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  senhaIncorreta: boolean = false; // nova variável

  login() {
    if (this.username.toLowerCase() === 'admin' && this.password === '12345') {
      this.successMessage = `✅ Bem-vindo, ${this.username}!`;
      this.errorMessage = '';
      this.senhaIncorreta = false;
      this.password = '';
    } else {
      this.errorMessage = '⚠️ Usuário ou senha incorretos!';
      this.successMessage = '';
      this.password = '';
      this.senhaIncorreta = true; // ativa a borda vermelha
    }
  }
}
