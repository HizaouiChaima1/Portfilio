// header.component.ts
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  isDarkTheme = false;
  
  particles = Array.from({ length: 15 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
    color: this.getRandomColor()
  }));

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private applyTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false;
  }

  private getRandomColor(): string {
    const colors = [
      'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
      'linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)',
      'linear-gradient(135deg, #FFD1FF 0%, #FAD0C4 100%)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}