/**
 * MENDOUKSAI VANGUARD — CORE JAVASCRIPT SYSTEM ENGINE
 * Modern Web Audio Synthesizer, Dynamic Bento Filtering, Architecture Modal,
 * Live Telemetry Simulator, Clipboard Management & Touch Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO API HAPTIC SYNTHESIZER (No Audio Files Required)
  // =========================================================================
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let soundEnabled = localStorage.getItem('mendouksai_sound') !== 'off';

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', vol = 0.04) {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  const sfx = {
    hover: () => playTone(900, 0.05, 'sine', 0.02),
    click: () => {
      playTone(420, 0.08, 'triangle', 0.06);
      setTimeout(() => playTone(680, 0.06, 'sine', 0.04), 40);
    },
    modalOpen: () => {
      playTone(520, 0.1, 'sine', 0.05);
      setTimeout(() => playTone(780, 0.12, 'sine', 0.05), 60);
      setTimeout(() => playTone(1040, 0.14, 'sine', 0.04), 120);
    },
    filterChange: () => playTone(640, 0.08, 'sine', 0.04),
    success: () => {
      playTone(660, 0.09, 'sine', 0.06);
      setTimeout(() => playTone(880, 0.12, 'sine', 0.06), 80);
      setTimeout(() => playTone(1320, 0.18, 'sine', 0.05), 160);
    }
  };

  // Sound Toggle Controller
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  function updateSoundUI() {
    if (!soundToggleBtn) return;
    const volOnSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>`;
    const volOffSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>`;

    if (soundEnabled) {
      soundToggleBtn.innerHTML = volOnSvg;
      soundToggleBtn.title = 'Audio Synthesizer: Active (Click to Mute)';
      soundToggleBtn.classList.add('active');
    } else {
      soundToggleBtn.innerHTML = volOffSvg;
      soundToggleBtn.title = 'Audio Synthesizer: Muted (Click to Enable)';
      soundToggleBtn.classList.remove('active');
    }
  }

  if (soundToggleBtn) {
    updateSoundUI();
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      localStorage.setItem('mendouksai_sound', soundEnabled ? 'on' : 'off');
      updateSoundUI();
      if (soundEnabled) sfx.success();
    });
  }

  // Attach hover sounds to interactive elements
  document.querySelectorAll('a, button, .bento-card, .channel-item, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.hover());
  });

  document.querySelectorAll('a, button, .filter-btn').forEach(el => {
    el.addEventListener('click', () => sfx.click());
  });


  // =========================================================================
  // 2. DYNAMIC BENTO CATEGORY FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bentoCards = document.querySelectorAll('.bento-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sfx.filterChange();

      const targetCategory = btn.getAttribute('data-filter');

      bentoCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory.includes(targetCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // =========================================================================
  // 3. PROJECT ARCHITECTURE INSPECTOR (MODAL DICTIONARY)
  // =========================================================================
  const projectDatabase = {
    'redline-rider': {
      title: 'Redline Rider — 3D Downhill Physics Engine & Reddit App',
      tag: '3D Graphics & WASM Engine',
      status: 'Live Production & Reddit Devvit App',
      summary: 'A high-speed, single-file 3D downhill biking game running deterministic procedural mountain terrain generation via seeded mulberry32 noise with strict 60 FPS sub-21ms adaptive budgets.',
      architecture: [
        'Physics Core: Real-time Rapier 3D rigid-body capsule physics with dynamic trick detection, apex floating, camera lookahead, and landing tolerance windows (±80ms).',
        'Custom GLSL Shader: Authored procedural ShaderMaterial for the Overseer Eye with animated fibrous iris veins, noise flickering, and real-time player pupil dilation tracking.',
        'Adaptive Quality Engine: Self-monitoring frame-budget profiler that dynamically lowers shadow maps and geometry LOD to guarantee sub-21ms render times on low-power devices.',
        'Reddit Devvit Port: Containerized into a native Reddit Devvit Web App leveraging Redis session stores and authenticated Reddit player profiles for in-feed viral distribution.'
      ],
      stack: ['TypeScript', 'Three.js', 'Rapier 3D WASM', 'GLSL ShaderMaterial', 'WebAudio API', 'Reddit Devvit', 'Vercel Serverless'],
      liveUrl: 'https://redline-rider.vercel.app',
      githubUrl: 'https://github.com/mendouksaiii/downhill-rush'
    },
    'sentinel': {
      title: 'SENTINEL — On-Chain AI Policy Firewall for Autonomous Agents',
      tag: 'Autonomous AI & Cryptographic Preconditions',
      status: 'Mantle Turing Hackathon Finalist',
      summary: 'An automated spending governance firewall where AI decisions serve as cryptographic preconditions rather than off-chain advice. If the AI rejects an intent, the smart contract physically cannot move funds.',
      architecture: [
        'Plain-English Policy Engine: Treasury managers write plain-English governance rules; an LLM (Claude 3.5 / OpenRouter) evaluates intent against the policy document in real time.',
        'Cryptographic Preconditions: Upon approval, the policy-signer key signs a single-use EIP-712 typed data payload bound to {token, recipient, amount, purposeHash, nonce, deadline}.',
        'SentinelVault.sol: Mantle Sepolia smart contract (Chain ID 5003) verifies the EIP-712 signature on-chain before executing funds release. Bypassing the AI is cryptographically impossible.',
        'SentinelRegistry.sol: Tamper-evident, immutable on-chain decision ledger recording all approved and rejected spend attempts for institutional compliance auditability.'
      ],
      stack: ['Solidity', 'Mantle Sepolia (5003)', 'EIP-712', 'Node.js', 'WebSocket Telemetry', 'Claude 3.5 Sonnet', 'Hardhat'],
      liveUrl: null,
      githubUrl: 'https://github.com/mendouksaiii/Natural-language-policy-engine.-'
    },
    'm-fi': {
      title: 'M-Fi Underwriter — Autonomous Credit Bureau for AI Agents',
      tag: 'Autonomous AI & DeFi Protocols',
      status: 'Galáctica Hackathon Production Entry',
      summary: 'An autonomous on-chain underwriting engine evaluating AI agent liquidity, credit risk, and portfolio volatility to facilitate uncollateralized micro-lending across multi-chain ecosystems.',
      architecture: [
        'Dynamic Agent Profiler: Queries on-chain wallet transactions, debt obligations, and past protocol repayments to compute dynamic risk scores.',
        'Underwriting Core: Powered by Groq LLaMA 3.1 inference models, Tether WDK, and Aave V3 lending pool integrations.',
        'Sui & Walrus Persistence: Deployed on Sui with decentralized blob storage on Walrus for verifiable, censorship-resistant credit risk logs.',
        'Neo-Modernist Telemetry: 24px backdrop-blur floating island interface streaming live WebSocket telemetry tickers and agent risk simulations.'
      ],
      stack: ['Sui Move', 'Walrus Protocol', 'TypeScript', 'Groq LLaMA 3.1', 'Tether WDK', 'Aave V3', 'Tailwind / Glassmorphism'],
      liveUrl: 'https://m-fi-underwriter.vercel.app',
      githubUrl: 'https://github.com/mendouksaiii/m-fi-underwriter'
    },
    'banterbot': {
      title: 'Banterbot & Kite — Multimodal Autonomous iMessage Agents',
      tag: 'Autonomous AI & Agent Runtimes',
      status: 'Production iMessage & Terminal Agent',
      summary: 'Production-grade multimodal iMessage agents engineered with Photon Spectrum framework (spectrum-ts), featuring real-time conversational processing, photo critique, and structured 3-round roast battles.',
      architecture: [
        'Dual-Brain Architecture: Primary brain utilizes Google Gemini 2.5 Flash for multimodal vision and natural dialogue, with automatic zero-downtime failover to Groq (Llama 3.3).',
        'Apple iMessage Superpowers: Native 3-dot typing indicators while thinking, automatic tapback reactions (😆, 👎, ❤️), and bubble effects (slam, invisible ink).',
        'Structured State Machine: Manages high-stakes 3-Round Roast Battles with automated scoring, point allocation, and lifetime win/loss record persistence.',
        'Dual-Runtime Orchestration: Instant local CLI simulation mode (dev:terminal) running alongside live cloud iMessage pipelines provisioned via Docker & Railway.'
      ],
      stack: ['TypeScript', 'spectrum-ts', 'Google Gemini 2.5 Flash', 'Groq (Llama 3.3)', 'Docker', 'Railway', 'Apple iMessage Protocols'],
      liveUrl: null,
      githubUrl: 'https://github.com/mendouksaiii/banterbot'
    },
    'nod': {
      title: 'NOD — Cryptographic 2.5D Survival-Horror on Inco Lightning',
      tag: '3D Graphics & Confidential EVM',
      status: 'Production Game Engine',
      summary: 'A 2.5D survival-horror descent through a seven-floor house built on Inco Lightning, where the floors below you are cryptographically sealed until you earn them via verifiable on-chain game state proofs.',
      architecture: [
        'Confidential EVM State: Leverages Inco Lightning for hidden game states, secret item drops, and encrypted door keys verified cryptographically without exposing answers to the client.',
        'Atmospheric 2.5D Renderer: Custom lighting and shadow calculations built on Three.js simulating claustrophobic survival horror mechanics.',
        'Verifiable Game Loops: Deterministic combat and stealth kinematics that write milestone cryptographic proofs directly to on-chain state.'
      ],
      stack: ['TypeScript', 'Three.js', 'Inco Lightning', 'Confidential EVM', 'WebGL'],
      liveUrl: null,
      githubUrl: 'https://github.com/mendouksaiii/nod'
    },
    'voxel-souls': {
      title: 'Voxel Souls: Chronicles of the Abyss — Action Roguelite',
      tag: 'WebGL & Three.js 3D Engine',
      status: 'Active Repository & Engine Build',
      summary: 'An action roguelite engine engineered directly in the browser with Three.js, featuring procedural voxel dungeon generation, dynamic combat kinematics, and custom GLSL lighting passes.',
      architecture: [
        'Procedural Dungeon Meshing: Generates intricate voxel labyrinths with seeded room generation and navigation meshes.',
        'Fluid Kinematics: Fast player responsiveness with dodge-roll invulnerability frames, poise breaks, and particle blood VFX.',
        'Custom GLSL Lighting: Multi-pass deferred shading pipeline simulating torch flickers, fog volume scatter, and weapon particle glow.'
      ],
      stack: ['JavaScript', 'Three.js', 'Custom GLSL', 'WebAudio API', 'HTML5 Canvas'],
      liveUrl: null,
      githubUrl: 'https://github.com/mendouksaiii/voxel-souls'
    },
    'awr': {
      title: 'Agent Wallet Runtime & WalletSecure',
      tag: 'Web3 Infrastructure & Runtimes',
      status: 'Live Production Runtime',
      summary: 'Autonomous execution runtime enabling AI agents to sign transactions and interact with smart contract interfaces without human intervention, paired with the WalletSecure connection pipeline.',
      architecture: [
        'Autonomous Execution Loop: Node.js/TypeScript runtime managing nonce allocation, gas estimation, and EIP-712 transaction signing for AI agents.',
        'WalletSecure Pipeline: Lightweight React hook architecture eliminating persistent cold-start connection drops and race conditions in decentralized dApps.',
        'Hardened Security: Memory-confined key derivation and automated transaction simulation before on-chain broadcast.'
      ],
      stack: ['React', 'TypeScript', 'Node.js', 'Ethers.js', 'Viem', 'WebSockets'],
      liveUrl: 'https://walletsecure-8ilj.vercel.app/',
      githubUrl: 'https://github.com/mendouksaiii/agent-wallet-runtime'
    },
    'immutable-quest': {
      title: 'Immutable Quest Tracker — Cross-Game Progression',
      tag: 'Chrome Extension & Service Workers',
      status: 'Chrome Extension Pipeline',
      summary: 'A Manifest V3 browser extension that monitors player achievements across Web3 titles and syncs progression directly to persistent on-chain identity profiles.',
      architecture: [
        'Manifest V3 Service Workers: Lightweight background listeners tracking gameplay milestones with zero client overhead.',
        'Supabase Synchronization: Real-time event ingestion syncing player metrics to distributed database clusters.',
        'On-Chain Identity Linking: Connects Web3 player wallets to Immutable Passport credentials.'
      ],
      stack: ['JavaScript', 'Chrome Manifest V3', 'Supabase', 'Immutable Passport SDK', 'REST API'],
      liveUrl: null,
      githubUrl: 'https://github.com/mendouksaiii/ImmutableQuestTracker'
    }
  };

  const modalBackdrop = document.getElementById('projectModal');
  const modalBox = document.getElementById('modalBox');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openProjectModal(key) {
    const data = projectDatabase[key];
    if (!data || !modalBackdrop) return;

    sfx.modalOpen();

    const techTagsHtml = data.stack.map(s => `<span class="tech-tag">${s}</span>`).join('');
    const archStepsHtml = data.architecture.map((item, idx) => `
      <div class="arch-step-item" style="margin-bottom: 0.85rem;">
        <span class="arch-step-num" style="color: var(--cyan-primary); font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;">[0${idx + 1}]</span>
        <span style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.55;">${item}</span>
      </div>
    `).join('');

    const liveBtnHtml = data.liveUrl ? `
      <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.65rem 1.25rem; font-size: 0.85rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Launch Deployment
      </a>
    ` : '';

    const githubBtnHtml = data.githubUrl ? `
      <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding: 0.65rem 1.25rem; font-size: 0.85rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        View GitHub Repository
      </a>
    ` : '';

    modalBox.innerHTML = `
      <div class="modal-content-inner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; padding-right: 2.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-primary); text-transform: uppercase; letter-spacing: 0.08em;">${data.tag}</span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--emerald-primary); background: var(--emerald-dim); border: 1px solid rgba(0,255,133,0.3); padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">${data.status}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem; line-height: 1.25;">${data.title}</h2>
        <p style="font-size: 0.98rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.75rem;">${data.summary}</p>
        
        <h4 style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--cyan-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.85rem;">Architectural Blueprint & Core Features</h4>
        <div style="background: rgba(8, 10, 15, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.75rem;">
          ${archStepsHtml}
        </div>

        <h4 style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 2rem;">
          ${techTagsHtml}
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          ${liveBtnHtml}
          ${githubBtnHtml}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.inspect-trigger[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = trigger.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeProjectModal();
    }
  });


  // =========================================================================
  // 4. LIVE HERO TELEMETRY STREAMER (Console Simulation)
  // =========================================================================
  const terminalBody = document.getElementById('terminalTelemetryStream');
  if (terminalBody) {
    const telemetryEvents = [
      { prefix: 'SENTINEL', text: 'EIP-712 payload verified on Mantle (Chain 5003) · Nonce #0482 OK', class: 't-accent' },
      { prefix: 'REDLINE', text: 'mulberry32 terrain seed generated · Frame budget: 16.2ms (60 FPS)', class: 't-accent' },
      { prefix: 'BANTERBOT', text: 'Gemini 2.5 Flash stream nominal · Groq Llama 3.3 failover standby', class: 't-warn' },
      { prefix: 'M-FI', text: 'Autonomous credit rating evaluated · Sui Walrus audit blob committed', class: 't-accent' },
      { prefix: 'WALLETSECURE', text: 'Cold-start connection loop synchronized · 0 race conditions', class: 't-accent' },
      { prefix: 'GLSL', text: 'Overseer iris fibrous veins animated · Pupil tracking active', class: 't-warn' },
      { prefix: 'IMMUTABLE', text: 'Cross-game quest progression event dispatched to passport', class: 't-accent' },
      { prefix: 'NOD', text: 'Floor #04 cryptographic proof validated via Inco Lightning EVM', class: 't-accent' }
    ];

    let currentEventIdx = 0;
    setInterval(() => {
      const event = telemetryEvents[currentEventIdx % telemetryEvents.length];
      currentEventIdx++;

      const newLine = document.createElement('div');
      newLine.className = 'terminal-line';
      newLine.innerHTML = `
        <span class="t-prefix">&gt; [${event.prefix}]</span>
        <span class="${event.class}">${event.text}</span>
      `;
      terminalBody.appendChild(newLine);

      // Keep maximum 4 lines
      while (terminalBody.children.length > 4) {
        terminalBody.removeChild(terminalBody.firstChild);
      }
    }, 3800);
  }


  // =========================================================================
  // 5. INTERACTIVE COPY-TO-CLIPBOARD WITH TOAST FEEDBACK
  // =========================================================================
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toastNotice || !toastText) return;
    toastText.textContent = message;
    toastNotice.classList.add('show');
    sfx.success();
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.copy-trigger[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard`);
  }


  // =========================================================================
  // 6. CONTACT FORM SUBMISSION HANDLER
  // =========================================================================
  const transmissionForm = document.getElementById('transmissionForm');
  if (transmissionForm) {
    transmissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = transmissionForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        Encrypting & Dispatching...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Transmission Dispatched
        `;
        showToast('Transmission received by Mendouksai Vanguard Network!');
        transmissionForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3500);
      }, 1200);
    });
  }


  // =========================================================================
  // 7. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle && mobileDrawer && mobileClose) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      sfx.click();
    });

    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
      sfx.click();
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  // =========================================================================
  // 8. 3D COVERFLOW TWEET SLIDER (For Creator Page)
  // =========================================================================
  const tweetTrack = document.getElementById('tweetTrack');
  const sliderPrevBtn = document.getElementById('sliderPrevBtn');
  const sliderNextBtn = document.getElementById('sliderNextBtn');

  if (tweetTrack) {
    const slides = Array.from(tweetTrack.querySelectorAll('.slide'));
    let currentSlide = 0;

    function updateSlider() {
      slides.forEach((slide, idx) => {
        slide.className = 'slide';
        if (idx === currentSlide) {
          slide.classList.add('active');
        } else if (idx === (currentSlide - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
        } else if (idx === (currentSlide + 1) % slides.length) {
          slide.classList.add('next');
        }
      });
    }

    if (sliderPrevBtn) {
      sliderPrevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        sfx.click();
      });
    }

    if (sliderNextBtn) {
      sliderNextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        sfx.click();
      });
    }

    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (slide.classList.contains('prev')) {
          e.preventDefault();
          currentSlide = idx;
          updateSlider();
          sfx.click();
        } else if (slide.classList.contains('next')) {
          e.preventDefault();
          currentSlide = idx;
          updateSlider();
          sfx.click();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && sliderPrevBtn) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
      } else if (e.key === 'ArrowRight' && sliderNextBtn) {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
      }
    });

    updateSlider();
  }

});
