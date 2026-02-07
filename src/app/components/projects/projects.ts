import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class  ProjectsComponent implements OnInit {
  // Effets de background
  codeLines = Array.from({ length: 15 }, (_, i) => ({
    position: Math.random() * 100,
    delay: Math.random() * 5,
    chars: this.generateRandomCode()
  }));

  // Project 1: Object Detection
  neuralNodes = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  connections = Array.from({ length: 8 }, (_, i) => ({}));

  boundingBoxes = [
    { x: 20, y: 30, width: 15, height: 20, label: 'Person' },
    { x: 60, y: 40, width: 10, height: 15, label: 'Car' },
    { x: 45, y: 60, width: 12, height: 18, label: 'Dog' }
  ];

  // Project 2: RGB Game
  gamePlatforms = [
    { x: 10, y: 20 },
    { x: 40, y: 40 },
    { x: 70, y: 30 },
    { x: 25, y: 60 }
  ];

  gameParticles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: this.getRandomColor()
  }));

  ngOnInit() {
    // Initialisation des animations
    setTimeout(() => {
      this.initAnimations();
    }, 1000);
  }

  private generateRandomCode(): string[] {
    const chars = '01{}[]();=>.<+-*/%&|!~^';
    return Array.from({ length: 20 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    );
  }

  private getRandomColor(): string {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private initAnimations() {
    // Les animations se déclenchent via les attributs data-animate
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  showProjectDetails(projectId: string) {
    // Implémentez la logique pour afficher les détails du projet
    console.log('Showing details for:', projectId);

    // Exemple: ouvrir un modal ou naviguer vers une page détaillée
    switch (projectId) {
      case 'object-detection':
        this.openProjectModal('Détection d\'Objets', this.getObjectDetectionDetails());
        break;
      case 'rgb-game':
        this.openProjectModal('RGB Game 3D', this.getRGBGameDetails());
        break;
      case 'club-app':
        this.openProjectModal('Gestion de Clubs', this.getClubAppDetails());
        break;
    }
  }

  private openProjectModal(title: string, content: any) {
    // Implémentez l'ouverture d'un modal avec les détails
    // Pour l'instant, on log dans la console
    console.log('Project Modal:', title, content);
  }

  private getObjectDetectionDetails() {
    return {
      description: "Système de détection d'objets en temps réel utilisant YOLOv5",
      features: [
        "Dataset personnalisé de 1000+ images",
        "Précision de détection: 92%",
        "Interface utilisateur intuitive avec Streamlit",
        "Base de données MySQL pour l'historique"
      ],
      technologies: ["Python", "PyTorch", "YOLOv5", "OpenCV", "Streamlit", "MySQL"],
      github: "#",
   
    };
  }

  private getRGBGameDetails() {
    return {
      description: "Jeu 3D avec intelligence artificielle intégrée",
      features: [
        "Graphismes 3D optimisés pour mobile et PC",
        "Système d'IA pour les ennemis",
        "Multiplateforme (Windows, Android, iOS)",
        "Système de particules avancé"
      ],
      technologies: ["C#", "Unity", "AI Behavior", "3D Modeling", "Shader Graph"],
      github: "#",
    
    };
  }

  private getClubAppDetails() {
    return {
      description: "Application mobile de gestion des clubs universitaires",
      features: [
        "Système d'authentification sécurisé",
        "Stockage local avec SQLite",
        "Synchronisation cloud avec Firebase",
        "Interface adaptée mobile-first"
      ],
      technologies: ["Java", "Android SDK", "SQLite", "Firebase", "Material Design"],
      github: "#",
   
    };
  }
}