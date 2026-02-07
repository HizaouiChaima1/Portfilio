import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../services/animation';

interface Skill {
  name: string;
  level?: number;
  type?: string;
  icon?: string;
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
    { name: 'Java' },
    { name: 'Python' },
    { name: 'C' },
    { name: 'C#' },
    { name: 'PHP' }  
  ];

  webSkills: Skill[] = [
    { name: 'HTML5' },
    { name: 'CSS3' },
    { name: 'Bootstrap' },
    { name: 'jQuery' }
  ];

  frameworkSkills: Skill[] = [
    { name: 'Spring Boot', type: 'Backend' },
    { name: 'Laravel', type: 'Backend' },
    { name: 'Angular', type: 'Frontend' },
    { name: 'React', type: 'Frontend' }
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
    // Initialisation si nécessaire
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.animationService.initScrollAnimations();
        this.animateSkillBars();
      }, 500);
    }
  }

  animateSkillBars() {
    if (!this.isBrowser) return;

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, index * 100);
    });

    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100 + 800);
    });
  }
}