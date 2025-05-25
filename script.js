document.addEventListener('DOMContentLoaded', function() {
    const progressContainers = document.querySelectorAll('.progress-container');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Observador para animação quando a seção fica visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animação escalonada para cada item
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animação específica para as barras de progresso
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0';
                        setTimeout(() => {
                            progressBar.style.width = width;
                            
                            // Efeito de confete para níveis avançados
                            if (parseInt(width) >= 70) {
                                triggerConfetti(entry.target);
                            }
                        }, 150 + (index * 100));
                    }
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Efeito de tracking do mouse
    document.addEventListener('mousemove', (e) => {
        progressContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    progressContainers.forEach((container, index) => {
        container.style.opacity = 0;
        container.style.transform = 'translateY(30px)';
        container.style.transition = `all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) ${index * 50}ms`;
        observer.observe(container);
        
        // Efeito de tooltip avançado
        const progressBar = container.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'progress-tooltip';
                
                // Formatação bonita para o tooltip
                const percentage = this.style.width;
                const skillName = container.querySelector('span strong').textContent;
                tooltip.textContent = `${skillName}: ${percentage}`;
                
                this.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }, 10);
            });

            progressBar.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.progress-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translateX(-50%) translateY(10px)';
                    setTimeout(() => {
                        tooltip.remove();
                    }, 300);
                }
            });
        }
    });
});
