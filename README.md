# CurrencyDash - Conversor de Moedas

Conversor de moedas em tempo real com interface moderna, gráfico histórico e suporte multilíngue.

## 📸 Preview

![Preview do Projeto](conversorgif.gif)

## ✨ Funcionalidades

- **Conversão em Tempo Real** - Cotações atualizadas da AwesomeAPI
- **Gráfico Histórico** - Visualize tendências de 7 dias, 1 mês ou 1 ano
- **Multilíngue** - Suporte para Português, Inglês e Espanhol
- **Última Conversão** - Salva automaticamente sua última consulta
- **Design Moderno** - Interface dark mode responsiva e intuitiva
- **Acessível** - ARIA labels e semântica HTML adequada
- **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile

## 📁 Estrutura do Projeto

```
conversor-moedas/
├── index.html          # Estrutura HTML
├── style.css           # Estilos e responsividade
├── script.js           # Lógica e integração com API
└── README.md           # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Layout Grid/Flexbox, variáveis CSS, animações
- **JavaScript (ES6+)** - Async/await, LocalStorage, Fetch API
- **Chart.js** - Biblioteca para gráficos interativos
- **AwesomeAPI** - API pública de cotações
- **API Utilizada:**

Este projeto utiliza a [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) para obter cotações em tempo real:

- **Cotação Atual**: `https://economia.awesomeapi.com.br/json/last/{moeda1-moeda2}`
- **Histórico**: `https://economia.awesomeapi.com.br/json/daily/{moeda1-moeda2}/{dias}`

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para API e Chart.js CDN)