import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark' | 'purple' | 'blue' | 'pink';
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');
  
  // Définition des palettes de couleurs pour chaque thème
  private themes: Record<Theme, ThemeColors> = {
    light: {
      primary: '#667eea',
      secondary: '#764ba2',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#2d3748',
      textSecondary: '#4a5568'
    },
    dark: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1'
    },
    purple: {
      primary: '#a855f7',
      secondary: '#c084fc',
      background: '#faf5ff',
      surface: '#f3e8ff',
      text: '#581c87',
      textSecondary: '#7c3aed'
    },
    blue: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#1e40af',
      textSecondary: '#3b82f6'
    },
    pink: {
      primary: '#ec4899',
      secondary: '#f472b6',
      background: '#fdf2f8',
      surface: '#fce7f3',
      text: '#9d174d',
      textSecondary: '#db2777'
    }
  };

  currentThemeColors = computed(() => this.themes[this.currentTheme()]);
  theme = this.currentTheme.asReadonly();

  constructor() {
    this.loadInitialTheme();
  }

  private loadInitialTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const current = this.currentTheme();
    const nextTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  cycleThemes(): void {
    const themes: Theme[] = ['light', 'dark', 'purple', 'blue', 'pink'];
    const currentIndex = themes.indexOf(this.currentTheme());
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  private applyTheme(theme: Theme): void {
    const colors = this.themes[theme];
    
    // Appliquer les variables CSS
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    
    // Ajouter une classe pour le thème actuel
    root.className = '';
    root.classList.add(`theme-${theme}`);
  }

  getAvailableThemes(): { name: Theme; label: string; colors: ThemeColors }[] {
    return [
      { name: 'light', label: 'Clair', colors: this.themes.light },
      { name: 'dark', label: 'Sombre', colors: this.themes.dark },
      { name: 'purple', label: 'Violet', colors: this.themes.purple },
      { name: 'blue', label: 'Bleu', colors: this.themes.blue },
      { name: 'pink', label: 'Rose', colors: this.themes.pink }
    ];
  }
}