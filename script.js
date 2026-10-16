// Elenco dei campionati e delle squadre (stagione 2026/27).
const leagues = [
  {name:'Serie A', country:'Italia', teams:['Atalanta','Bologna','Cagliari','Como','Fiorentina','Frosinone','Genoa','Inter','Juventus','Lazio','Lecce','Milan','Monza','Napoli','Parma','Roma','Sassuolo','Torino','Udinese','Venezia']},
  {name:'Premier League', country:'Inghilterra', teams:['AFC Bournemouth','Arsenal','Aston Villa','Brentford','Brighton & Hove Albion','Chelsea','Coventry City','Crystal Palace','Everton','Fulham','Hull City','Ipswich Town','Leeds United','Liverpool','Manchester City','Manchester United','Newcastle United','Nottingham Forest','Sunderland','Tottenham Hotspur']},
  {name:'LaLiga', country:'Spagna', teams:['Athletic Club','Atlético de Madrid','CA Osasuna','Celta','Deportivo Alavés','Elche CF','FC Barcelona','Getafe CF','Levante UD','Málaga CF','Racing de Santander','Rayo Vallecano','RC Deportivo','RCD Espanyol','Real Betis','Real Madrid','Real Sociedad','Sevilla FC','Valencia CF','Villarreal CF']},
  {name:'Bundesliga', country:'Germania', teams:['FC Augsburg','1. FC Union Berlin','SV Werder Bremen','Borussia Dortmund','SV Elversberg','Eintracht Frankfurt','Sport-Club Freiburg','Hamburger SV','TSG Hoffenheim','1. FC Köln','RB Leipzig','Bayer 04 Leverkusen','1. FSV Mainz 05','Borussia Mönchengladbach','FC Bayern München','SC Paderborn 07','FC Schalke 04','VfB Stuttgart']},
  {name:'Ligue 1', country:'Francia', teams:['Angers SCO','AJ Auxerre','Stade Brestois 29','Le Havre AC','RC Lens','LOSC Lille','FC Lorient','Olympique Lyonnais','Le Mans FC','Olympique de Marseille','AS Monaco','OGC Nice','Paris FC','Paris Saint-Germain','Stade Rennais FC','RC Strasbourg Alsace','Toulouse FC','ESTAC Troyes']}
];
const nationalTeams = ['Italia','Argentina','Brasile','Francia','Germania','Spagna','Inghilterra','Portogallo','Paesi Bassi','Belgio','Uruguay','Giappone'];

// Modifica qui nomi, squadre, prezzi e foto delle maglie.
const products = [
  {name:'Real Madrid · Terza maglia 2024/25', detail:'Terza divisa · grigio scuro RMCF', league:'LaLiga', team:'Real Madrid', category:'maglia', price:'Prezzo da definire', tag:'FRONTE + RETRO', number:'', colors:['#111111','#777777'], imageFront:'assets/real-madrid-fronte.jpg', imageBack:'assets/real-madrid-retro.jpg'},
  {name:'Polo Brasile · Nera', detail:'Polo nera · fronte e retro', league:'Nazionali', team:'Brasile', category:'polo', price:'35 €', tag:'FRONTE + RETRO', imageFront:'assets/polo-brasile-fronte.jpg', imageBack:'assets/polo-brasile-retro.jpg'}
];

const grid = document.querySelector('#productGrid');
const emptyState = document.querySelector('#emptyState');
let activeLeague = '';
let activeTeam = '';
let activeCategory = '';

const leagueSections = document.querySelector('#leagueSections');
leagueSections.innerHTML = leagues.map(league => `
  <details class="league-panel">
    <summary><span class="league-name">${league.name}</span><span class="league-country">${league.country}</span><span class="league-count">${league.teams.length} squadre</span></summary>
    <div class="team-list">${league.teams.map(team => `<button class="team-button" type="button" data-league="${league.name}" data-team="${team}">${team}<span aria-hidden="true">↗</span></button>`).join('')}</div>
  </details>`).join('');
document.querySelector('#nationalTeams').innerHTML = nationalTeams.map(team => `<button class="team-button" type="button" data-league="Nazionali" data-team="${team}">${team}<span aria-hidden="true">↗</span></button>`).join('');

function updateSelection() {
  const selectionLabel = activeTeam ? `${activeLeague} · ${activeTeam}` : activeCategory === 'polo' ? 'Polo · tutti i modelli' : activeCategory === 'maglia' ? 'Maglie · tutte le squadre' : 'Tutto il catalogo · campionati, nazionali e polo';
  document.querySelector('#selectedTeam').textContent = selectionLabel;
  document.body.classList.toggle('polo-view', activeCategory === 'polo');
  document.querySelector('#allProducts').classList.toggle('is-active', !activeTeam && !activeCategory);
  document.querySelectorAll('.catalog-category-filter').forEach(button => button.classList.toggle('is-active', !activeTeam && button.dataset.category === activeCategory));
  document.querySelectorAll('.team-button').forEach(button => button.classList.toggle('is-active', button.dataset.team === activeTeam && button.dataset.league === activeLeague));
}

function renderCardList(targetGrid, items) {
  targetGrid.innerHTML = items.map(product => `
    <article class="product-card" role="button" tabindex="0" aria-label="Apri le foto: ${product.name}">
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        ${product.imageFront
          ? `<img class="product-photo" src="${product.imageFront}" alt="${product.name} vista frontale" loading="lazy">`
          : product.image
          ? `<img class="product-photo" src="${product.image}" alt="${product.name}" loading="lazy">`
          : `<div class="product-art" data-number="${product.number}" style="background:linear-gradient(100deg,${product.colors[0]},${product.colors[1]});" role="img" aria-label="Illustrazione segnaposto: ${product.name}"></div>`}
      </div>
      <div class="product-meta">
        <div><h3 class="product-name">${product.name}</h3><p class="product-detail">${product.detail}</p></div>
        <span class="product-price">${product.price}</span>
      </div>
      <p class="product-open-hint">Clicca per vedere le foto <span aria-hidden="true">↗</span></p>
    </article>`).join('');
  targetGrid.querySelectorAll('.product-card').forEach((card, index) => {
    const product = items[index];
    card.addEventListener('click', () => openGallery(product));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openGallery(product); }
    });
  });
}

function renderProducts() {
  const query = document.querySelector('#searchInput').value.trim().toLocaleLowerCase('it');
  const shown = products.filter(product => {
    const matchesTeam = !activeTeam || (product.team === activeTeam && product.league === activeLeague);
    const matchesCategory = !activeCategory || product.category === activeCategory;
    const matchesQuery = `${product.name} ${product.detail} ${product.team || ''} ${product.league || ''} ${product.category || ''}`.toLocaleLowerCase('it').includes(query);
    return matchesTeam && matchesCategory && matchesQuery;
  });
  renderCardList(grid, shown);
  document.querySelector('#productCount').textContent = String(shown.length).padStart(2, '0');
  emptyState.hidden = shown.length > 0;
  emptyState.textContent = activeTeam
    ? `Nessuna maglia di ${activeTeam} è ancora disponibile. Le foto e i prezzi saranno mostrati qui appena aggiunti al catalogo.`
    : 'Nessuna maglia trovata. Prova con un’altra ricerca.';
}

document.querySelectorAll('.team-button').forEach(button => button.addEventListener('click', () => {
  activeLeague = button.dataset.league;
  activeTeam = button.dataset.team;
  activeCategory = '';
  updateSelection();
  renderProducts();
  document.querySelector('#catalogo').scrollIntoView({behavior:'smooth', block:'start'});
}));
document.querySelector('#allProducts').addEventListener('click', () => {
  activeLeague = '';
  activeTeam = '';
  activeCategory = '';
  updateSelection();
  renderProducts();
});
document.querySelectorAll('.catalog-category-filter').forEach(button => button.addEventListener('click', () => {
  activeLeague = '';
  activeTeam = '';
  activeCategory = button.dataset.category;
  updateSelection();
  renderProducts();
}));
document.querySelector('#poloNavLink').addEventListener('click', () => {
  activeLeague = '';
  activeTeam = '';
  activeCategory = 'polo';
  updateSelection();
  renderProducts();
});
document.querySelector('#searchInput').addEventListener('input', renderProducts);
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts();

const galleryModal = document.querySelector('#galleryModal');
const galleryImage = document.querySelector('#galleryImage');
const galleryLabel = document.querySelector('#galleryLabel');
const galleryCount = document.querySelector('#galleryCount');
const galleryTitle = document.querySelector('#galleryTitle');
let galleryPhotos = [];
let galleryIndex = 0;
let lastGalleryTrigger = null;
let galleryAnimating = false;

function openGallery(product) {
  galleryPhotos = [];
  if (product.imageFront) galleryPhotos.push({src:product.imageFront, label:'FRONTE'});
  if (product.imageBack) galleryPhotos.push({src:product.imageBack, label:'RETRO'});
  if (product.image && galleryPhotos.length === 0) galleryPhotos.push({src:product.image, label:'FOTO'});
  if (galleryPhotos.length === 0) return;
  galleryPhotos.forEach(photo => { const preload = new Image(); preload.src = photo.src; });
  galleryIndex = 0;
  galleryAnimating = false;
  galleryImage.classList.remove('is-leaving', 'is-leaving-next', 'is-leaving-prev', 'is-entering', 'is-entering-next', 'is-entering-prev');
  lastGalleryTrigger = document.activeElement;
  galleryTitle.textContent = product.name;
  updateGallery();
  galleryModal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('#galleryClose').focus();
}

function updateGallery() {
  const photo = galleryPhotos[galleryIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = `${galleryTitle.textContent} · ${photo.label.toLowerCase()}`;
  galleryLabel.textContent = photo.label;
  galleryCount.textContent = `${galleryIndex + 1} / ${galleryPhotos.length}`;
  document.querySelector('#galleryPrev').hidden = galleryPhotos.length < 2;
  document.querySelector('#galleryNext').hidden = galleryPhotos.length < 2;
}

function changeGallery(direction) {
  if (galleryPhotos.length < 2 || galleryAnimating) return;
  galleryAnimating = true;
  galleryImage.classList.add('is-leaving', direction > 0 ? 'is-leaving-next' : 'is-leaving-prev');
  window.setTimeout(() => {
    galleryIndex = (galleryIndex + direction + galleryPhotos.length) % galleryPhotos.length;
    galleryImage.classList.remove('is-leaving', 'is-leaving-next', 'is-leaving-prev');
    galleryImage.classList.add('is-entering', direction > 0 ? 'is-entering-next' : 'is-entering-prev');
    let finished = false;
    const finishTransition = () => {
      if (finished) return;
      finished = true;
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        galleryImage.classList.remove('is-entering', 'is-entering-next', 'is-entering-prev');
        window.setTimeout(() => { galleryAnimating = false; }, 300);
      }));
    };
    galleryImage.addEventListener('load', finishTransition, {once:true});
    updateGallery();
    if (galleryImage.complete) finishTransition();
    window.setTimeout(finishTransition, 1200);
  }, 180);
}

function closeGallery() {
  galleryModal.hidden = true;
  document.body.style.overflow = '';
  lastGalleryTrigger?.focus();
}

document.querySelector('#galleryClose').addEventListener('click', closeGallery);
document.querySelector('#galleryNext').addEventListener('click', () => changeGallery(1));
document.querySelector('#galleryPrev').addEventListener('click', () => changeGallery(-1));
galleryModal.addEventListener('click', event => { if (event.target === galleryModal) closeGallery(); });
document.addEventListener('keydown', event => {
  if (galleryModal.hidden) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowRight') changeGallery(1);
  if (event.key === 'ArrowLeft') changeGallery(-1);
});

// L'intro parte solo dopo il clic: così il browser consente la riproduzione.
const intro = document.querySelector('#intro');
const video = document.querySelector('#introVideo');
const enterButton = document.querySelector('#enterButton');
const skipButton = document.querySelector('#skipButton');
const soundButton = document.querySelector('#soundButton');
let introClosed = false;

function showCatalog() {
  if (introClosed) return;
  introClosed = true;
  video.pause();
  intro.classList.add('is-hidden');
  document.body.classList.remove('intro-open');
  window.setTimeout(() => intro.remove(), 850);
}

function startIntro() {
  if (!video.querySelector('source') || video.error) {
    showCatalog();
    return;
  }
  intro.classList.add('has-video');
  document.querySelector('#introContent').hidden = true;
  skipButton.hidden = false;
  video.muted = true;
  soundButton.hidden = false;
  video.play().catch(() => showCatalog());
}

enterButton.addEventListener('click', startIntro);
skipButton.addEventListener('click', showCatalog);
video.addEventListener('ended', showCatalog);
video.addEventListener('error', () => { if (intro.classList.contains('has-video')) showCatalog(); });
soundButton.addEventListener('click', () => {
  video.muted = !video.muted;
  soundButton.textContent = video.muted ? 'Attiva audio' : 'Disattiva audio';
  soundButton.setAttribute('aria-label', video.muted ? 'Attiva audio del video' : 'Disattiva audio del video');
});

// La schermata d'ingresso resta visibile finché l'utente non sceglie di entrare o saltare.
skipButton.hidden = false;
