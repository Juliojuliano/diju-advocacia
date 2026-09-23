# DiJu Advocacia — Site institucional

Site institucional para a DiJu Advocacia, escritório fictício de advocacia
em Diadema, SP. HTML/CSS/JS puro, sem framework e sem etapa de build.
Responsivo de 320px (celulares pequenos) até telas grandes de desktop —
testado em viewports de Android, iPhone, tablet e desktop.

## Estrutura do projeto

```
├── index.html            # Página única com todas as seções
├── assets/
│   ├── css/styles.css    # Design system (cores, tipografia, componentes)
│   ├── js/main.js        # Menu mobile, formulário, acordeão de FAQ, etc.
│   └── img/               # Marca e ilustrações em SVG (vetorial, leve)
├── robots.txt
└── sitemap.xml
```

## Como rodar localmente

Não precisa de Node, nem de build. Qualquer servidor estático funciona:

```bash
python3 -m http.server 8080
# depois abra http://localhost:8080
```

Ou abra `index.html` direto no navegador.

## Dados de exemplo (trocar antes de publicar para o cliente final)

Este site foi entregue com dados de contato **fictícios**, para que o
layout possa ser avaliado antes de ter as informações reais do
escritório. Antes de publicar oficialmente, procure e substitua:

| Dado | Valor de exemplo usado | Onde aparece |
|---|---|---|
| Telefone / WhatsApp | `(11) 00000-1234` | Header, seção Contato, rodapé, botão flutuante |
| E-mail | `contato@dijuadvocacia.adv.br` | Seção Contato, rodapé |
| Endereço | Alameda das Nações — Centro, Diadema/SP | Seção Contato, rodapé |
| Nomes da equipe | Jota Jota, Penélope Petter, Assuero Radassa | Seção Sobre e Equipe |
| Números de OAB | `1111111` (mesmo número nos três) | Seção Equipe |
| Depoimentos | R. Almeida, M. Bezerra, C. Duarte | Seção Depoimentos |

Busque por esses termos em `index.html` — todos aparecem em texto puro,
sem nenhuma lógica escondida.

### Telefone e WhatsApp

O número também está centralizado em `assets/js/main.js`, no topo do
arquivo:

```js
var CONFIG = {
  WHATSAPP_NUMBER: "5511000001234", // só dígitos, com DDI 55 + DDD
  FORM_ENDPOINT: "",
};
```

### Formulário de contato

O formulário valida os campos no navegador (nome, e-mail, telefone,
mensagem e consentimento) e tem proteção anti-spam por honeypot. Ele só
envia de verdade quando `CONFIG.FORM_ENDPOINT` estiver configurado:

1. Crie uma conta gratuita em [Formspree](https://formspree.io) (ou
   serviço equivalente).
2. Copie o endpoint gerado (algo como `https://formspree.io/f/xxxxxxxx`).
3. Cole em `CONFIG.FORM_ENDPOINT` no topo de `assets/js/main.js`.

Enquanto não houver endpoint configurado, o formulário orienta o
visitante a usar o WhatsApp em vez de fingir que a mensagem foi
enviada — evita prometer um envio que não está de fato acontecendo.

### Mapa

A seção de Contato usa um embed do Google Maps centrado em "Diadema, SP"
(sem marcador exato, já que o endereço não tem número). Quando o
escritório tiver um endereço completo, troque o `src` do `iframe` em
`index.html` pela URL de incorporação gerada pelo próprio Google Maps
("Compartilhar" → "Incorporar um mapa"). Também existe um link "Abrir no
Google Maps" logo abaixo do mapa, que funciona mesmo se o navegador do
visitante bloquear o iframe.

## SEO

Em `index.html`, revise `<title>`, `<meta name="description">`, as tags
Open Graph e o `<link rel="canonical">`. Atualize também `robots.txt` e
`sitemap.xml` com o domínio final.

## Acessibilidade

- Skip link, `aria-live` no status do formulário, `alt` vazio apenas em
  imagens puramente decorativas, ícones com `aria-hidden`.
- Navegação 100% por teclado (menu mobile, FAQ em `<details>`, formulário).
- Contraste conferido nos temas claro e escuro do site (fundo marfim /
  fundo azul-marinho).
- Respeita `prefers-reduced-motion` (desativa scroll suave e animações
  de entrada).

## Deploy

Site estático — pode ser publicado em qualquer um destes serviços:

- **GitHub Pages** (Settings → Pages → Source: `main` / `/ (root)`)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
