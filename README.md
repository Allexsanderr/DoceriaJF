<div align="center">

  <!-- Typing SVG Header -->
  <img src="https://readme-typing-svg.herokuapp.com?font=Dancing+Script&size=50&duration=3000&pause=1000&color=D63384&center=true&vCenter=true&width=600&lines=Doceria+Doce+Sabor;Sabor+que+encanta;Sistema+de+Fidelidade;Painel+Administrativo;Checkout+WhatsApp" alt="Typing SVG" />

  <!-- Banner -->
  <img src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+photography+of+a+luxurious+confectionery+counter+filled+with+delicious+gourmet+cakes+and+pastries%2C+bright+lighting%2C+pastel+colors%2C+high+resolution%2C+4k&image_size=landscape_16_9" alt="Banner" width="100%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(214, 51, 132, 0.3);">

  <br><br>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/LocalStorage-Success?style=for-the-badge&logo=database&logoColor=white&color=28a745" />
  <img src="https://img.shields.io/badge/WhatsApp_API-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Completed-blue?style=for-the-badge" />

  <br><br>

  <p style="font-size: 1.2em; color: #5d4037; max-width: 800px; margin: 0 auto;">
    <i><b>Doceria Doce Sabor</b> é uma aplicação web completa de e-commerce para confeitarias artesanais. O projeto simula uma experiência real de compra online, desde a vitrine de produtos até o checkout integrado com WhatsApp, incluindo um sistema de fidelidade para clientes e um painel administrativo para gestão do catálogo.</i>
  </p>

</div>

---

## 📑 **Índice**

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
  - [Para o Cliente](#para-o-cliente)
  - [Para o Administrador](#para-o-administrador)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Guia de Instalação e Uso](#-guia-de-instalação-e-uso)
- [Detalhes Técnicos](#-detalhes-técnicos)
- [Galeria](#-galeria)
- [Autor](#-autor)

---

## 🍰 **Sobre o Projeto**

Este projeto foi desenvolvido com o objetivo de criar uma **solução digital leve e eficiente** para pequenos negócios de confeitaria. Diferente de plataformas complexas que exigem backend pesado, o **Doce Sabor** utiliza o poder do navegador (**LocalStorage**) para persistir dados de produtos, usuários e sessões, oferecendo uma experiência rápida e funcional sem custos de servidor.

O design foi cuidadosamente pensado para transmitir sofisticação e apetite, utilizando uma paleta de cores inspirada em chocolate e frutas vermelhas.

---

## ✨ **Funcionalidades**

### **Para o Cliente**
1.  **Vitrine Interativa**:
    *   Filtragem de produtos por categoria (Bolos, Doces, Tortas) com animações suaves.
    *   Visualização detalhada com preço, descrição e imagem.
2.  **Carrinho de Compras Dinâmico**:
    *   Adição e remoção de itens em tempo real.
    *   Cálculo automático do total.
    *   Persistência de estado (o carrinho não se perde ao navegar).
3.  **Sistema de Login e Fidelidade**:
    *   **Cadastro/Login**: Sistema de autenticação simulado.
    *   **Pontos**: A cada **R$ 10,00** em compras, o cliente ganha **1 ponto** de fidelidade.
    *   **Feedback**: Notificações visuais (Toasts) ao ganhar pontos.
4.  **Checkout via WhatsApp**:
    *   Ao finalizar o pedido, o sistema monta uma mensagem formatada com todos os itens, total e dados do cliente.
    *   Abre automaticamente o WhatsApp da loja para envio do pedido.

### **Para o Administrador**
1.  **Painel de Gestão (`admin.html`)**:
    *   Interface exclusiva para cadastro de produtos.
    *   Formulário completo: Nome, Preço, Categoria, Imagem (URL) e Descrição.
    *   **Listagem e Exclusão**: Visualize e remova produtos do catálogo facilmente.
2.  **Atualização Instantânea**:
    *   Produtos cadastrados no painel aparecem imediatamente na loja principal.

---

## 🛠 **Tecnologias Utilizadas**

*   **HTML5 Semântico**: Estrutura acessível e organizada.
*   **CSS3 Moderno**:
    *   **Flexbox & Grid Layout**: Para responsividade total.
    *   **CSS Variables**: Para fácil manutenção de temas.
    *   **Animations (@keyframes)**: Para modais e transições.
    *   **Media Queries**: Compatibilidade com Mobile, Tablet e Desktop.
*   **JavaScript (ES6+)**:
    *   **DOM Manipulation**: Atualização dinâmica da interface.
    *   **LocalStorage API**: "Banco de dados" no navegador para produtos e usuários.
    *   **Event Listeners**: Interatividade rica.
*   **FontAwesome**: Ícones vetoriais.
*   **Google Fonts**: Tipografias *Dancing Script* (títulos), *Playfair Display* e *Lato*.

---

## 📂 **Estrutura do Projeto**

```text
DoceriaJF/
│
├── index.html          # Página Principal (Loja, Vitrine, Login, Carrinho)
├── admin.html          # Painel Administrativo (Gestão de Produtos)
├── styles.css          # Folha de Estilos Global (Design System)
├── script.js           # Lógica do Sistema (Carrinho, Auth, Admin, WhatsApp)
├── README.md           # Documentação do Projeto
│
└── .vercel/            # Configurações de Deploy (Opcional)
```

---

## 🚀 **Guia de Instalação e Uso**

Não é necessário instalar dependências (Node.js, Python, etc.) para rodar o projeto básico, pois ele é estático.

### **1. Clonar o Repositório**
```bash
git clone https://github.com/Allexsanderr/DoceriaJF.git
cd DoceriaJF
```

### **2. Executar**
Basta abrir o arquivo `index.html` em seu navegador (Chrome, Firefox, Edge).

*Para uma melhor experiência (evitar bloqueios de CORS em alguns navegadores), recomenda-se usar um servidor local simples:*

**Com Python:**
```bash
python -m http.server 8000
# Acesse http://localhost:8000
```

**Com VS Code (Live Server):**
- Instale a extensão "Live Server".
- Clique com botão direito em `index.html` -> "Open with Live Server".

### **3. Utilizando o Sistema**

**Como Administrador:**
1.  Acesse `admin.html` (ou clique no link oculto/direto se houver).
2.  Preencha os dados de um novo produto (ex: "Bolo de Cenoura", "25,00", URL da imagem).
3.  Clique em "Salvar".
4.  Vá para a página inicial e veja seu produto lá!

**Como Cliente:**
1.  Clique no ícone de **Usuário** no topo e faça um cadastro rápido.
2.  Navegue pelo menu e adicione itens ao carrinho.
3.  Clique no ícone do **Carrinho** e depois em "Finalizar Pedido".
4.  Veja a mágica acontecer no WhatsApp!

---

## 🎨 **Detalhes Técnicos de Design**

### **Paleta de Cores**
| Cor | Hex | Uso |
| :--- | :--- | :--- |
| **Deep Pink** | `#ff1493` | Botões primários, Destaques, Hover |
| **Hot Pink** | `#ff69b4` | Detalhes secundários, Ícones |
| **Brown** | `#5d4037` | Textos principais, Títulos (Contraste) |
| **Lavender Blush** | `#fff0f5` | Fundos alternados, Áreas suaves |
| **Gold** | `#ffc107` | Estrelas de avaliação |

### **Tipografia**
*   **Títulos Decorativos**: *Dancing Script* (Traz a sensação de "feito à mão").
*   **Cabeçalhos Elegantes**: *Playfair Display* (Sofisticação clássica).
*   **Corpo de Texto**: *Lato* (Legibilidade moderna).

---

## 📸 **Galeria**

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Vitrine & Hero</b></td>
      <td align="center"><b>Carrinho & Checkout</b></td>
    </tr>
    <tr>
      <td><img src="videos/video1.gif" width="100%" style="border-radius: 10px;" /></td>
      <td><img src="videos/video2.gif" width="100%" style="border-radius: 10px;" /></td>
    </tr>
  </table>
</div>

---

## 👤 **Autor**

<div align="center">
  <img src="https://avatars.githubusercontent.com/Allexsanderr" width="100px;" style="border-radius: 50%;"/>
  <br />
  <b>Allexsanderr</b>
  <br />
  <br />
  <a href="https://github.com/Allexsanderr" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</div>

---

<div align="center">
  <sub>Desenvolvido para fins educacionais e de portfólio. © 2024 Doceria Doce Sabor.</sub>
</div>
