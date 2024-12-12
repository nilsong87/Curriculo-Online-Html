
        function adjustLevel(bar) {
            const currentWidth = parseFloat(bar.querySelector('span').style.width);
            const newWidth = prompt("Digite o novo nível de proficiência (%)", currentWidth);

            if (newWidth !== null) {
                const percentage = Math.max(0, Math.min(100, parseFloat(newWidth)));
                bar.querySelector('span').style.width = percentage + '%';
            }
        }
   