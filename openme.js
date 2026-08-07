
  function getDisplayColor(color) {
    if (!color) return color;
    const normalized = color.trim().toLowerCase();
    if (normalized === 'pink') return '#ff69b4';
    return color;
  }

  const openbutton = document.getElementById('openbutton');
  const heart = document.getElementById('heart');
  const starfield = document.getElementById('starfield');
 
   const savedColor = localStorage.getItem('favColor');
   const displayColor = getDisplayColor(savedColor);

  function parseColor(color) {
    const temp = document.createElement('div');
    temp.style.color = '';
    temp.style.color = color;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match ? { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) } : null;
  }

  function blendColor(rgb, mixRgb, weight) {
    return {
      r: Math.round(rgb.r * weight + mixRgb.r * (1 - weight)),
      g: Math.round(rgb.g * weight + mixRgb.g * (1 - weight)),
      b: Math.round(rgb.b * weight + mixRgb.b * (1 - weight))
    };
  }

  function rgbToHex(rgb) {
    const hex = (value) => value.toString(16).padStart(2, '0');
    return `#${hex(rgb.r)}${hex(rgb.g)}${hex(rgb.b)}`;
  }

  function getTextColor(bgColor) {
    const rgb = parseColor(bgColor);
    if (!rgb) return '#fff';
    const brightness = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    if (brightness > 180) {
      return rgbToHex(blendColor(rgb, { r: 0, g: 0, b: 0 }, 0.65));
    }
    return rgbToHex(blendColor(rgb, { r: 255, g: 255, b: 255 }, 0.65));
  }

  if (savedColor) {
    const textColor = getTextColor(displayColor);
    heart.style.backgroundColor = displayColor;
    heart.style.setProperty('--heart-color', displayColor);
    openbutton.style.backgroundColor = displayColor;
    openbutton.style.color = textColor;
  }

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

  createStars(40, displayColor || '#ffffff');

  openbutton.addEventListener('click', function() {
    heart.classList.add('shatter');

    setTimeout(function() {
      window.location.href = 'HappyBirthday.html';
    }, 600);
  });