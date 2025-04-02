/**
 * Importações de bibliotecas externas necessárias para o funcionamento do projeto
 * jQuery: Biblioteca para manipulação do DOM e AJAX
 * Popper.js: Biblioteca para posicionamento de tooltips e popovers
 * Bootstrap: Framework CSS/JS para componentes de interface
 */
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap';

/**
 * Exporta as bibliotecas para o escopo global (window)
 * Isso é necessário para alguns plugins que dependem
 * de jQuery ou Popper disponíveis globalmente
 */
window.$ = window.jQuery = $;
window.Popper = Popper;

/**
 * Função para ajustar o nível de proficiência nas barras de progresso
 * @param {HTMLElement} bar - Elemento DOM que contém a barra de progresso
 */
function adjustLevel(bar) {
    // Obtém o elemento da barra de progresso dentro do container
    const progressBar = bar.querySelector('.progress-bar');
    
    // Pega a largura atual da barra e converte para número (removendo o '%')
    const currentWidth = parseFloat(progressBar.style.width);
    
    // Mostra um prompt para o usuário inserir o novo valor
    const newWidth = prompt("Digite o novo nível de proficiência (%)", currentWidth);

    // Verifica se o usuário não cancelou o prompt
    if (newWidth !== null) {
        // Converte para número e limita entre 0 e 100
        const percentage = Math.max(0, Math.min(100, parseFloat(newWidth)));
        
        // Atualiza visualmente a barra de progresso
        progressBar.style.width = `${percentage}%`;
        
        // Atualiza o atributo ARIA para acessibilidade
        progressBar.setAttribute('aria-valuenow', percentage);
        
        // Atualiza o texto exibido dentro da barra
        progressBar.innerText = `${percentage}%`;
    }
}

/**
 * Adiciona eventos de clique às barras de progresso
 * Permite que o usuário edite os níveis de proficiência
 */
function initializeProgressBarEvents() {
    // Seleciona todos os containers de barra de progresso
    document.querySelectorAll('.progress-container').forEach(container => {
        // Adiciona um listener de clique a cada container
        container.addEventListener('click', () => adjustLevel(container));
    });
}

/**
 * Função assíncrona para buscar o contador de visitantes da API
 * @returns {Promise<number>} Número atual de visitantes
 */
async function getVisitorCount() {
    try {
        // Faz a requisição GET para a API
        const response = await fetch('/api/countapi');
        
        // Verifica se a resposta não foi bem sucedida (status fora do range 200-299)
        if (!response.ok) throw new Error('Erro ao buscar o contador de visitantes');
        
        // Converte a resposta para JSON
        const data = await response.json();
        
        // Retorna o valor do contador
        return data.value;
    } catch (error) {
        // Loga o erro no console para debug
        console.error('Erro ao obter o contador de visitantes:', error);
        
        // Retorna 0 como valor padrão em caso de erro
        return 0;
    }
}

/**
 * Atualiza o contador de visitantes na página
 * Busca o valor atual da API e atualiza o elemento DOM
 */
async function updateVisitorCounter() {
    // Obtém a contagem atual de visitantes
    const count = await getVisitorCount();
    
    // Obtém o elemento que exibe o contador
    const counterElement = document.getElementById('counter');
    
    // Verifica se o elemento existe antes de atualizar
    if (counterElement) {
        counterElement.innerText = count;
    }
}

/**
 * Função principal de inicialização da página
 * Configura todos os eventos e atualizações necessárias
 */
function initializePage() {
    // Configura os eventos das barras de progresso
    initializeProgressBarEvents();
    
    // Atualiza o contador de visitantes
    updateVisitorCounter();
}

/**
 * Event listener que executa a inicialização quando a página termina de carregar
 * Usamos 'load' em vez de 'DOMContentLoaded' para garantir que todos os recursos
 * (incluindo imagens e stylesheets) estejam carregados
 */
window.addEventListener('load', initializePage);