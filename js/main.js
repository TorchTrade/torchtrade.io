// ============================================
// TorchTrade.io — Main JS
// ============================================

// --- Theme Toggle ---
(function () {
  const THEME_KEY = 'torchtrade-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Sun for dark mode (click to go light), Moon for light mode (click to go dark)
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // Apply theme immediately (before DOM ready to prevent flash)
  setTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      updateToggleIcon(getPreferredTheme());
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();

// --- Mobile Nav Toggle ---
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-mobile-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    // Close mobile nav on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }
});

// --- Smooth scroll for anchor links ---
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// --- GitHub Stats ---
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.github.com/repos/TorchTrade/torchtrade')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var stars = document.getElementById('star-count');
      var forks = document.getElementById('fork-count');
      if (stars && data.stargazers_count != null) stars.textContent = data.stargazers_count;
      if (forks && data.forks_count != null) forks.textContent = data.forks_count;
    })
    .catch(function () { /* silently fail, keep -- placeholder */ });
});

// --- Intersection Observer for fade-in animations ---
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
});

// --- Coming Soon Modal ---
function showModal(type) {
  var modal = document.getElementById('coming-soon-modal');
  var title = document.getElementById('modal-title');
  var text = document.getElementById('modal-text');

  if (type === 'agent') {
    title.textContent = 'Agents Coming Soon';
    text.textContent = 'Our Claude Code agents are currently in development and will be available for purchase shortly. Follow us on GitHub to get notified when they launch.';
  } else if (type === 'article') {
    title.textContent = 'Research Coming Soon';
    text.textContent = 'Our research articles and experiment reports are currently being written. Follow us on GitHub to get notified when the first articles are published.';
  }

  modal.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('coming-soon-modal');
  var closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});
