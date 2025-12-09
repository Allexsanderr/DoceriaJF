document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Navegação e Menu Mobile
     ========================================================================== */
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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      const icon = toggle.querySelector('i');
      if(icon) icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // Header Sombra ao Rolar
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });


  /* ==========================================================================
     2. Gerenciamento de Produtos (Dinâmico)
     ========================================================================== */
  // Produtos padrão
  const defaultProducts = [
    {
      name: "Bolo Trufado Real",
      category: "bolos",
      price: "120,00",
      desc: "Massa úmida de cacau 100%, recheio de ganache meio amargo e frutas vermelhas.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Close+up+shot+of+a+decadent+rich+chocolate+cake+with+ganache+and+berries%2C+professional+food+photography%2C+appetizing&image_size=square",
      badge: "Mais Vendido"
    },
    {
      name: "Torta de Morango",
      category: "tortas",
      price: "85,00",
      desc: "Base crocante de amêndoas, creme patissière aveludado e morangos frescos.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Gourmet+strawberry+tart+with+custard+cream%2C+fresh+strawberries%2C+mint+leaf%2C+elegant+presentation%2C+food+photography&image_size=square"
    },
    {
      name: "Caixa Degustação",
      category: "doces",
      price: "45,00",
      desc: "Seleção com 12 brigadeiros gourmet variados: Belga, Ninho, Churros e Pistache.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Brazilian+gourmet+brigadeiros+chocolate+truffles+with+sprinkles%2C+arranged+on+a+golden+tray%2C+high+quality&image_size=square"
    },
    {
      name: "Cupcakes Especiais",
      category: "bolos",
      price: "15,00",
      desc: "Massa fofinha de baunilha com cobertura de buttercream suíço e decoração em ouro.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elegant+vanilla+cupcake+with+pink+buttercream+frosting+and+edible+gold+dust%2C+soft+lighting&image_size=square"
    }
  ];

  // Carregar produtos (localStorage + Default)
  function loadProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const allProducts = [...defaultProducts, ...storedProducts];
    renderProducts(allProducts);
  }

  function renderProducts(products) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Limpa grid

    products.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.category = prod.category;
      
      card.innerHTML = `
        <div class="product-img">
          <img src="${prod.image}" alt="${prod.name}">
          ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <h3>${prod.name}</h3>
          <p class="desc">${prod.desc}</p>
          <div class="price-row">
            <span class="price">R$ ${prod.price}</span>
            <button class="btn-cart" aria-label="Adicionar" 
              data-name="${prod.name}" 
              data-price="${prod.price}" 
              data-img="${prod.image}">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-atribuir eventos aos botões
    attachCartEvents();
    
    // Re-aplicar animação de scroll nos novos elementos
    observeNewElements();
  }

  // Inicializar produtos
  loadProducts();

  // Filtro de Categorias
  const menuTabs = document.querySelectorAll('.menu-tab');
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      const products = document.querySelectorAll('.product-card');

      products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
          product.style.display = 'block';
          product.animate([
            { transform: 'scale(0.9)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
          ], { duration: 300, fill: 'forwards' });
        } else {
          product.style.display = 'none';
        }
      });
    });
  });


  /* ==========================================================================
     3. Carrinho e WhatsApp
     ========================================================================== */
  let cart = [];
  const cartModal = document.getElementById('cart-modal');
  const cartBtnNav = document.getElementById('btn-cart-nav');
  const cartCount = document.querySelector('.cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  function attachCartEvents() {
    document.querySelectorAll('.btn-cart').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = {
          name: this.dataset.name,
          price: this.dataset.price,
          image: this.dataset.img
        };
        addToCart(item);
        showToast('Produto adicionado! 🍰');
      });
    });
  }

  function addToCart(item) {
    cart.push(item);
    updateCartUI();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  function updateCartUI() {
    // Atualizar contador
    if (cartCount) cartCount.innerText = cart.length;

    // Atualizar lista
    if (cart.length === 0) {
      if (cartItemsContainer) cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio.</p>';
      if (cartTotalEl) cartTotalEl.innerText = 'R$ 0,00';
    } else {
      if (cartItemsContainer) cartItemsContainer.innerHTML = '';
      let total = 0;
      cart.forEach((item, index) => {
        // Limpar string de preço para somar
        const priceNum = parseFloat(item.price.replace('R$', '').replace(',', '.').replace('/kg', '').replace('/un', '').trim());
        total += priceNum;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">R$ ${item.price}</div>
          </div>
          <button class="cart-remove" onclick="removeCartItem(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(div);
      });
      if (cartTotalEl) cartTotalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }

  // Tornar global para acesso no onclick inline
  window.removeCartItem = removeFromCart;

  // Abrir/Fechar Modal Carrinho
  if (cartBtnNav) cartBtnNav.addEventListener('click', () => cartModal.classList.add('active'));
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });

  // Fechar ao clicar fora
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });

  // Finalizar no WhatsApp
  const btnCheckout = document.getElementById('btn-checkout');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      if (cart.length === 0) return alert('Seu carrinho está vazio!');
      
      let msg = `Olá! Gostaria de fazer um pedido na Doce Sabor:\\n\\n`;
      let total = 0;
      
      cart.forEach(item => {
        msg += `▪️ ${item.name} - R$ ${item.price}\\n`;
        const priceNum = parseFloat(item.price.replace('R$', '').replace(',', '.').replace('/kg', '').replace('/un', '').trim());
        total += priceNum;
      });
      
      msg += `\\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
      
      if (currentUser) {
        msg += `\\n\\n👤 *Cliente:* ${currentUser.name}`;
        
        // Adicionar pontos de fidelidade (1 pt a cada 10 reais)
        const pointsEarned = Math.floor(total / 10);
        addLoyaltyPoints(pointsEarned);
        msg += `\\n💎 Pontos ganhos nesta compra: ${pointsEarned}`;
      }
      
      const url = `https://wa.me/5532999999999?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      
      // Limpar carrinho após envio
      cart = [];
      updateCartUI();
      if (cartModal) cartModal.classList.remove('active');
    });
  }


  /* ==========================================================================
     4. Sistema de Login e Fidelidade
     ========================================================================== */
  let currentUser = null;
  const authModal = document.getElementById('auth-modal');
  const btnLogin = document.getElementById('btn-login');
  
  // Tabs Login/Cadastro
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(this.dataset.target).classList.add('active');
    });
  });

  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      if (currentUser) {
        // Logout
        if(confirm(`Sair da conta de ${currentUser.name}?`)) {
          logout();
        }
      } else {
        authModal.classList.add('active');
      }
    });
  }

  // Login Logic
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-pass').value;
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.pass === pass);
      
      if (user) {
        login(user);
        authModal.classList.remove('active');
      } else {
        alert('E-mail ou senha inválidos!');
      }
    });
  }

  // Register Logic
  const regForm = document.getElementById('register-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-pass').value;
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      if (users.find(u => u.email === email)) {
        alert('E-mail já cadastrado!');
        return;
      }
      
      const newUser = { name, email, pass, points: 0 };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      login(newUser);
      authModal.classList.remove('active');
      alert('Cadastro realizado com sucesso! Bem-vindo(a)!');
    });
  }

  function login(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateUserUI();
    showToast(`Bem-vindo, ${user.name}!`);
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserUI();
    showToast('Você saiu da conta.');
  }

  function updateUserUI() {
    if (!btnLogin) return;
    
    if (currentUser) {
      btnLogin.innerHTML = `
        <i class="fa-solid fa-user-check"></i>
        <span class="points-display">💎 ${currentUser.points} pts</span>
      `;
      btnLogin.title = `Olá, ${currentUser.name}`;
      btnLogin.style.color = "#ff1493";
    } else {
      btnLogin.innerHTML = '<i class="fa-regular fa-user"></i>';
      btnLogin.title = "Login / Cadastro";
      btnLogin.style.color = "";
    }
  }

  function addLoyaltyPoints(points) {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex > -1) {
      users[userIndex].points += points;
      currentUser.points += points;
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUserUI();
      
      setTimeout(() => showToast(`🎉 +${points} pontos de fidelidade!`), 2000);
    }
  }

  // Check logged in user on load
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUserUI();
  }


  /* ==========================================================================
     5. Utilitários (Toast, Reveal)
     ========================================================================== */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  // Scroll Reveal
  function observeNewElements() {
    const revealElements = document.querySelectorAll('.product-card:not(.reveal)');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // Initial Observer for static elements
  const staticRevealElements = document.querySelectorAll('.section h2, .feature-item, .about-img, .about-text, .gallery-item, .testimonial-card, .contact-wrapper');
  const staticObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staticObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  staticRevealElements.forEach(el => {
    el.classList.add('reveal');
    staticObserver.observe(el);
  });
  
  // Call initially for products
  observeNewElements();
});
