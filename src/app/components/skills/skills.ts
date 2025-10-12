import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../services/animation';

interface Skill {
  name: string;
  level: number;
  experience?: string;
  type?: string;
  icon?: string;
}

interface Tool {
  name: string;
  icon: string;
  category?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;

  programmingSkills: Skill[] = [
    { name: 'Java', level: 85, experience: '3 ans' },
    { name: 'Python', level: 80, experience: '2 ans' },
    { name: 'C#', level: 75, experience: '2 ans' },
    { name: 'PHP', level: 70, experience: '2 ans' },
    { name: 'C', level: 65, experience: '1 an' }
  ];

  webSkills: Skill[] = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'Bootstrap', level: 80 },
    { name: 'jQuery', level: 70 }
  ];

  frameworkSkills: Skill[] = [
    { name: 'Spring Boot', level: 80, type: 'Backend' },
    { name: 'Laravel', level: 75, type: 'Backend' },
    { name: 'Angular', level: 85, type: 'Frontend' },
    { name: 'React', level: 70, type: 'Frontend' }
  ];

  toolSkills: Tool[] = [
    { name: 'VS Code', icon: '📝', category: 'Éditeur' },
    { name: 'Eclipse', icon: '🌑', category: 'IDE' },
    { name: 'Android Studio', icon: '🤖', category: 'IDE Mobile' },
    { name: 'Unity', icon: '🎮', category: 'Moteur Jeu' },
    { name: 'Figma', icon: '🎯', category: 'Design' },
    { name: 'Illustrator', icon: '✏️', category: 'Design' },
    { name: 'Photoshop', icon: '🖼️', category: 'Design' },
    { name: 'Git', icon: '🔀', category: 'Versioning' }
  ];

  globalLevel = 0;
  progressParticles = Array.from({ length: 8 }, (_, i) => Math.random() * 100);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private animationService: AnimationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.calculateGlobalLevel();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.animationService.initScrollAnimations();
        this.animateSkillBars();
      }, 500);
    }
  }

  calculateGlobalLevel() {
    const allSkills = [...this.programmingSkills, ...this.webSkills, ...this.frameworkSkills];
    const average = allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length;

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      this.globalLevel = Math.min(current, Math.round(average));

      if (current >= average) {
        clearInterval(interval);
      }
    }, 30);
  }

  animateSkillBars() {
    if (!this.isBrowser) return;

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, index * 100);
    });

    const toolBadges = document.querySelectorAll('.tool-badge');
    toolBadges.forEach((badge, index) => {
      setTimeout(() => {
        badge.classList.add('animate-in');
      }, index * 80 + 600);
    });

    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100 + 800);
    });
  }

  animateSkill(event: MouseEvent, skill: Skill) {
    if (!this.isBrowser) return;

    const element = event.currentTarget as HTMLElement;
    const levelFill = element.querySelector('.level-fill') as HTMLElement;

    element.classList.add('skill-active');
    levelFill.style.transform = `scaleX(1.05)`;

    this.createParticles(element, skill.level);
  }

  resetSkill(event: MouseEvent) {
    if (!this.isBrowser) return;

    const element = event.currentTarget as HTMLElement;
    const levelFill = element.querySelector('.level-fill') as HTMLElement;

    element.classList.remove('skill-active');
    levelFill.style.transform = `scaleX(1)`;
  }

  animateTool(event: MouseEvent, tool: Tool) {
    if (!this.isBrowser) return;

    const element = event.currentTarget as HTMLElement;
    element.classList.add('tool-active');

    const icon = element.querySelector('.tool-icon') as HTMLElement;
    icon.style.transform = 'scale(1.3) rotate(10deg)';
  }

  resetTool(event: MouseEvent) {
    if (!this.isBrowser) return;

    const element = event.currentTarget as HTMLElement;
    element.classList.remove('tool-active');

    const icon = element.querySelector('.tool-icon') as HTMLElement;
    icon.style.transform = 'scale(1) rotate(0deg)';
  }

  createParticles(element: HTMLElement, level: number) {
    if (!this.isBrowser) return;

    const particleCount = Math.floor(level / 20);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 1}s`;
      element.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }
}