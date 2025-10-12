// services/animation.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    initScrollAnimations() {
        if (!this.isBrowser) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer tous les éléments avec data-animate
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation pour les pourcentages
    animateCounter(element: HTMLElement, target: number, duration: number = 1500) {
        if (!this.isBrowser) return;

        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.round(start) + '%';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '%';
            }
        };

        updateCounter();
    }
}