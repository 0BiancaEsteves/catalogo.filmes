import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  filmes = [
    { titulo: 'A Substância', poster: '/img/filmes/aSubstancia.png', genero: 'Terror' },
    { titulo: 'Corra!', poster: '/img/filmes/Corra.png', genero: 'Suspense' },
    { titulo: 'Cisne Negro', poster: '/img/filmes/CisneNegro.png', genero: 'Drama' },
    { titulo: 'It: A Coisa', poster: '/img/filmes/ITacoisa1.png', genero: 'Terror' },
    { titulo: 'It: A Coisa, Capitulo 2', poster: '/img/filmes/ITacoisa2.png', genero: 'Terror' },
    { titulo: 'Histórias Cruzadas', poster: '/img/filmes/HistoriasCruzadas.png', genero: 'Drama' },
    { titulo: 'Que Mal Eu Fiz a Deus?', poster: '/img/filmes/QueMalEuFizaDeus1.png', genero: 'Comédia' },
    { titulo: 'Que Mal Eu Fiz a Deus 2?', poster: '/img/filmes/QueMalEuFizaDeus2.png', genero: 'Comédia' }
  ];

  series = [
    { titulo: 'Orange is the New Black', poster: '/img/series/OrangeIsTheNewBlack.png', genero: 'Drama' },
    { titulo: 'Adolescência', poster: '/img/series/Adolescencia.png', genero: 'Drama' },
    { titulo: 'Stranger Things', poster: '/img/series/StrangerThings.png', genero: 'Suspense' },
    { titulo: 'Round 6', poster: '/img/series/Round6.png', genero: 'Thriller' },
    { titulo: 'Black Mirror', poster: '/img/series/BlackMirror.png', genero: 'Ficção científica' },
    { titulo: 'Todo Mundo Odeia o Chris', poster: '/img/series/TodoMundoOdeiaoChris.png', genero: 'Comédia' },
    { titulo: 'One Piece', poster: '/img/series/OnePieceserie.png', genero: 'Aventura' },
    { titulo: 'The Bear', poster: '/img/series/oUrso.png', genero: 'Drama' }
  ];

  animes = [
    { titulo: 'Zoom 100', poster: '/img/animes/Zoom100.png', genero: 'Ação' },
    { titulo: 'Death Note', poster: '/img/animes/DeathNote.png', genero: 'Suspense' },
    { titulo: 'One Piece', poster: '/img/animes/OnePiece.png', genero: 'Aventura' },
    { titulo: 'SPY X FAMILY', poster: '/img/animes/SPYxFAMILY.png', genero: 'Comédia/Ação' },
    { titulo: 'Demon Slayer', poster: '/img/animes/DemonSlayer.png', genero: 'Ação' },
    { titulo: 'Hunter x Hunter', poster: '/img/animes/HunterxHunter.png', genero: 'Aventura' },
    { titulo: 'Jujutsu Kaisen', poster: '/img/animes/JujutsuKaisen.png', genero: 'Ação' },
    { titulo: 'Neon Genesis Evangelion', poster: '/img/animes/NeonGenesisEvangelion.png', genero: 'Ficção científica' }
  ];

  jogos = [
    { titulo: 'Hollow Knight', poster: '/img/jogos/HollowKnight.png', genero: 'Metroidvania' },
    { titulo: 'Hollow Knight: Silksong', poster: '/img/jogos/Silksong.png', genero: 'Metroidvania' },
    { titulo: 'The Last of Us Parte 1', poster: '/img/jogos/TheLastofUs1.png', genero: 'Ação' },
    { titulo: 'The Last of Us Parte 2', poster: '/img/jogos/TheLastofUs2.png', genero: 'Ação' },
    { titulo: 'Celeste', poster: '/img/jogos/Celeste.png', genero: 'Plataforma' },
    { titulo: 'GRIS', poster: '/img/jogos/GRIS.png', genero: 'Aventura' },
    { titulo: 'Minecraft', poster: '/img/jogos/Minecraft.png', genero: 'Sandbox' },
    { titulo: 'INSIDE', poster: '/img/jogos/INSIDE.png', genero: 'Puzzle/Plataforma' }
  ];
}
