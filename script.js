const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultValue = document.getElementById('resultValue');
const ctx = document.getElementById('currencyChart').getContext('2d');
const languageSelect = document.getElementById('languageSelect');

let currencyChart;
let selectedPeriod = 7;
let currentLanguage = localStorage.getItem('language') || 'pt';

// Traduções
const translations = {
    pt: {
        'subtitle': 'Cotações em tempo real e histórico do mercado',
        'converter-title': 'Conversor Dinâmico',
        'value-label': 'Valor',
        'from-label': 'De',
        'to-label': 'Para',
        'convert-btn': 'Converter',
        'history-title': 'Tendência de Mercado',
        'last-update': 'Última atualização:',
        '7days-btn': '7 Dias',
        '1month-btn': '1 Mês',
        '1year-btn': '1 Ano',
        'different-currencies': 'Escolha moedas diferentes',
        'invalid-value': 'Valor inválido',
        'loading': 'Carregando...',
        'pair-unavailable': 'Par de moedas não disponível',
        'fetch-error': 'Erro ao buscar',
        'select-different': 'Selecione moedas diferentes!',
        'already-favorite': 'Este par já está nos favoritos!',
        'currency-usd': 'Dólar EUA (USD)',
        'currency-brl': 'Real (BRL)',
        'currency-eur': 'Euro (EUR)',
        'currency-gbp': 'Libra (GBP)',
        'currency-cad': 'Dólar Canadense (CAD)',
        'currency-ars': 'Peso Argentino (ARS)',
        'currency-jpy': 'Iene (JPY)',
        'currency-cny': 'Yuan (CNY)',
        'currency-xau': 'Ouro (XAU)',
        'currency-btc': 'Bitcoin (BTC)',
        'chart-label': 'Cotação',
        'last-conversion-label': 'Última conversão:',
        'footer-developed': 'Desenvolvido por'
    },
    en: {
        'subtitle': 'Real-time quotes and market history',
        'converter-title': 'Dynamic Converter',
        'value-label': 'Amount',
        'from-label': 'From',
        'to-label': 'To',
        'convert-btn': 'Convert',
        'history-title': 'Market Trend',
        'last-update': 'Last updated:',
        '7days-btn': '7 Days',
        '1month-btn': '1 Month',
        '1year-btn': '1 Year',
        'different-currencies': 'Choose different currencies',
        'invalid-value': 'Invalid value',
        'loading': 'Loading...',
        'pair-unavailable': 'Currency pair unavailable',
        'fetch-error': 'Error fetching data',
        'select-different': 'Select different currencies!',
        'already-favorite': 'This pair is already in favorites!',
        'currency-usd': 'US Dollar (USD)',
        'currency-brl': 'Brazilian Real (BRL)',
        'currency-eur': 'Euro (EUR)',
        'currency-gbp': 'Pound Sterling (GBP)',
        'currency-cad': 'Canadian Dollar (CAD)',
        'currency-ars': 'Argentine Peso (ARS)',
        'currency-jpy': 'Yen (JPY)',
        'currency-cny': 'Yuan (CNY)',
        'currency-xau': 'Gold (XAU)',
        'currency-btc': 'Bitcoin (BTC)',
        'chart-label': 'Rate',
        'last-conversion-label': 'Last conversion:',
        'footer-developed': 'Developed by'
    },
    es: {
        'subtitle': 'Cotizaciones en tiempo real e historial del mercado',
        'converter-title': 'Conversor Dinámico',
        'value-label': 'Valor',
        'from-label': 'De',
        'to-label': 'Para',
        'convert-btn': 'Convertir',
        'history-title': 'Tendencia del Mercado',
        'last-update': 'Última actualización:',
        '7days-btn': '7 Días',
        '1month-btn': '1 Mes',
        '1year-btn': '1 Año',
        'different-currencies': 'Elija monedas diferentes',
        'invalid-value': 'Valor inválido',
        'loading': 'Cargando...',
        'pair-unavailable': 'Par de monedas no disponible',
        'fetch-error': 'Error al obtener datos',
        'select-different': '¡Seleccione monedas diferentes!',
        'already-favorite': '¡Este par ya está en favoritos!',
        'currency-usd': 'Dólar EUA (USD)',
        'currency-brl': 'Real (BRL)',
        'currency-eur': 'Euro (EUR)',
        'currency-gbp': 'Libra Esterlina (GBP)',
        'currency-cad': 'Dólar Canadiense (CAD)',
        'currency-ars': 'Peso Argentino (ARS)',
        'currency-jpy': 'Yen (JPY)',
        'currency-cny': 'Yuan (CNY)',
        'currency-xau': 'Oro (XAU)',
        'currency-btc': 'Bitcoin (BTC)',
        'chart-label': 'Cotización',
        'last-conversion-label': 'Última conversión:',
        'footer-developed': 'Desarrollado por'
    }
};

// Função para traduzir a página
function translatePage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    const currentResult = resultValue.innerText;
    
    if (currentResult.includes('Loading') || currentResult.includes('Carregando') || currentResult.includes('Cargando')) {
        resultValue.innerText = translations[lang]['loading'];
    }
    
    // Se está mostrando mensagem de erro ou aviso
    if (currentResult.includes('Selecione moedas diferentes') || 
        currentResult.includes('Select different currencies') || 
        currentResult.includes('Seleccione monedas diferentes')) {
        resultValue.innerText = translations[lang]['different-currencies'];
    }
    
    if (currentResult.includes('Digite um valor válido') || 
        currentResult.includes('Enter a valid amount') || 
        currentResult.includes('Ingrese un monto válido')) {
        resultValue.innerText = translations[lang]['invalid-value'];
    }
    
    if (currentResult.includes('Erro ao buscar') || 
        currentResult.includes('Error fetching') || 
        currentResult.includes('Error al obtener')) {
        resultValue.innerText = translations[lang]['fetch-error'];
    }
    
    if (currentResult.includes('Par de moedas indisponível') || 
        currentResult.includes('Currency pair unavailable') || 
        currentResult.includes('Par de monedas no disponible')) {
        resultValue.innerText = translations[lang]['pair-unavailable'];
    }
    
    // Atualizar timestamp
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement && lastUpdateElement.textContent) {
        const timestampMatch = lastUpdateElement.textContent.match(/\d{2}:\d{2}/);
        if (timestampMatch) {
            lastUpdateElement.textContent = `${translations[lang]['last-update']} ${timestampMatch[0]}`;
        }
    }
}

// Event listeners
languageSelect.value = currentLanguage;
languageSelect.addEventListener('change', (e) => {
    translatePage(e.target.value);
});

const periodButtons = document.querySelectorAll('.period-btn');
periodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedPeriod = parseInt(btn.dataset.period);
        periodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fetchData();
    });
});

// Gráfico
function updateChart(labels, data, pairName) {
    if (currencyChart) currencyChart.destroy();

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const firstValue = data[0];
    const lastValue = data[data.length - 1];
    const isPositive = lastValue >= firstValue;

    currencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: translations[currentLanguage]['chart-label'],
                data: data,
                borderColor: isPositive ? '#10b981' : '#ef4444',
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: isPositive ? '#10b981' : '#ef4444',
                pointBorderColor: '#1e293b',
                pointBorderWidth: 2,
                fill: true,
                backgroundColor: isPositive 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : 'rgba(239, 68, 68, 0.15)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const value = context.parsed.y;
                            return `${translations[currentLanguage]['chart-label']}: ${value.toFixed(4)}`;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    grid: { display: false }, 
                    ticks: { 
                        color: '#94a3b8',
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 0
                    } 
                },
                y: { 
                    grid: { 
                        color: 'rgba(255,255,255,0.05)',
                        drawBorder: false
                    }, 
                    ticks: { 
                        color: '#94a3b8',
                        font: { size: 11 },
                        callback: function(value) {
                            return value.toFixed(4);
                        }
                    }
                }
            }
        }
    });
}

// Buscar Dados da API
async function fetchData() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const pair = `${from}-${to}`;

    if (from === to) {
        resultValue.innerText = translations[currentLanguage]['different-currencies'];
        return;
    }

    if (!amountInput.value || amountInput.value <= 0) {
        resultValue.innerText = translations[currentLanguage]['invalid-value'];
        return;
    }

    resultValue.innerHTML = `<div class="loading-state"><span class="loading-spinner"></span> ${translations[currentLanguage]['loading']}</div>`;

    try {
        const [lastRes, dailyRes] = await Promise.all([
            fetch(`https://economia.awesomeapi.com.br/json/last/${pair}`),
            fetch(`https://economia.awesomeapi.com.br/json/daily/${pair}/${selectedPeriod}`)
        ]);

        if (!lastRes.ok || !dailyRes.ok) {
            throw new Error('HTTP error');
        }

        const lastData = await lastRes.json();
        const dailyData = await dailyRes.json();
        
        if (!dailyData || dailyData.length === 0) {
            resultValue.innerText = translations[currentLanguage]['fetch-error'];
            return;
        }

        // Conversão
        const pairKey = pair.replace("-", "");
        if (!lastData[pairKey]) {
            resultValue.innerText = translations[currentLanguage]['pair-unavailable'];
            return;
        }
        
        const bid = parseFloat(lastData[pairKey].bid);
        const amount = parseFloat(amountInput.value);
        const convertedValue = amount * bid;
        
        let converted;
        try {
            if (to === 'BTC') {
                converted = `${convertedValue.toFixed(8)} BTC`;
            } else {
                converted = convertedValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: to,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        } catch (error) {
            converted = `${convertedValue.toFixed(2)} ${to}`;
        }
        
        resultValue.innerText = converted;
        
        // Atualizar timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString(currentLanguage === 'pt' ? 'pt-BR' : currentLanguage === 'es' ? 'es-ES' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('lastUpdate').textContent = `${translations[currentLanguage]['last-update']} ${timeString}`;

        // Histórico para o Gráfico
        const locale = currentLanguage === 'pt' ? 'pt-BR' : currentLanguage === 'es' ? 'es-ES' : 'en-US';
        const labels = dailyData.map(d => {
            const date = new Date(d.timestamp * 1000);
            if (selectedPeriod <= 30) {
                return date.toLocaleDateString(locale, { day: '2-digit', month: 'short' });
            } else {
                return date.toLocaleDateString(locale, { month: 'short', year: '2-digit' });
            }
        }).reverse();

        const prices = dailyData.map(d => parseFloat(d.bid)).reverse();
        
        updateChart(labels, prices, pair);
        
        // Salvar e mostrar a conversão atual como última conversão
        saveLastConversion(amount, from, to, converted);
        renderLastConversion();

    } catch (error) {
        resultValue.innerText = translations[currentLanguage]['fetch-error'];
        console.error(error);
    }
}

// Botão de converter
convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchData();
});

document.getElementById('converterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    fetchData();
});

amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchData();
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

//salvar e mostrar última conversão
function saveLastConversion(amount, from, to, formattedValue) {
    const conversion = {
        amount: amount,
        from: from,
        to: to,
        formatted: formattedValue
    };
    
    localStorage.setItem('lastConversion', JSON.stringify(conversion));
}

function renderLastConversion() {
    const lastConversionDiv = document.getElementById('lastConversion');
    const lastConversionItem = document.getElementById('lastConversionItem');
    const lastConversion = JSON.parse(localStorage.getItem('lastConversion') || 'null');
    
    if (!lastConversion) {
        lastConversionDiv.style.display = 'none';
        return;
    }
    
    lastConversionDiv.style.display = 'block';
    
    const fromCurrency = translations[currentLanguage][`currency-${lastConversion.from.toLowerCase()}`] || lastConversion.from;
    const toCurrency = translations[currentLanguage][`currency-${lastConversion.to.toLowerCase()}`] || lastConversion.to;
    
    lastConversionItem.innerHTML = `
        <span class="conversion-from">${fromCurrency.split('(')[0].trim()} → ${toCurrency.split('(')[0].trim()}</span>
        <span class="conversion-to">${lastConversion.formatted}</span>
    `;
}

translatePage(currentLanguage);
renderLastConversion();

window.onload = () => {
    fetchData();
};