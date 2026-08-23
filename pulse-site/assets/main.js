// Pulse — shared front-end behavior. No frameworks, no build step.

async function loadArticles(){
  const res = await fetch(rootPath() + 'data/articles.json');
  return res.json();
}

// Computes relative path back to site root based on a data attribute on <body data-root="../">
function rootPath(){
  return document.body.getAttribute('data-root') || '';
}

function renderTickerFrom(articles){
  const el = document.getElementById('ticker');
  if(!el) return;
  const hot = articles.filter(a => a.hot).map(a => a.title);
  const items = hot.length ? [...hot, ...hot] : articles.slice(0,6).map(a=>a.title);
  el.innerHTML = '<span class="live-badge"><span class="pulse-dot"></span>LIVE</span>' +
    items.map(t => `<span><span class="dot"></span>${escapeHtml(t)}</span>`).join('');
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ---- Search page ----
async function initSearch(){
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if(!input || !results) return;
  const articles = await loadArticles();
  renderTickerFrom(articles);

  function run(){
    const q = input.value.trim().toLowerCase();
    if(!q){
      results.innerHTML = '<p class="page-sub">Start typing to search all articles by title, topic, or category.</p>';
      return;
    }
    const matches = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.dek.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
    if(matches.length === 0){
      results.innerHTML = '<p class="page-sub">No articles match “' + escapeHtml(input.value) + '”.</p>';
      return;
    }
    results.innerHTML = '<div class="grid">' + matches.map(a => `
      <div class="card ${a.hot ? 'hot' : ''}">
        <div class="card-cat">${escapeHtml(a.category)}<span class="heat"><span></span><span></span><span></span></span></div>
        <h3><a href="${rootPath()}articles/${a.slug}.html">${escapeHtml(a.title)}</a></h3>
        <p>${escapeHtml(a.dek)}</p>
        <div class="card-meta"><span>${a.read} read</span><span>${a.date}</span></div>
      </div>
    `).join('') + '</div>';
  }

  input.addEventListener('input', run);
  const params = new URLSearchParams(location.search);
  if(params.get('q')){
    input.value = params.get('q');
  }
  run();
}

// Ticker on any page that includes #ticker but isn't the search page
async function initTickerStandalone(){
  const el = document.getElementById('ticker');
  if(!el || el.dataset.source !== 'fetch') return;
  const articles = await loadArticles();
  renderTickerFrom(articles);
}

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initTickerStandalone();
});
