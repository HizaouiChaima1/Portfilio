import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {
  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'chaimahizaoui26@gmail.com',
      link: 'mailto:chaimahizaoui26@gmail.com'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Chaima Hizaoui',
      link: 'https://www.linkedin.com/in/chaima-hizaoui/'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'Projets & Code Source',
      link: 'https://github.com/HizaouiChaima1'
    }
  ];
  // Données du formulaire
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

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

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.subject && this.formData.message) {
      // Simulation d'envoi du formulaire
      console.log('Formulaire envoyé:', this.formData);

      // Ici vous intégrerez votre service d'envoi d'email
      // Par exemple: this.emailService.send(this.formData).subscribe(...)

      // Réinitialisation du formulaire
      this.formData = { name: '', email: '', subject: '', message: '' };

      // Message de succès
      alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Getters pour la validation du formulaire
  get name() {
    return { invalid: !this.formData.name, touched: true };
  }

  get email() {
    return { invalid: !this.formData.email, touched: true };
  }

  get subject() {
    return { invalid: !this.formData.subject, touched: true };
  }

  get message() {
    return { invalid: !this.formData.message, touched: true };
  }
}