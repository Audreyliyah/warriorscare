// WarriorsCare — interactions partagées

// Dès que l'application est publiée sur le Play Store, renseignez son URL ici :
// les deux boutons "Télécharger" (nav + hero) pointeront automatiquement dessus.
const PLAY_STORE_URL = null; // ex: "https://play.google.com/store/apps/details?id=com.audreyliyah.DrepanosMobile"

document.addEventListener('DOMContentLoaded', () => {
  if (PLAY_STORE_URL) {
    ['nav-download-btn', 'hero-download-btn'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.href = PLAY_STORE_URL;
        el.target = '_blank';
        el.rel = 'noopener';
      }
    });
  }

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Révélation au défilement (cartes, dividers, visuel héros)
  const revealTargets = document.querySelectorAll('.reveal, .pulse-wrap');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  // Année dans le pied de page
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
