/**
 * Importações de bibliotecas externas necessárias para o funcionamento do projeto
 */
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap';

// Exporta para escopo global
window.$ = window.jQuery = $;
window.Popper = Popper;

/**
 * Sistema de Partículas Avançado
 */
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9998';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    this.init();
  }

  init() {
    // Cria partículas iniciais
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `rgba(46, 108, 246, ${Math.random() * 0.2})`
      });
    }

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Atualiza e desenha partículas
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Atualiza posição
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Mantém partículas dentro do canvas
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      
      // Desenha partícula
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      
      // Conecta partículas próximas
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(46, 108, 246, ${1 - distance/100})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

/**
 * Cursor Personalizado Avançado
 */
class AdvancedCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.id = 'advanced-cursor';
    this.cursorInner = document.createElement('div');
    this.cursorInner.className = 'cursor-inner';
    this.cursor.appendChild(this.cursorInner);
    document.body.appendChild(this.cursor);

    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.scale = 1;
    this.alpha = 1;
    this.targetScale = 1;
    this.targetAlpha = 1;
    this.color = '#2e6cf6';

    this.init();
  }

  init() {
    document.body.style.cursor = 'none';
    
    // Configura estilos
    Object.assign(this.cursor.style, {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.15s ease-out, opacity 0.3s ease',
      mixBlendMode: 'exclusion'
    });

    Object.assign(this.cursorInner.style, {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: this.color,
      transform: 'scale(1)',
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease',
      opacity: '0.8'
    });

    // Mouse move listener
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .progress-container, [data-cursor-hover]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.targetScale = 2;
        this.color = '#ff4d4d';
        this.updateCursor();
      });
      el.addEventListener('mouseleave', () => {
        this.targetScale = 1;
        this.color = '#2e6cf6';
        this.updateCursor();
      });
    });

    this.animate();
  }

  updateCursor() {
    this.cursorInner.style.backgroundColor = this.color;
    this.cursorInner.style.transform = `scale(${this.targetScale})`;
  }

  animate() {
    // Suavização do movimento
    this.cursorX += (this.mouseX - this.cursorX) * 0.2;
    this.cursorY += (this.mouseY - this.cursorY) * 0.2;
    
    // Aplica transformação
    this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px) scale(${this.scale})`;
    this.cursor.style.opacity = this.alpha;
    
    requestAnimationFrame(() => this.animate());
  }
}

/**
 * Sistema de Animações de Rolagem Avançado
 */
class ScrollAnimator {
  constructor() {
    this.animateElements = document.querySelectorAll('[data-animate]');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target, index);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.animateElements.forEach(el => observer.observe(el));
  }

  animateElement(el, index) {
    const animationType = el.getAttribute('data-animate') || 'fadeInUp';
    const delay = index * 100;
    
    el.style.opacity = '0';
    el.style.transition = 'none';
    
    // Força o reflow
    void el.offsetHeight;
    
    // Aplica animação
    el.style.transition = `all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}ms`;
    
    switch(animationType) {
      case 'fadeInUp':
        el.style.transform = 'translateY(30px)';
        break;
      case 'fadeInLeft':
        el.style.transform = 'translateX(-50px)';
        break;
      case 'fadeInRight':
        el.style.transform = 'translateX(50px)';
        break;
      case 'scaleIn':
        el.style.transform = 'scale(0.8)';
        break;
    }
    
    // Força o reflow novamente
    void el.offsetHeight;
    
    // Ativa animação
    el.style.opacity = '1';
    el.style.transform = 'translate(0) scale(1)';
  }
}

/**
 * Efeito de Confetti para Habilidades Avançadas
 */
class SkillConfetti {
  constructor() {
    this.progressBars = document.querySelectorAll('.progress-bar');
    this.init();
  }

  init() {
    this.progressBars.forEach(bar => {
      const percentage = parseInt(bar.style.width);
      if (percentage >= 70) {
        bar.addEventListener('mouseenter', () => this.triggerConfetti(bar));
      }
    });
  }

  triggerConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#2e6cf6', '#4fd1c5', '#ff4d4d', '#f7df1e', '#7952b3'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-particle';
      
      // Posiciona no centro da barra de progresso
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      
      // Configurações aleatórias
      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      const size = 8 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 20;
      
      // Aplica estilos
      Object.assign(confetti.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: `rotate(${rotation}deg)`,
        opacity: '0.9'
      });
      
      document.body.appendChild(confetti);
      
      // Animação
      const duration = 2000 + Math.random() * 1000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Movimento parabólico
        const xPos = x + Math.cos(angle) * velocity * elapsed * 0.1;
        const yPos = y + Math.sin(angle) * velocity * elapsed * 0.1 + 0.5 * 0.002 * elapsed * elapsed;
        
        // Rotação
        const currentRotation = rotation + rotationSpeed * progress;
        
        // Opacidade
        const opacity = 1 - progress;
        
        // Aplica transformações
        confetti.style.transform = `translate(${xPos - x}px, ${yPos - y}px) rotate(${currentRotation}deg)`;
        confetti.style.opacity = opacity;
        
        // Remove quando a animação terminar
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }
  }
}

/**
 * Efeito de Onda ao Clicar
 */
class RippleEffect {
  constructor() {
    document.body.addEventListener('click', (e) => this.createRipple(e));
  }

  createRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    // Posiciona no local do clique
    Object.assign(ripple.style, {
      position: 'fixed',
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'rgba(46, 108, 246, 0.4)',
      transform: 'translate(-50%, -50%) scale(0)',
      pointerEvents: 'none',
      zIndex: '9997'
    });
    
    document.body.appendChild(ripple);
    
    // Animação
    const duration = 800;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Escala e opacidade
      const scale = progress * 20;
      const opacity = 1 - progress;
      
      ripple.style.transform = `translate(-50%, -50%) scale(${scale})`;
      ripple.style.opacity = opacity;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        ripple.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

/**
 * Inicialização da Página
 */
class PageInitializer {
  constructor() {
    this.init();
  }

  init() {
    // Inicia sistemas
    new ParticleSystem();
    new AdvancedCursor();
    new ScrollAnimator();
    new SkillConfetti();
    new RippleEffect();
    
    // Configura eventos
    this.setupProgressBars();
    this.setupVisitorCounter();
    this.setupLoader();
  }

  setupProgressBars() {
    document.querySelectorAll('.progress-container').forEach(container => {
      container.addEventListener('click', () => {
        const progressBar = container.querySelector('.progress-bar');
        const currentWidth = parseFloat(progressBar.style.width);
        const newWidth = prompt("Digite o novo nível de proficiência (%)", currentWidth);
        
        if (newWidth !== null) {
          const percentage = Math.max(0, Math.min(100, parseFloat(newWidth)));
          progressBar.style.width = `${percentage}%`;
          progressBar.setAttribute('aria-valuenow', percentage);
          progressBar.innerText = `${percentage}%`;
          
          // Atualiza confetti se necessário
          if (percentage >= 70) {
            container.addEventListener('mouseenter', () => new SkillConfetti().triggerConfetti(progressBar));
          }
        }
      });
    });
  }

  async setupVisitorCounter() {
    try {
      const response = await fetch('/api/countapi');
      if (!response.ok) throw new Error('Erro ao buscar contador');
      const data = await response.json();
      document.getElementById('counter').textContent = data.value;
    } catch (error) {
      console.error('Erro:', error);
      // Fallback para localStorage
      let count = localStorage.getItem('pageVisits') || 1;
      localStorage.setItem('pageVisits', ++count);
      document.getElementById('counter').textContent = count;
    }
  }

  setupLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      window.addEventListener('load', () => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.style.display = 'none', 600);
      });
    }
  }
}

// Inicia tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new PageInitializer();
});

