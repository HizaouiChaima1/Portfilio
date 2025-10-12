import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [],
  templateUrl: './experiences.html',
  styleUrls: ['./experiences.css']
})
export class ExperiencesComponent implements OnInit {
  // Background timeline
  timelineNodes = Array.from({ length: 8 }, (_, i) => ({
    position: Math.random() * 100,
    delay: Math.random() * 3
  }));

  // Tunisie Télécom - Code preview
  telecomCode = [
    '@RestController',
    '@RequestMapping("/api/medical-reports")',
    'public class MedicalReportController {',
    '  @Autowired',
    '  private MedicalReportService service;',
    '  ',
    '  @GetMapping',
    '  public List<MedicalReport> getAll() {',
    '    return service.findAll();',
    '  }',
    '}'
  ];

  // Viore Digital - Design process
  designSteps = [
    { icon: '📋', label: 'Analyse' },
    { icon: '🎨', label: 'Design' },
    { icon: '⚡', label: 'Développement' },
    { icon: '🧪', label: 'Test' }
  ];

  // Hannibal Lease - Support metrics
  supportMetrics = [
    { value: '50+', label: 'Clients' },
    { value: '100%', label: 'Sécurité' },
    { value: '24/7', label: 'Support' }
  ];

  // Timeline horizontale
  timelineItems = [
    { year: '2022', role: 'IT Support', company: 'Hannibal Lease' },
    { year: '2024', role: 'Web Developer', company: 'Viore Digital' },
    { year: '2025', role: 'Full-Stack Dev', company: 'Tunisie Télécom' }
  ];

  ngOnInit() {
    // Initialisation des animations
    setTimeout(() => {
      this.initAnimations();
    }, 1000);
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
}