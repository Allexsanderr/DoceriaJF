/* Bloco-resumo (JavaScript)
   O que faz: Controla navegação, galeria automática, modal de vídeo e slider da assinatura.
   Como alterar:
   - Rolagem suave: mantenha os seletores em .nav-menu a para funcionar nos links de seção.
   - Galeria: adicione imagens corte-1.jpg..corte-20.jpg; troque o intervalo editando setInterval (3000 ms).
   - Modal: o botão ✕ fecha e pausa o vídeo; você pode iniciar o modal editando CSS/JS.
   - Slider: atualize a lista names[] com suas imagens; tempo de auto-play é 5000 ms.
*/

// 1) Menu mobile: quando clicar abre/fecha o menu
const toggle=document.querySelector('.nav-toggle');
const menu=document.querySelector('.nav-menu');
if(toggle){toggle.addEventListener('click',()=>menu.classList.toggle('open'))}
// Guardamos todos os links do menu
const navLinks=[...document.querySelectorAll('.nav-menu a')];
// Função simples para destacar o link da seção atual
function setActiveLink(id){navLinks.forEach(l=>{const href=l.getAttribute('href');l.classList.toggle('active',href===id)})}
// Clique nos links: rolagem suave até a seção
navLinks.forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id.startsWith('#')){e.preventDefault();const el=document.querySelector(id);if(el){window.scrollTo({top:el.offsetTop-10,behavior:'smooth'})}menu.classList.remove('open');setActiveLink(id)}})});
// Descobrir qual seção está visível enquanto rola a página
const sections=[...document.querySelectorAll('section[id]')];
window.addEventListener('scroll',()=>{const y=window.scrollY+80;let current='#home';for(const s of sections){if(y>=s.offsetTop){current='#'+s.id}}setActiveLink(current)});


// 2) Galeria de cortes: troca automática das imagens com efeito suave
const gal=document.querySelector('#galeria .gallery');
if(gal){
  // Como editar: adicione arquivos imagens/corte-1.jpg até corte-20.jpg
  const slots=[...gal.querySelectorAll('img')];
  const fallback='imagens/03_port_03-min.jpg';
  const candidates=[];for(let i=1;i<=20;i++){candidates.push(`imagens/corte-${i}.jpg`)}
  const preload=src=>new Promise(res=>{const im=new Image();im.onload=()=>res(src);im.onerror=()=>res(null);im.src=src});
  Promise.all(candidates.map(preload)).then(arr=>{
    let list=arr.filter(Boolean);
    if(list.length===0){list=[fallback,fallback,fallback]}
    let idx=0;
    const change=(img,src)=>{
      img.classList.add('fade');
      const tmp=new Image();
      tmp.onload=()=>{img.src=src;img.alt='Corte';setTimeout(()=>img.classList.remove('fade'),150)};
      tmp.onerror=()=>{img.src=fallback;setTimeout(()=>img.classList.remove('fade'),150)};
      tmp.src=src;
    };
    const update=()=>{for(let i=0;i<slots.length;i++){const s=list[(idx+i)%list.length];change(slots[i],s)}};
    update();
    setInterval(()=>{idx=(idx+1)%list.length;update()},3000);
  })
}
// (Removido) Grid de promoções/Instagram

// 3) Modal de vídeo promocional: fechar e pausar quando clicar no X
const promoModal=document.getElementById('promo-modal');
const promoVideo=document.getElementById('promo-video');
const promoClose=document.getElementById('promo-close');
if(promoClose){promoClose.addEventListener('click',()=>{promoModal.classList.remove('open');if(promoVideo)promoVideo.pause()})}
// 4) Slider da seção de assinatura: navegação e troca automática de imagem
const assinaturaSlider=document.getElementById('assinatura-slider');
if(assinaturaSlider){
  const imgEl=assinaturaSlider.querySelector('.slider-image');
  const prevBtn=assinaturaSlider.querySelector('.prev');
  const nextBtn=assinaturaSlider.querySelector('.next');
  // Como editar: lista de imagens do slider de assinatura
  const names=[
    "imagens/💈 OFERTA IMPERDÍVEL NA TK DU CORTE! 💥Imagina cortar o cabelo quantas vezes quiser pagando o va.jpg",
    "imagens/💈 OFERTA IMPERDÍVEL NA TK DU CORTE! 💥Imagina cortar o cabelo quantas vezes quiser pagando o va (1).jpg",
    "imagens/💈 OFERTA IMPERDÍVEL NA TK DU CORTE! 💥Imagina cortar o cabelo quantas vezes quiser pagando o va (2).jpg",
    "imagens/💈 OFERTA IMPERDÍVEL NA TK DU CORTE! 💥Imagina cortar o cabelo quantas vezes quiser pagando o va (3).jpg"
  ];
  const fallbacks=["imagens/corte-1.jpg","imagens/corte-2.jpg","imagens/corte-3.jpg","imagens/corte-4.jpg","imagens/corte-5.jpg"]; 
  const srcs=names.map(n=>encodeURI(n));
  let idx=0;
  function setSrc(i){const s=srcs[i%srcs.length];imgEl.src=s;imgEl.alt='Corte Assinatura Mensal'}
  imgEl.addEventListener('error',()=>{const s=fallbacks.find(()=>true);imgEl.src=s});
  setSrc(idx);
  const tabs=document.querySelectorAll('#assinatura-tabs .slider-tab');
  function updateActiveTab(){tabs.forEach(t=>t.classList.toggle('active',Number(t.dataset.index)===idx))}
  // Botões de navegação manual
  prevBtn.addEventListener('click',()=>{idx=(idx-1+srcs.length)%srcs.length;setSrc(idx);updateActiveTab()});
  nextBtn.addEventListener('click',()=>{idx=(idx+1)%srcs.length;setSrc(idx);updateActiveTab()});
  // Troca automática a cada 5s (pausa ao passar o mouse)
  let timer;function startAuto(){stopAuto();timer=setInterval(()=>{idx=(idx+1)%srcs.length;setSrc(idx);updateActiveTab()},5000)}
  function stopAuto(){if(timer){clearInterval(timer);timer=null}}
  assinaturaSlider.addEventListener('mouseenter',stopAuto);
  assinaturaSlider.addEventListener('mouseleave',startAuto);
  startAuto();
  // Atalhos do teclado ← →
  window.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){nextBtn.click()}else if(e.key==='ArrowLeft'){prevBtn.click()}})
  // Clique nas abas abaixo do slider
  tabs.forEach(t=>{t.addEventListener('click',()=>{stopAuto();idx=Number(t.dataset.index)||0;setSrc(idx);updateActiveTab();startAuto()})});
  updateActiveTab();
}
