// ============================================
// Mendouksai Vanguard — Core Script Engine
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Sound Engine (Web Audio API) ─────────────
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let soundEnabled = true; // On by default

  function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playTone(freq, duration, type = 'sine', vol = 0.08) {
    if (!soundEnabled) return;
    ensureAudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playHoverSound() { playTone(880, 0.08, 'sine', 0.05); }
  function playClickSound() { playTone(440, 0.15, 'triangle', 0.1); playTone(660, 0.1, 'sine', 0.06); }
  function playSlideSound() { playTone(520, 0.12, 'square', 0.04); playTone(780, 0.08, 'sine', 0.03); }
  function playToggleOn()   { playTone(660, 0.1, 'sine', 0.12); setTimeout(() => playTone(990, 0.12, 'sine', 0.1), 80); }
  function playToggleOff()  { playTone(990, 0.1, 'sine', 0.1); setTimeout(() => playTone(660, 0.12, 'sine', 0.08), 80); }

  // Sound toggle button
  const toggleBtn = document.getElementById('soundToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      ensureAudioCtx();
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
      toggleBtn.title = soundEnabled ? 'Sound On — Click to Mute' : 'Sound Off — Click to Unmute';
      if (soundEnabled) playToggleOn(); else playToggleOff();
    });
  }

  // Attach hover sounds to interactive elements
  document.querySelectorAll('a, button, .port-card, .nav-links a, .slider-arrow, .slide.prev, .slide.next').forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
  });

  // Attach click sounds to buttons/links
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', playClickSound);
  });

  // Expose for slider script
  window.playSlideSound = playSlideSound;

  // ─── Card 3D Mouse Tracking ────────────────
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 100);
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ─── Scroll Animations ─────────────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
