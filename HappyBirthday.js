
        function getDisplayColor(color) {
            if (!color) return color;
            const normalized = color.trim().toLowerCase();
            if (normalized === 'pink') return '#ff69b4';
            return color;
        }

        function getDeepColor(color) {
            const temp = document.createElement('div');
            temp.style.color = '';
            temp.style.color = color;
            document.body.appendChild(temp);
            const computed = getComputedStyle(temp).color;
            document.body.removeChild(temp);
            const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!match) return color;
            const r = Math.max(0, Math.min(255, Math.round(Number(match[1]) * 0.75)));
            const g = Math.max(0, Math.min(255, Math.round(Number(match[2]) * 0.75)));
            const b = Math.max(0, Math.min(255, Math.round(Number(match[3]) * 0.75)));
            return `rgb(${r}, ${g}, ${b})`;
        }

        const name = localStorage.getItem("username");
        const rawColor = localStorage.getItem("favColor");
        const displayColor = getDisplayColor(rawColor);
        const deepColor = getDeepColor(rawColor);

        const greeting = document.getElementById('greeting');
        const message = document.getElementById('message');
        const starfield = document.getElementById('starfield');

        function createStars(count, color) {
            if (!starfield) return;
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                const size = Math.random() * 3 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.backgroundColor = color;
                star.style.animationDelay = `${Math.random() * 2}s`;
                star.style.opacity = `${Math.random() * 0.5 + 0.4}`;
                starfield.appendChild(star);
            }
        }

        greeting.textContent = `🎂 Happy Birthday, ${name} 🥳🎉!!!`;
        greeting.style.color = deepColor;

        message.textContent = `Sending you the biggest hug ever!! I hope this new chapter brings you so much peace, answered prayers, and genuinely happy moments. Wishing you top-tier vibes all year long and those little moments where you're like "yeah, life is good." You deserve the absolute best today and always. Enjoy your day to the fullest!! 💖✨`;
        message.style.color = deepColor;
        createStars(40, displayColor || '#ffffff');
    