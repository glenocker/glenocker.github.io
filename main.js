// Lightweight progressive enhancements. The entire site remains usable without JavaScript.
(function(){
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.primary-nav');
  if(menu && nav){
    menu.addEventListener('click',()=>{
      const open=menu.getAttribute('aria-expanded')==='true';
      menu.setAttribute('aria-expanded',String(!open));
      menu.setAttribute('aria-label',open?'Open navigation':'Close navigation');
      nav.classList.toggle('is-open',!open);
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');
    }));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
  }
  const buttons=document.querySelectorAll('[data-filter]');
  const cards=document.querySelectorAll('[data-category]');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const type=btn.dataset.filter;
    buttons.forEach(b=>{const active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
    cards.forEach(card=>{card.hidden=type!=='All' && card.dataset.category!==type;});
  }));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();


// Accessible progressive-enhancement lightbox for project documentation.
(function(){
 const dialog=document.querySelector('.image-lightbox');
 if(!dialog || typeof dialog.showModal!=='function')return;
 const img=dialog.querySelector('.lightbox-image-wrap img');
 const caption=dialog.querySelector('.lightbox-caption');
 document.querySelectorAll('[data-lightbox]').forEach(link=>{
   link.addEventListener('click',e=>{
     e.preventDefault();
     img.src=link.href;
     img.alt=link.querySelector('img')?.alt||'Project photograph or CAD model';
     caption.textContent=link.closest('figure')?.querySelector('figcaption strong')?.textContent||'';
     dialog.showModal();
   });
 });
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{img.removeAttribute('src');});
})();


// Projects navigation uses native <details>/<summary> for keyboard and touch support.
(function(){
  const projectMenu=document.querySelector('[data-project-dropdown]');
  if(!projectMenu)return;
  document.addEventListener('click',event=>{
    if(projectMenu.open && !projectMenu.contains(event.target)) projectMenu.open=false;
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && projectMenu.open){
      projectMenu.open=false;
      projectMenu.querySelector('summary')?.focus();
      event.stopPropagation();
    }
  });
  projectMenu.querySelectorAll('.nav-project-link,.nav-all-link').forEach(link=>{
    link.addEventListener('click',()=>{projectMenu.open=false;});
  });
})();
