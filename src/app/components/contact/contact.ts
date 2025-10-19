import { Component, OnInit, signal } from '@angular/core';
interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {
  // États réactifs
  isLoading = signal(false);
  isSuccess = signal(false);
  isError = signal(false);
  errorMessage = signal('');

  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'chaimahizaoui26@gmail.com',
      link: 'mailto:chaimahizaoui26@gmail.com'
    },
    {
      icon: '📱',
      title: 'Téléphone',
      value: '+216 26 100 720'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Profil Professionnel',
      link: 'https://www.linkedin.com/in/chaima-hizaoui/'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'Projets & Code Source',
      link: 'https://github.com/HizaouiChaima1'
    }
  ];

  socialLinks: SocialLinks = {
    linkedin: 'https://www.linkedin.com/in/chaima-hizaoui/',
    github: 'https://github.com/HizaouiChaima1'
  };

  particles = Array.from({ length: 15 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    color: this.getRandomColor()
  }));

  ngOnInit() {
    this.initAnimations();
  }

  private initAnimations() {
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

  private getRandomColor(): string {
    const colors = [
      'rgba(59, 130, 246, 0.3)',
      'rgba(168, 85, 247, 0.3)',
      'rgba(34, 197, 94, 0.3)',
      'rgba(249, 115, 22, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}