/* =============================================
   Nexvora HR Consultancy — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────
  // Navbar Scroll Effect
  // ─────────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─────────────────────────────────────
  // Mobile Navigation Toggle
  // ─────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(7px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ─────────────────────────────────────
  // Active Nav Link on Scroll
  // ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ─────────────────────────────────────
  // Smooth Scroll for Anchor Links
  // ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────
  // Intersection Observer — Scroll Animations
  // ─────────────────────────────────────
  const animElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animElements.forEach(el => observer.observe(el));

  // ─────────────────────────────────────
  // Hero Stats Counter Animation
  // ─────────────────────────────────────
  const statNumbers = document.querySelectorAll('.hero-stat-number');
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        stat.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target + '+';
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Observe hero stats
  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStatsSection);
  }

  // ─────────────────────────────────────
  // Service Cards — Hover Lift with Shadow
  // ─────────────────────────────────────
  const serviceCards = document.querySelectorAll('.service-card:not(.featured):not(.featured-dark)');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 15px 45px rgba(0,0,0,0.12)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  // ─────────────────────────────────────
  // Team Cards — Image Tilt on Hover
  // ─────────────────────────────────────
  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -6;
      const rotateY = (x - 0.5) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─────────────────────────────────────
  // Parallax on Hero Background
  // ─────────────────────────────────────
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
      }
    });
  }

  // ─────────────────────────────────────
  // WhatsApp Button Pulse
  // ─────────────────────────────────────
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    setInterval(() => {
      whatsappBtn.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.6)';
      setTimeout(() => {
        whatsappBtn.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
      }, 1000);
    }, 3000);
  }

  // ─────────────────────────────────────
  // Page Load Animation
  // ─────────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Trigger hero animations after load
    setTimeout(() => {
      document.querySelectorAll('.hero-left .fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 300);
  });

  console.log('🏢 Nexvora HR Consultancy — Website initialized');
});
