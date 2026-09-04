document.querySelector('.menu')?.addEventListener('click',e=>{const n=document.querySelector('.nav');const o=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o);e.currentTarget.textContent=o?'×':'☰'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav')?.classList.remove('open')));const header=document.querySelector('.site-header');const progress=()=>{const d=document.documentElement;const max=d.scrollHeight-d.clientHeight;header?.style.setProperty('--scroll-progress',max?`${Math.min(100,d.scrollTop/max*100)}%`:'0%')};addEventListener('scroll',progress,{passive:true});progress();const targets=document.querySelectorAll('.section-head,.service-card,.difference-visual,.difference-body,.step,.message-grid,.voice-card,.pricing-card,.article-card,.seo-grid article');targets.forEach(el=>el.dataset.reveal='');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});targets.forEach(el=>observer.observe(el))}else targets.forEach(el=>el.classList.add('is-visible'));

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
  social.innerHTML='<span class="social-label">OFFICIAL SOCIAL</span><div class="social-links"><a class="social-link social-instagram" href="https://www.instagram.com/em_planning801/" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg><span>Instagram</span></a><a class="social-link social-facebook" href="https://www.facebook.com/em.planning801/" target="_blank" rel="noopener noreferrer" aria-label="EM PLANNING公式Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z"></path></svg><span>Facebook</span></a></div>';
  footerBrand.appendChild(social);
}
