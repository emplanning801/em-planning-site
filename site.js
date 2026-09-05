if(!document.querySelector('.footer')){
  const base=location.pathname.includes('/blog/')?'../':'';
  const footer=document.createElement('footer');
  footer.className='footer';
  footer.innerHTML=`<div class="container"><div class="footer-grid"><div><div class="footer-brand">EM PLANNING</div><p>企業の成長ストーリーを共に創る</p></div><nav class="footer-nav"><a href="${base}index.html">HOME</a><a href="${base}service.html">SERVICE</a><a href="${base}blog.html">BLOG</a><a href="${base}company.html">COMPANY</a><a href="${base}contact.html">CONTACT</a></nav></div><div class="footer-meta"><span>株式会社EM PLANNING</span><span>© EM PLANNING</span></div></div>`;
  document.body.appendChild(footer);
}

const footerBrand=document.querySelector('.footer-brand')?.parentElement;
if(footerBrand&&!footerBrand.querySelector('.social-block')){
  const social=document.createElement('div');
  social.className='social-block';
  social.innerHTML='<span class="social-label">OFFICIAL SOCIAL</span><div class="social-links"><a class="social-link social-instagram" href="https://www.instagram.com/em_planning801/" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg><span>Instagram</span></a><a class="social-link social-facebook" href="https://www.facebook.com/em.planning801/" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z"></path></svg><span>Facebook</span></a><a class="social-link social-x" href="https://x.com/em_planning801" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4l14 16M19 4L5 20"></path></svg><span>X</span></a><a class="social-link social-tiktok" href="https://www.tiktok.com/@em_planning801" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.2a4.2 4.2 0 1 1-3.1-4V13a1.6 1.6 0 1 0 1 1.5V4h2Zm0 0c.7 2.5 2.2 4 5 4.4V11c-2-.1-3.6-.8-5-2"></path></svg><span>TikTok</span></a></div>';
  footerBrand.appendChild(social);
}

// Keep the primary navigation consistent on every page, including blog articles.
const path=location.pathname;
const base=path.includes('/blog/')?'../':'';
const current=path.split('/').pop()||'index.html';
const navItems=[
  ['index.html','HOME'],['service.html','SERVICE'],['solutions.html','SOLUTIONS'],
  ['price.html','PRICE'],['about.html','ABOUT'],['company.html','COMPANY'],
  ['blog.html','BLOG'],['contact.html','CONTACT']
];
document.querySelectorAll('.nav').forEach(nav=>{
  nav.innerHTML=navItems.map(([href,label])=>{
    const active=(current===href)||(current==='sales-support.html'&&href==='service.html')||(path.includes('/blog/')&&href==='blog.html');
    const classes=href==='contact.html'?' class="nav-cta"':'';
    return `<a${classes}${active?' aria-current="page"':''} href="${base}${href}">${label}</a>`;
  }).join('');
});
document.querySelectorAll('.footer-nav').forEach(nav=>{
  nav.innerHTML=[...navItems.slice(0,-1),['contact.html','CONTACT'],['privacy.html','PRIVACY']]
    .map(([href,label])=>`<a href="${base}${href}">${label}</a>`).join('');
});

// Make the global navigation work consistently on touch devices and article pages.
document.querySelectorAll('.site-header').forEach(siteHeader=>{
  const nav=siteHeader.querySelector('.nav');
  if(!nav)return;
  let menu=siteHeader.querySelector('.menu');
  if(!menu){
    menu=document.createElement('button');
    menu.className='menu';
    menu.type='button';
    menu.textContent='☰';
    siteHeader.querySelector('.header-inner')?.insertBefore(menu,nav);
  }
  const navId=nav.id||'primary-navigation';
  nav.id=navId;
  menu.setAttribute('aria-controls',navId);
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','メニューを開く');

  const closeMenu=()=>{
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','メニューを開く');
    menu.textContent='☰';
  };
  menu.addEventListener('click',()=>{
    const open=!nav.classList.contains('open');
    nav.classList.toggle('open',open);
    document.body.classList.toggle('nav-open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
    menu.textContent=open?'×':'☰';
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  addEventListener('resize',()=>{if(innerWidth>900)closeMenu()},{passive:true});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
});

const header=document.querySelector('.site-header');
const progress=()=>{const d=document.documentElement;const max=d.scrollHeight-d.clientHeight;header?.style.setProperty('--scroll-progress',max?`${Math.min(100,d.scrollTop/max*100)}%`:'0%')};
addEventListener('scroll',progress,{passive:true});
progress();

const targets=document.querySelectorAll('.section-head,.service-card,.difference-visual,.difference-body,.step,.message-grid,.voice-card,.pricing-card,.article-card,.seo-grid article');
targets.forEach(el=>el.dataset.reveal='');
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  targets.forEach(el=>observer.observe(el));
}else targets.forEach(el=>el.classList.add('is-visible'));

// Supply a canonical URL on legacy pages that do not yet declare one.
if(!document.querySelector('link[rel="canonical"]')){
  const canonical=document.createElement('link');
  canonical.rel='canonical';
  canonical.href=`https://emplanning801.github.io/em-planning-site/${path.split('/em-planning-site/')[1]||''}`;
  document.head.appendChild(canonical);
}
