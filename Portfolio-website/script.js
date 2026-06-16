{/* <script> */}
/* ── Spotlight ── */
document.addEventListener('mousemove',e=>{
  document.getElementById('spotlight').style.background=`radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.08), transparent 70%)`;
});

/* ── Gallery data ── */
const galleries = {
  email:["https://shaik-sadiq29.github.io/email-assets/images/1.jpg","https://shaik-sadiq29.github.io/email-assets/images/2.jpg","https://shaik-sadiq29.github.io/email-assets/images/3.jpg","https://shaik-sadiq29.github.io/email-assets/images/4.jpg","https://shaik-sadiq29.github.io/email-assets/images/5.jpg","https://shaik-sadiq29.github.io/email-assets/images/6.jpg"],
  uiux:["https://shaik-sadiq29.github.io/email-assets/images/uiux-1.jpg","https://shaik-sadiq29.github.io/email-assets/images/uiux-2.jpg","https://shaik-sadiq29.github.io/email-assets/images/uiux-3.jpg","https://shaik-sadiq29.github.io/email-assets/images/uiux-5.jpg","https://shaik-sadiq29.github.io/email-assets/images/uiux-4.jpg","https://shaik-sadiq29.github.io/email-assets/images/uiux-6.jpg"],
  graphic:["https://shaik-sadiq29.github.io/email-assets/images/graphic-1.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-2.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-3.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-4.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-5.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-6.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-7.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-8.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-9.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-10.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-11.jpg","https://shaik-sadiq29.github.io/email-assets/images/graphic-12.webp","https://shaik-sadiq29.github.io/email-assets/images/graphic%2013.webp","https://shaik-sadiq29.github.io/email-assets/images/graphic%2015.png","https://shaik-sadiq29.github.io/email-assets/images/graphic-16.jpg"]
};
let activeGallery='email', cur=0;



/* ── Page navigation ── */

function showPage(name, btn) {

  // Close mobile menu
  closeMenu();

  // Hide all pages
  document.querySelectorAll('.page-section').forEach(s => {
    s.classList.remove('active');
  });

  // Show selected page
  document.getElementById('page-' + name).classList.add('active');

  // Reset nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.remove('active');
    a.style.opacity = '0.6';
  });

  // Activate clicked nav item
  if (btn) {
    btn.classList.add('active');
    btn.style.opacity = '1';
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

  // Trigger animations
  setTimeout(() => {
    initReveal('#page-' + name);
  }, 20);

  return false;
}


/* ── Mobile Menu ── */

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');

  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function openMenu() {
  const menu = document.getElementById('mobileMenu');

  if (menu) {
    menu.classList.remove('hidden');
  }
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');

  if (menu) {
    menu.classList.add('hidden');
  }
}

/* ── Intersection Observer for reveals ── */
function initReveal(scope){
  const els = document.querySelectorAll(scope+' .reveal');
  els.forEach(el=>{ el.classList.remove('visible'); });
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
  },{threshold:0.08});
  els.forEach(el=>obs.observe(el));
}

/* ── Lightbox ── */
function openLightbox(g,i){ activeGallery=g; cur=i; updateLb(); document.getElementById('lightbox').classList.add('active'); document.body.style.overflow='hidden'; }
function closeLightbox(){ document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow=''; }
function handleLightboxBg(e){ if(e.target===document.getElementById('lightbox')) closeLightbox(); }
function prevImg(e){ e.stopPropagation(); cur=(cur-1+galleries[activeGallery].length)%galleries[activeGallery].length; updateLb(); }
function nextImg(e){ e.stopPropagation(); cur=(cur+1)%galleries[activeGallery].length; updateLb(); }
function updateLb(){
  const img=document.getElementById('lbImg');
  img.style.opacity='0';
  setTimeout(()=>{ img.src=galleries[activeGallery][cur]; img.style.opacity='1'; },130);
  document.getElementById('lbCounter').textContent=(cur+1)+' / '+galleries[activeGallery].length;
}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('active')) return;
  if(e.key==='ArrowRight') nextImg(e);
  if(e.key==='ArrowLeft') prevImg(e);
  if(e.key==='Escape') closeLightbox();
});

// /* ── Menu ── */
// function openMenu(){ document.getElementById('menuPanel').classList.add('open'); }
// function closeMenu(){ document.getElementById('menuPanel').classList.remove('open'); }

/* ── Initial reveal ── */
setTimeout(()=>initReveal('#page-home'),100);
{/* </script> */}

