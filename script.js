// WarriorsCare — interactions partagées

// 1) Dès que l'APK est prêt et uploadé sur GitHub (ex: à la racine du repo),
//    renseigne son nom de fichier ici pour activer le téléchargement direct :
const APK_DOWNLOAD_URL = "https://expo.dev/artifacts/eas/fQJYqYLDRJp-cLe3CzLKu2Q-wjKbctsiUyOgZzzwHEI.apk";

// 2) Une fois l'application publiée sur le Play Store, renseigne son URL ici :
//    elle prendra automatiquement le dessus sur le téléchargement direct.
const PLAY_STORE_URL = null; // ex: "https://play.google.com/store/apps/details?id=com.audreyliyah.DrepanosMobile"

document.addEventListener('DOMContentLoaded', () => {
  const downloadUrl = PLAY_STORE_URL || APK_DOWNLOAD_URL;
  if (downloadUrl) {
    ['nav-download-btn', 'hero-download-btn'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.href = downloadUrl;
      if (PLAY_STORE_URL) {
        el.target = '_blank';
        el.rel = 'noopener';
        el.removeAttribute('download');
      } else {
        el.target = '_blank';
        el.rel = 'noopener';
        el.removeAttribute('download'); // ignoré de toute façon pour un lien externe (cross-origin)
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
