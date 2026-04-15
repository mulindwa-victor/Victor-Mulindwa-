
    // ── CURSOR ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animCursor() {
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, .btn, .service-card, .social-card, .value-chip, .project-card, .testimonial-card, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; ring.style.width = '54px'; ring.style.height = '54px'; });
      el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; ring.style.width = '36px'; ring.style.height = '36px'; });
    });

    // ── PARTICLES ──
    const particlesEl = document.getElementById('particles');
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div'); p.className = 'particle';
      p.style.setProperty('--left', Math.random() * 100 + '%');
      p.style.setProperty('--dur', (8 + Math.random() * 12) + 's');
      p.style.setProperty('--delay', (Math.random() * 15) + 's');
      p.style.width = p.style.height = (1.5 + Math.random() * 3) + 'px';
      particlesEl.appendChild(p);
    }

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // ── PHOTO FALLBACK ──
    document.querySelectorAll('#heroPhoto, #aboutPhoto').forEach(img => {
      const isHero = img.id === 'heroPhoto';
      const h = isHero ? 'clamp(320px,80vh,900px)' : 'clamp(280px,45vw,500px)';
      const monogram = isHero ? 'MV' : 'MLV';
      const subtitle = isHero ? 'Mulindwa Victor' : 'Digital Solutions';
      const fallback = document.createElement('div');
      fallback.style.cssText = `width:100%;height:${h};background:linear-gradient(160deg,#2D2010 0%,#1A1206 45%,#3D3015 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;`;
      fallback.innerHTML = `
        <div style="position:absolute;width:340px;height:340px;border-radius:50%;border:1px solid rgba(244,166,52,0.08);top:50%;left:50%;transform:translate(-50%,-50%)"></div>
        <div style="position:absolute;width:220px;height:220px;border-radius:50%;border:1px solid rgba(244,166,52,0.12);top:50%;left:50%;transform:translate(-50%,-50%)"></div>
        <div style="text-align:center;position:relative;z-index:1;">
          <div style="font-family:'Playfair Display',serif;font-size:5.5rem;font-weight:900;color:rgba(244,166,52,0.75);line-height:1;text-shadow:0 0 60px rgba(244,166,52,0.2);">${monogram}</div>
          <div style="font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.3em;color:rgba(168,144,112,0.7);text-transform:uppercase;margin-top:0.7rem;">${subtitle}</div>
        </div>`;
      img.onerror = function() { this.replaceWith(fallback); };
    });

    // ── FORM SUBMISSION (Formspree) ──
    // INSTRUCTIONS: Replace 'YOUR_FORMSPREE_ID' below with your real Formspree endpoint ID
    // Get yours free at: https://formspree.io → Create account → New Form → Copy the ID
    // Example: if your endpoint is https://formspree.io/f/xpzgkwdo, your ID is xpzgkwdo
    const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // ← REPLACE THIS

    async function submitForm() {
      const btn = document.getElementById('submitBtn');
      const text = document.getElementById('submitText');
      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and message before submitting.');
        return;
      }

      btn.disabled = true;
      text.textContent = 'Sending…';

      const formData = {
        name,
        email,
        phone: document.getElementById('fphone').value,
        service: document.getElementById('fservice').value,
        budget: document.getElementById('fbudget').value,
        message,
        submitted_at: new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' })
      };

      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          document.getElementById('contactForm').style.display = 'none';
          document.getElementById('formSuccess').style.display = 'block';
        } else {
          throw new Error('Server error');
        }
      } catch (e) {
        alert('Something went wrong. Please try again or contact me directly on WhatsApp.');
        btn.disabled = false;
        text.textContent = 'Send Enquiry →';
      }
    }
  