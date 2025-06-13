// ==========================
// Acessibilidade: Alto contraste e ajuste de fonte
// ==========================
function toggleContraste() {
    document.body.classList.toggle('alto-contraste');
}
function alterarFonte(delta) {
    const html = document.documentElement;
    let size = parseInt(window.getComputedStyle(html).fontSize);
    size = Math.max(12, Math.min(24, size + delta));
    html.style.fontSize = size + "px";
}

// ==========================
// Loader de carregamento
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("fade-out");
        setTimeout(() => loader.style.display = "none", 800);
    }
});

// ==========================
// Contador de visitantes (Vercel API)
// ==========================
const API_URL = "https://curriculo-online-html.vercel.app/api/visitors";

async function fetchVisitorCount() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        document.getElementById('counter').textContent = data.count;
    } catch (error) {
        console.error('Erro ao buscar contador:', error);
    }
}

async function incrementVisitorCount() {
    try {
        await fetch(API_URL, { method: 'POST' });
        fetchVisitorCount();
    } catch (error) {
        console.error('Erro ao incrementar contagem:', error);
    }
}

// Inicializa o contador ao carregar a página
document.addEventListener("DOMContentLoaded", incrementVisitorCount);

// ==========================
// Rolagem suave para âncoras internas
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const fadeEls = document.querySelectorAll('.fade-in-up');
    function checkFadeIn() {
        fadeEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    checkFadeIn();
    window.addEventListener('scroll', checkFadeIn);
});

// ==========================
// Efeito de destaque ao clicar em competências técnicas/idiomas
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.competencia-item').forEach(item => {
        item.addEventListener('click', function () {
            item.classList.add('clicked');
            setTimeout(() => item.classList.remove('clicked'), 350);
        });
    });
});

// ==========================
// Foco visível para acessibilidade
// ==========================
document.addEventListener('keydown', function(e) {
    if (e.key === "Tab") {
        document.body.classList.add('user-is-tabbing');
    }
});
document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
});

// ==========================
// Mensagem de acessibilidade para leitores de tela
// ==========================
(function() {
    const srMessage = document.createElement('div');
    srMessage.setAttribute('aria-live', 'polite');
    srMessage.setAttribute('role', 'status');
    srMessage.style.position = 'absolute';
    srMessage.style.left = '-9999px';
    srMessage.textContent = "Bem-vindo ao currículo de Nilson Gomes. Use Tab para navegar.";
    document.body.appendChild(srMessage);
  })();

// ==========================
// Mensagem de boas-vindas no console
// ==========================
console.log("%cBem-vindo ao currículo de Nilson Gomes! 🚀", "color: #2e6cf6; font-size: 1.2em; font-weight: bold;");