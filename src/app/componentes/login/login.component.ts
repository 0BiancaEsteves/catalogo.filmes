import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. IMPORT OBRIGATÓRIO

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
  senhaIncorreta: boolean = false; 


  constructor(private router: Router) {}

  login() {
    // Se o nome do usuario for igual a 'admin' é a senha igual a '12345' então, entrada confirmada
    if (this.username.toLowerCase() === 'admin' && this.password === '12345') {
      this.successMessage = `✅ Bem-vindo, ${this.username}!`;
      this.errorMessage = '';
      this.senhaIncorreta = false;
      this.password = '';
    
     
      setTimeout(() => {
        // Redireciona para o dashboard
        this.router.navigate(['/dashboard']); 
      }, 800); // dá um pequeno delay para mostrar a mensagem de sucesso

    } else {
      // senão entrada não confirmada
      this.errorMessage = '⚠️ Usuário ou senha incorretos!';
      this.successMessage = '';
      this.password = '';
      this.senhaIncorreta = true; // ativa a borda vermelha
    }
  }
}
