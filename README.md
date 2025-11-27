# Barbearia TK DU CORTE — Resumo simples

Principais itens (sem detalhes):

- Agendamento externo no lugar de cadastro/login (CTA no topo e seção dedicada)
- Slider da assinatura com prev/next, auto‑play e abas
- Galeria de cortes com troca automática e pré‑carregamento
- Modal de vídeo que pausa ao fechar
- Imagens decorativas com opacidade
- Navegação com rolagem suave e estado ativo
- Comentários “Como editar” e blocos‑resumo em HTML/CSS/JS

## Rodar local

```bash
python -m http.server 8000
# abra http://localhost:8000/
```

## Enviar ao GitHub

```bash
git init
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git add .
git commit -m "Site TK DU CORTE: agendamento, slider, galeria, modal"
git push -u origin main
```

Notas rápidas:
- Procure por comentários “Como editar” para mudar textos, links e imagens.
- Lista do slider em `script.js` (names[]). Vídeo da estrutura em `index.html` (src).
