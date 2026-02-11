/* ============================================
   Vintage Watches De Meesters — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initScrollAnimations();
  initParallax();
  initMobileNav();
});

/* ---------- Page Loader ---------- */
function initLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 300);
  });
  // Fallback: hide loader after 3s max
  setTimeout(() => loader.classList.add('loaded'), 3000);
}

/* ---------- Sticky Nav ---------- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---------- Mobile Nav Toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Scroll Animations (IntersectionObserver) ---------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ---------- Parallax Effect ---------- */
function initParallax() {
  const heroBgs = document.querySelectorAll('.hero-bg');
  if (!heroBgs.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        heroBgs.forEach(bg => {
          const speed = 0.4;
          bg.style.transform = `translateY(${scrolled * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ---------- Watch Data & Rendering ---------- */
// Read from localStorage if available (set by admin panel), otherwise use hardcoded defaults
const _hardcodedWatches = [
  {
    name: "Rolex Oyster Perpetual 36 mm blue dial",
    year: 2025,
    price: "€7.950,-",
    ref: "126000",
    condition: "Gedragen (zeer goed)",
    caliber: "3230",
    band: "Oyster steel",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1627037558426-c2d07beda3af?w=800&q=80"
  },
  {
    name: "Rolex Datejust 2 Black roman dial 116334",
    year: 2017,
    price: "€8.350,-",
    ref: "116334",
    condition: "Gedragen (zeer goed)",
    caliber: "3136",
    band: "Oyster steel",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80"
  },
  {
    name: "Rolex Yachtmaster blue dial",
    year: 2025,
    price: "€13.750,-",
    ref: "126622",
    condition: "Nieuw / Unworn",
    caliber: "3235",
    band: "Oyster bracelet (steel)",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80"
  },
  {
    name: "Rolex Submariner 16613 LB bluessy",
    year: 2007,
    price: "€10.495,-",
    ref: "16613 LB",
    condition: "Top condition",
    caliber: "3135",
    band: "Oyster bracelet (steel)",
    box: "Yes",
    paper: "No",
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=80"
  },
  {
    name: "Rolex Daytona white dial & baguettes",
    year: 2018,
    price: "€42.950,-",
    ref: "116528",
    condition: "Mint condition",
    caliber: "4130",
    band: "Oyster bracelet (gold)",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800&q=80"
  },
  {
    name: "Rolex Submariner Starbucks",
    year: 2025,
    price: "€13.400,-",
    ref: "126610LN",
    condition: "Gedragen (zeer goed)",
    caliber: "3235",
    band: "Oyster steel",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80"
  },
  {
    name: "Breitling Colt 33 MM",
    year: 2012,
    price: "€1.599,-",
    ref: "A7738711",
    condition: "Gedragen",
    caliber: "Quartz",
    band: "Steel",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&q=80"
  },
  {
    name: "Rolex GMT-Master 126710 BLNR",
    year: 2026,
    price: "€16.250,-",
    ref: "126710",
    condition: "New / Unworn",
    caliber: "3235",
    band: "Oyster bracelet (steel)",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"
  },
  {
    name: "Breitling Chronomat B13050.01 UTC",
    year: 1999,
    price: "€4.999,-",
    ref: "B13050.01",
    condition: "Gedragen (zeer goed)",
    caliber: "ETA Valjoux 7750",
    band: "Goud/staal",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1614946019068-8254921fe95b?w=800&q=80"
  },
  {
    name: "Rolex Datejust 126300 Azzurro oyster",
    year: 2025,
    price: "€8.995,-",
    ref: "126300",
    condition: "Gedragen (zeer goed)",
    caliber: "3235",
    band: "Steel",
    box: "Yes",
    paper: "No",
    image: "https://images.unsplash.com/photo-1639037687537-1f12e2088891?w=800&q=80"
  },
  {
    name: "Rolex Datejust 41 Blue Dial – Jubilee – Full Set",
    year: 2025,
    price: "€13.800,-",
    ref: "126334",
    condition: "New / Unworn",
    caliber: "3235",
    band: "Jubilee – full links",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1625043094520-5c1da4c4d9d5?w=800&q=80"
  },
  {
    name: "Rolex Datejust 126334 Blue dial",
    year: 2017,
    price: "€9.995,-",
    ref: "126334",
    condition: "Gedragen (zeer goed)",
    caliber: "3235",
    band: "Staal – full links",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1640955014216-9e3d26eef498?w=800&q=80"
  },
  {
    name: "Rolex Submariner 126610LN",
    year: 2023,
    price: "€11.800,-",
    ref: "126610LN",
    condition: "Goede Conditie",
    caliber: "3235",
    band: "Oyster – full links",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80"
  },
  {
    name: "Rolex Datejust 126234",
    year: 2026,
    price: "€11.800,-",
    ref: "126234",
    condition: "Topconditie",
    caliber: "3235",
    band: "Steel – full links",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1627037558426-c2d07beda3af?w=800&q=80"
  },
  {
    name: "Rolex GMT-Master Black Dial 116713LN",
    year: 2015,
    price: "€11.500,-",
    ref: "116713LN",
    condition: "Gedragen - Zeer goed",
    caliber: "3186",
    band: "Gold Steel",
    box: "Yes",
    paper: "Yes",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"
  },
  {
    name: "Rolex Oyster Perpetual 126000",
    year: 2023,
    price: "€5.995,-",
    ref: "126000",
    condition: "Gedragen",
    caliber: "3230",
    band: "Steel",
    box: "Yes",
    paper: "No",
    image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=800&q=80"
  }
];

// Use Firestore if available, otherwise fall back to hardcoded array
let watches = _hardcodedWatches;

function renderWatches(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = limit ? watches.slice(0, limit) : watches;

  container.innerHTML = items.map((watch, index) => `
    <div class="watch-card fade-up stagger-${(index % 6) + 1}">
      <div class="watch-card-image">
        <img src="${watch.image}" alt="${watch.name}" loading="lazy">
        <div class="watch-card-overlay"></div>
      </div>
      <div class="watch-card-body">
        <div class="watch-card-name">${watch.name}</div>
        <div class="watch-card-price">(${watch.year}) ${watch.price}</div>
        <div class="watch-card-specs">
          <div class="watch-card-spec">
            <div class="watch-card-spec-label">Referentie</div>
            <div class="watch-card-spec-value">${watch.ref}</div>
          </div>
          <div class="watch-card-spec">
            <div class="watch-card-spec-label">Staat</div>
            <div class="watch-card-spec-value">${watch.condition}</div>
          </div>
          <div class="watch-card-spec">
            <div class="watch-card-spec-label">Kaliber</div>
            <div class="watch-card-spec-value">${watch.caliber}</div>
          </div>
          <div class="watch-card-spec">
            <div class="watch-card-spec-label">Band</div>
            <div class="watch-card-spec-value">${watch.band}</div>
          </div>
        </div>
      </div>
      <div class="watch-card-footer">
        <a href="contact.html" class="btn btn-outline btn-small">Informatie</a>
      </div>
    </div>
  `).join('');

  // Re-initialize scroll animations for dynamically added elements
  initScrollAnimations();
}

// Auto-render: first show hardcoded data, then try Firestore
if (document.getElementById('watch-grid')) {
  renderWatches('watch-grid');
}
if (document.getElementById('featured-watches')) {
  renderWatches('featured-watches', 6);
}

// Load watches from Firestore (overrides hardcoded data when available)
if (typeof db !== 'undefined') {
  db.collection('watches').orderBy('order', 'asc').get()
    .then(function(snapshot) {
      if (!snapshot.empty) {
        watches = snapshot.docs.map(function(doc) {
          return doc.data();
        });
        // Re-render with Firestore data
        if (document.getElementById('watch-grid')) {
          renderWatches('watch-grid');
        }
        if (document.getElementById('featured-watches')) {
          renderWatches('featured-watches', 6);
        }
      }
    })
    .catch(function(err) {
      console.log('Firestore not available, using hardcoded watches');
    });
}

/* ---------- Smooth Scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================
   Analytics is now handled by Google Analytics 4
   Measurement ID: G-F31KW332BS
   ============================================ */
