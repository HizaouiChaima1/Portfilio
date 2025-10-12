// app.component.ts
import { Component } from '@angular/core';

// Import des composants
import { HeaderComponent } from './components/header/header';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { ExperiencesComponent } from './components/experiences/experiences';
import { AnimationService } from './services/animation';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    SkillsComponent,    // Section Compétences
    ProjectsComponent,
    ExperiencesComponent,  
    ContactComponent    // Section Contact
  ],
  template: `
    <div class="app-container">
      <!-- Header avec navigation -->
      <app-header></app-header>
      
      <!-- Contenu principal -->
      <main class="main-content">
        <!-- Section À propos -->
        <app-about></app-about>
        
        <!-- Section Compétences IA -->
        <app-skills></app-skills>

          <app-experiences></app-experiences>
        
        <!-- Section Projets -->
        <app-projects></app-projects>
        
        <!-- Section Contact -->
        <app-contact></app-contact>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: var(--background);
      position: relative;
      font-family: 'Inter', system-ui, sans-serif;
    }
    
    .main-content {
      padding-top: 80px; /* Compensation pour le header fixe */
    }

    /* Smooth scrolling pour toute l'application */
    html {
      scroll-behavior: smooth;
    }

    /* Styles globaux pour les sections */
    section {
      position: relative;
    }
  `]
})
export class AppComponent {
   constructor(private animationService: AnimationService) {}
  title = 'Portfilio Chaima Hizaoui';
   ngOnInit() {
    // Les animations se déclenchent automatiquement via le service
  }
}