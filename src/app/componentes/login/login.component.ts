import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

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
acceptedTerms: boolean = false;

login() {
  if (!this.acceptedTerms) {
    this.errorMessage = '⚠️ Você precisa aceitar os termos da LGPD.';
    return;
  }

  if (this.username.toLowerCase() === 'admin' && this.password === '12345') {
    this.successMessage = `✅ Bem-vindo, ${this.username}!`;
    this.errorMessage = '';
    this.senhaIncorreta = false;
    this.password = '';

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 800);
  } else {
    this.errorMessage = '⚠️ Usuário ou senha incorretos!';
    this.successMessage = '';
    this.password = '';
    this.senhaIncorreta = true;
    }
  }
}