// --- SCRIPT DO RASTRO DO MOUSE ---
const canvas = document.getElementById('tech-trail');
const ctx = canvas.getContext('2d');

const trailColor = '#fc4c00';
let mouseHistory = [];
const maxAge = 35; // Tempo de duração da cauda do cometa

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouseHistory.push({ x: e.clientX, y: e.clientY, age: 0 });
});

function animateTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouseHistory.length > 1) {
    for (let i = 1; i < mouseHistory.length; i++) {
      const p1 = mouseHistory[i - 1];
      const p2 = mouseHistory[i];

      const lifeRatio = 1 - (p2.age / maxAge);
      if (lifeRatio <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      
      ctx.strokeStyle = trailColor;
      ctx.globalAlpha = lifeRatio;
      ctx.lineWidth = lifeRatio * 7; // Grossura inicial do cometa
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = trailColor;

      ctx.stroke();
    }
  }

  mouseHistory.forEach(p => p.age++);
  mouseHistory = mouseHistory.filter(p => p.age < maxAge);

  requestAnimationFrame(animateTrail);
}

animateTrail();

// --- SCRIPT DO HOLOGRAMA DINÂMICO ---
const holoTextElement = document.querySelector('.holo-text');
const holoIconElement = document.querySelector('.holo-icon');

if (holoTextElement && holoIconElement) {
  // Banco de dados visual do holograma (Textos + Elementos Visuais HTML/SVG)
  const holoData = [
    {
      text: "SYSTEM_GROWTH // ACTIVE",
      // Seta clássica do Stonks voltada para cima e direita
      visual: `<svg viewBox="0 0 24 24" fill="none" stroke="#fc4c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>`
    },
    {
      text: "DATA_STREAM // ONLINE",
      // Gráfico de Barras verticais crescentes
      visual: `<svg viewBox="0 0 24 24" fill="none" stroke="#fc4c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>`
    },
    {
      text: "LOADING_DATA // 85%",
      // Elemento HTML de barra de carregamento com animação CSS
      visual: `<div class="holo-loading-bar">
                <div class="holo-loading-progress"></div>
              </div>`
    },
    {
      text: "OPTIMIZING_ROI // 100%",
      // Gráfico de linha tecnológica ascendente (Crescimento contínuo)
      visual: `<svg viewBox="0 0 24 24" fill="none" stroke="#fc4c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12A10 10 0 1 1 12 2l1 2"></path>
                <path d="M22 2L12 12"></path>
                <polyline points="16 2 22 2 22 8"></polyline>
              </svg>`
    }
  ];

  let currentIndex = 0;

  // Função para renderizar a transição do holograma
  function updateHologram() {
    const currentItem = holoData[currentIndex];
    
    // Altera o conteúdo de texto e o ícone correspondente
    holoTextElement.textContent = currentItem.text;
    holoIconElement.innerHTML = currentItem.visual;
    
    // Prepara o próximo item para o loop
    currentIndex = (currentIndex + 1) % holoData.length;
  }

  // Inicializa o primeiro frame imediatamente
  updateHologram();

  // Executa a troca sincronizada a cada 4 segundos
  setInterval(updateHologram, 4000);
}

