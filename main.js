/* ==========================================================================
   Kite Browser - Interactive UI & OS Detection Script
   Domain: kite.luqis.live
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initOSDetection();
  initBrowserMockup();
  initRamLimiterWidget();
});

/* Navbar Blur on Scroll */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Detect Visitor's Operating System */
function initOSDetection() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const osElement = document.getElementById('detected-os-text');
  const winBtn = document.getElementById('hero-download-win');
  const apkBtn = document.getElementById('hero-download-apk');

  if (/android/i.test(userAgent)) {
    if (osElement) osElement.textContent = "Android detected — Highlighted APK Download";
    if (apkBtn) {
      apkBtn.classList.remove('btn-secondary');
      apkBtn.classList.add('btn-primary');
    }
    if (winBtn) {
      winBtn.classList.remove('btn-primary');
      winBtn.classList.add('btn-secondary');
    }
  } else if (/Win/i.test(navigator.platform) || /Windows/i.test(userAgent)) {
    if (osElement) osElement.textContent = "Windows 64-bit detected — Optimized Setup";
  } else if (/Mac/i.test(navigator.platform)) {
    if (osElement) osElement.textContent = "macOS detected — Windows & Android available";
  }
}

/* Interactive Browser Mockup Logic */
function initBrowserMockup() {
  const tabs = document.querySelectorAll('.v-tab');
  const addressUrl = document.getElementById('mockup-url');
  const paneLeftTitle = document.getElementById('pane-left-title');
  const paneLeftContent = document.getElementById('pane-left-content');
  const splitBtn = document.getElementById('mockup-split-toggle');
  const splitPaneRight = document.getElementById('pane-right');
  const sidebarBtns = document.querySelectorAll('.sidebar-btn');
  const toolDrawer = document.getElementById('tool-drawer');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerContent = document.getElementById('drawer-content');

  // Tab switching data
  const tabData = {
    'tab-home': {
      url: 'kite://speeddial',
      title: '🚀 Speed Dial & Favorites',
      content: 'Instant access to your top websites, custom shortcuts, and aerodynamic widget dashboard.'
    },
    'tab-game': {
      url: 'kite://gameboost',
      title: '🎮 Hardware Limiter & Game Boost Active',
      content: 'CPU and RAM allocation capped at 25%. Background tabs are automatically put to sleep to maximize FPS in games.'
    },
    'tab-split': {
      url: 'https://github.com/luqisdev | kite.luqis.live',
      title: '📐 Dual Split Screen View',
      content: 'Browse documentation on the left while checking code or video on the right seamlessly.'
    },
    'tab-settings': {
      url: 'kite://settings',
      title: '⚙️ Native In-Tab Settings',
      content: 'Instant search routing for Adblock filters, WebRTC leak shield, and Canvas WebGL privacy spoofer.'
    }
  };

  // Handle Tab Click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-tab');
      const data = tabData[targetId];

      if (data) {
        if (addressUrl) addressUrl.textContent = data.url;
        if (paneLeftTitle) paneLeftTitle.textContent = data.title;
        if (paneLeftContent) paneLeftContent.textContent = data.content;
      }

      // Auto toggle split view if split tab clicked
      if (targetId === 'tab-split' && splitPaneRight) {
        splitPaneRight.style.display = 'block';
        if (splitBtn) splitBtn.classList.add('active');
      }
    });
  });

  // Handle Split Screen Button
  if (splitBtn && splitPaneRight) {
    splitBtn.addEventListener('click', () => {
      if (splitPaneRight.style.display === 'none' || !splitPaneRight.style.display) {
        splitPaneRight.style.display = 'block';
        splitBtn.classList.add('active');
      } else {
        splitPaneRight.style.display = 'none';
        splitBtn.classList.remove('active');
      }
    });
  }

  // Handle Utility Sidebar Drawers (Translator, Calculator, Quick Notes)
  const sidebarData = {
    'side-translate': {
      title: '🌐 Google Translator',
      html: '<p style="font-size:0.85rem; color:#94a3b8; margin-bottom:10px;">Translate page or selected text instantly:</p><input type="text" value="Ultra-Lightweight Browser" style="width:100%; padding:8px; background:#070a12; border:1px solid #1e293b; color:#fff; border-radius:6px; margin-bottom:8px;" readonly/><p style="font-size:0.85rem; color:#00f2fe;">🇹🇷 Süper Hafif Tarayıcı</p>'
    },
    'side-calc': {
      title: '🧮 Quick Calculator',
      html: '<div style="background:#070a12; padding:12px; border-radius:8px; text-align:right; font-family:monospace; font-size:1.2rem; color:#00f5a0; margin-bottom:10px; border:1px solid #1e293b;">1,024 MB - 768 MB = 256 MB</div><p style="font-size:0.8rem; color:#94a3b8;">RAM Saved with Kite Tab Sleeping.</p>'
    },
    'side-notes': {
      title: '📝 Quick Notes',
      html: '<textarea placeholder="Write scratchpad notes..." style="width:100%; height:100px; background:#070a12; border:1px solid #1e293b; color:#fff; border-radius:6px; padding:8px; font-size:0.85rem;">- Test Kite Browser v1.0\n- Download APK for Android\n- Subdomain: kite.luqis.live</textarea>'
    }
  };

  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const toolId = btn.getAttribute('data-tool');
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        if (toolDrawer) toolDrawer.classList.remove('open');
      } else {
        sidebarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (sidebarData[toolId] && toolDrawer) {
          drawerTitle.innerHTML = sidebarData[toolId].title;
          drawerContent.innerHTML = sidebarData[toolId].html;
          toolDrawer.classList.add('open');
        }
      }
    });
  });
}

/* Interactive RAM Limiter Simulation Widget */
function initRamLimiterWidget() {
  const ramSlider = document.getElementById('ram-slider');
  const ramUsageText = document.getElementById('ram-usage-text');
  const ramFill = document.getElementById('ram-bar-fill');

  if (ramSlider && ramUsageText && ramFill) {
    ramSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      ramUsageText.textContent = `${val} MB RAM Allocated`;
      ramFill.style.width = `${(val / 1024) * 100}%`;
    });
  }
}
