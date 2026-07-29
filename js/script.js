/*
  script.js
  Funcionalidad principal para la hoja de vida interactiva.
*/

document.addEventListener('DOMContentLoaded', () => {
  initializeAOS();
  initializeTypingEffect();
  initializeBackToTop();
  initializeMobileMenu();
  initializeCounters();
  initializeForm();
  initializeLanguageSwitcher();
});

function initializeAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
  });
}

function initializeTypingEffect() {
  const typingElement = document.getElementById('typingText');
  const phrases = ['Tecnólogo en Software', 'Desarrollador Front-end', 'Creador de experiencias digitales'];
  let currentPhrase = 0;
  let currentLetter = 0;
  let isDeleting = false;

  function type() {
    const phrase = phrases[currentPhrase];
    if (isDeleting) {
      typingElement.textContent = phrase.substring(0, currentLetter - 1);
      currentLetter -= 1;
    } else {
      typingElement.textContent = phrase.substring(0, currentLetter + 1);
      currentLetter += 1;
    }

    if (!isDeleting && currentLetter === phrase.length) {
      isDeleting = true;
      setTimeout(type, 1400);
      return;
    }

    if (isDeleting && currentLetter === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 80 : 120);
  }

  type();
}

function initializeBackToTop() {
  const button = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initializeMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

function initializeCounters() {
  const counters = document.querySelectorAll('.counter');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = Number(element.dataset.target) || 0;
  const duration = 1400;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(step);
}

function initializeForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Gracias por tu mensaje. Esta página es un prototipo y el formulario está listo para conectar con un backend.');
    form.reset();
  });
}

function initializeLanguageSwitcher() {
  const languageButtons = document.querySelectorAll('.lang-switcher');
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';

  translatePage(savedLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.dataset.lang;
      translatePage(selectedLanguage);
      localStorage.setItem('preferredLanguage', selectedLanguage);
    });
  });
}

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.education': 'Educación',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.tagline': 'Hoja de vida digital moderna',
    'hero.greeting': 'Hola, soy',
    'hero.professionLabel': 'Soy',
    'hero.ageLabel': 'Edad',
    'hero.locationLabel': 'Ubicación',
    'hero.download': 'Descargar CV',
    'hero.contact': 'Contactar',
    'about.label': 'Sobre mí',
    'about.title': 'Resumen profesional',
    'about.keyInfo': 'Información clave',
    'about.professionLabel': 'Profesión:',
    'about.ageLabel': 'Edad:',
    'about.emailLabel': 'Email:',
    'about.locationLabel': 'Ubicación:',
    'about.noteTitle': 'Nota',
    'about.noteText': 'Espacio reservado para agregar una descripción personal más extensa y única en el futuro.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.tagline': 'Modern digital resume',
    'hero.greeting': 'Hello, I am',
    'hero.professionLabel': 'I am',
    'hero.ageLabel': 'Age',
    'hero.locationLabel': 'Location',
    'hero.download': 'Download CV',
    'hero.contact': 'Contact',
    'about.label': 'About me',
    'about.title': 'Professional summary',
    'about.keyInfo': 'Key information',
    'about.professionLabel': 'Profession:',
    'about.ageLabel': 'Age:',
    'about.emailLabel': 'Email:',
    'about.locationLabel': 'Location:',
    'about.noteTitle': 'Note',
    'about.noteText': 'Space reserved to add a more detailed personal description in the future.',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'Обо мне',
    'nav.experience': 'Опыт',
    'nav.education': 'Образование',
    'nav.skills': 'Навыки',
    'nav.projects': 'Проекты',
    'nav.contact': 'Контакт',
    'hero.tagline': 'Современное цифровое резюме',
    'hero.greeting': 'Привет, я',
    'hero.professionLabel': 'Я',
    'hero.ageLabel': 'Возраст',
    'hero.locationLabel': 'Местоположение',
    'hero.download': 'Скачать CV',
    'hero.contact': 'Связаться',
    'about.label': 'Обо мне',
    'about.title': 'Профессиональное резюме',
    'about.keyInfo': 'Основная информация',
    'about.professionLabel': 'Профессия:',
    'about.ageLabel': 'Возраст:',
    'about.emailLabel': 'Email:',
    'about.locationLabel': 'Местоположение:',
    'about.noteTitle': 'Заметка',
    'about.noteText': 'Зарезервировано место для добавления более подробного личного описания в будущем.',
  },
};

function translatePage(language) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    const translation = translations[language]?.[key];
    if (!translation) return;

    if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
}

