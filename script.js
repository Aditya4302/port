 
  document.getElementById('year').textContent = new Date().getFullYear();
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const sections = tabs.map(t => document.querySelector(t.dataset.target));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        tabs.forEach(t => t.classList.remove('active'));
        if (idx > -1) tabs[idx].classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => sec && spy.observe(sec));

  const heroLines = [
    { plain: 'const developer = {', styled: '<span class="kw">const</span> <span class="fn">developer</span> <span class="punc">=</span> <span class="punc">{</span>' },
    { plain: '  name: "Aditya Kumar Thakur",', styled: '&nbsp;&nbsp;name: <span class="str">"Aditya Kumar Thakur"</span>,' },
    { plain: '  role: "Java Developer & AI/DevOps Enthusiast",', styled: '&nbsp;&nbsp;role: <span class="str">"Java Developer & AI/DevOps Enthusiast"</span>,' },
    { plain: '};', styled: '<span class="punc">};</span>' }
  ];

  const heroEl = document.getElementById('heroType');

  function typeHero(){
    const finishedHtml = [];
    let lineIndex = 0;
    let charIndex = 0;

    function render(currentPlain){
      heroEl.innerHTML = finishedHtml.join('\n') +
        (finishedHtml.length ? '\n' : '') +
        escapeHtml(currentPlain) + '<span class="caret"></span>';
    }

    function escapeHtml(str){
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function step(){
      if (lineIndex >= heroLines.length) return;

      const line = heroLines[lineIndex];

      if (charIndex <= line.plain.length) {
        render(line.plain.slice(0, charIndex));
        charIndex++;
        setTimeout(step, 12 + Math.random() * 20);
      } else {
        finishedHtml.push(line.styled);
        lineIndex++;
        charIndex = 0;
        setTimeout(step, 110);
      }
    }
    step();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    heroEl.innerHTML = heroLines.map(l => l.styled).join('\n');
  } else {
    typeHero();
  }

  const tokens = [
    'const x = 42;', 'function run() {}', '=> { return true; }',
    'if (user.isAuthenticated) {', '} catch (err) {', 'for (let i = 0; i < n; i++)',
    'import React from "react";', 'System.out.println("Hello, World!");',
    'print("Hello, World!")', '#include <iostream>', 'SELECT * FROM users;',
    'git commit -m "fix bug"', 'docker build -t app .', 'kubectl apply -f deploy.yaml',
    'npm install', 'async function fetchData()', 'class ATM {', 'useState(0)',
    'public static void main', 'try { } finally { }', '0x4F2A', 'true && !false',
    '// TODO: refactor', '/* model.fit(X, y) */', 'CREATE TABLE logs (', 'return NotImplemented',
    'let packet = capture();', 'model.predict(traffic)', 'while (alive) {}', 'console.log(data);'
  ];

  const hueSet = ['var(--teal)', 'var(--blue)', 'var(--pink)', 'var(--yellow)', 'var(--text-dim)'];
  const isMobile = window.innerWidth < 700;

  const layerConfig = [
    { el: document.getElementById('layerFar'),  count: isMobile ? 6  : 12, sizeRange: [10, 13], opacityRange: [0.04, 0.09], blur: 2.2, speedRange: [26, 34] },
    { el: document.getElementById('layerMid'),  count: isMobile ? 7  : 13, sizeRange: [13, 17], opacityRange: [0.07, 0.14], blur: 1.1, speedRange: [18, 26] },
    { el: document.getElementById('layerNear'), count: isMobile ? 6  : 11, sizeRange: [17, 23], opacityRange: [0.10, 0.20], blur: 0,   speedRange: [12, 18] }
  ];

  function rand(min, max){ return min + Math.random() * (max - min); }

  layerConfig.forEach(cfg => {
    if (!cfg.el) return;
    for (let i = 0; i < cfg.count; i++) {
      const el = document.createElement('span');
      el.className = 'bg-token';
      el.textContent = tokens[Math.floor(Math.random() * tokens.length)];

      const size = rand(cfg.sizeRange[0], cfg.sizeRange[1]);
      const opacity = rand(cfg.opacityRange[0], cfg.opacityRange[1]);
      const duration = rand(cfg.speedRange[0], cfg.speedRange[1]);
      const delay = -Math.random() * duration;
      const left = Math.random() * 100;
      const rz = rand(-6, 6);

      el.style.left = left + 'vw';
      el.style.fontSize = size + 'px';
      el.style.opacity = opacity;
      el.style.color = hueSet[Math.floor(Math.random() * hueSet.length)];
      if (cfg.blur) el.style.filter = `blur(${cfg.blur}px)`;
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.setProperty('--rz', rz + 'deg');

      cfg.el.appendChild(el);
    }
  });

  const bgCode = document.getElementById('bgCode');
  const bgGlow = document.getElementById('bgGlow');

  if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    let targetX = 0, targetY = 0, curX = 0, curY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 .. 1
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 .. 1

      if (bgGlow) {
        bgGlow.style.setProperty('--gx', (e.clientX / window.innerWidth * 100) + '%');
        bgGlow.style.setProperty('--gy', (e.clientY / window.innerHeight * 100) + '%');
      }
    });

    function raf(){
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      if (bgCode) {
        bgCode.style.transform = `rotateX(${curY * -4}deg) rotateY(${curX * 5}deg)`;
      }

      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
