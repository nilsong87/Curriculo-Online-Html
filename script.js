
        function adjustLevel(bar) {
            const currentWidth = parseFloat(bar.querySelector('span').style.width);
            const newWidth = prompt("Digite o novo nível de proficiência (%)", currentWidth);

            if (newWidth !== null) {
                const percentage = Math.max(0, Math.min(100, parseFloat(newWidth)));
                bar.querySelector('span').style.width = percentage + '%';
            }
        }

         function getVisitorCount() { return fetch('https://api.countapi.xyz/hit/seu-dominio.com/visitas') .then(response => response.json()) .then(data => data.value); } 
         
         function updateVisitorCounter() { getVisitorCount().then(count => { document.getElementById('counter').innerText = count; }); }
         window.onload = updateVisitorCounter; 