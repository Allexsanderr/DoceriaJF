document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (menu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      const icon = toggle.querySelector('i');
      if(icon) icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // 2. Filtro de Produtos (Menu)
  const menuTabs = document.querySelectorAll('.menu-tab');
  const products = document.querySelectorAll('.product-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover active de todos
      menuTabs.forEach(t => t.classList.remove('active'));
      // Adicionar active no clicado
      tab.classList.add('active');

      const category = tab.dataset.category;

      products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
          product.style.display = 'block';
          // Pequena animação ao filtrar
          product.animate([
            { transform: 'scale(0.9)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
          ], {
            duration: 300,
            fill: 'forwards'
          });
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  // 3. Scroll Reveal (Animação ao rolar)
  const revealElements = document.querySelectorAll('.section h2, .product-card, .feature-item, .about-img, .about-text, .gallery-item, .testimonial-card, .contact-wrapper');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Opcional: parar de observar após revelar
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // 4. Header Sombra ao Rolar
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
    }
  });

  // 5. Botões de Carrinho (Simulação)
  const cartBtns = document.querySelectorAll('.btn-cart');
  cartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const title = card.querySelector('h3').innerText;
      
      // Feedback visual
      const originalIcon = this.innerHTML;
      this.innerHTML = '<i class="fa-solid fa-check"></i>';
      this.style.backgroundColor = 'var(--primary)';
      this.style.color = '#fff';
      
      alert(`Delícia adicionada: ${title} 🍰`);
      
      setTimeout(() => {
        this.innerHTML = originalIcon;
        this.style.backgroundColor = '';
        this.style.color = '';
      }, 2000);
    });
  });

  // 6. Fallback para Imagens (caso a API falhe)
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Se a imagem falhar, usa um placeholder bonito
      if (!this.dataset.hasError) {
        this.dataset.hasError = true;
        const width = this.clientWidth || 400;
        const height = this.clientHeight || 300;
        const text = this.alt || 'Doce Sabor';
        this.src = `https://placehold.co/${width}x${height}/d63384/ffffff?text=${encodeURIComponent(text)}`;
      }
    });
  });
  
  // Fallback para background-image do Hero
  const heroBg = document.querySelector('.hero-bg-img');
  if(heroBg) {
     const bgUrl = heroBg.style.backgroundImage.slice(5, -2);
     const img = new Image();
     img.src = bgUrl;
     img.onerror = function() {
        heroBg.style.backgroundImage = "url('https://placehold.co/1920x1080/5d4037/ffffff?text=Confeitaria+Doce+Sabor')";
     };
  }
});
