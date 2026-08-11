/* ==========================================================================
   Main Application Controller, Simplified Sign-Up & My Page Manager
   ========================================================================== */

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('onclick') && item.getAttribute('onclick').includes(tabId));
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });
  
  const navElement = document.querySelector('.tab-nav');
  if (navElement) {
    window.scrollTo({ top: navElement.offsetTop - 90, behavior: 'smooth' });
  }
}

// Modal Controllers
function openRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) modal.classList.remove('active');
}

function openVerifyModal() {
  const modal = document.getElementById('verifyModal');
  if (modal) modal.classList.add('active');
}

function closeVerifyModal() {
  const modal = document.getElementById('verifyModal');
  if (modal) modal.classList.remove('active');
}

// Ultra-Simple Sign-Up Handler
function handleRegisterSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const wantVerified = document.getElementById('regVerifiedCheck').checked;
  
  if (!name || !email) {
    alert('Please enter your name and email.');
    return;
  }
  
  const memberId = 'ZM-' + Math.floor(10000 + Math.random() * 90000);
  const memberData = {
    name: name,
    email: email,
    memberId: memberId,
    isVerified: wantVerified,
    verifyDoc: wantVerified ? 'Self-Declared Real-Name' : null,
    registeredDate: new Date().toLocaleDateString()
  };
  
  localStorage.setItem('zeroMarginMember', JSON.stringify(memberData));
  closeRegisterModal();
  updateMemberState();
  
  if (wantVerified) {
    openVerifyModal();
  } else {
    alert(`Welcome to zero-margin, ${name}!\nMember ID: ${memberId}\nYour account is active. You can visit "My Page" anytime.`);
  }
}

// Real-Name ID / Facebook Verification Handler
function handleVerificationSubmit(event) {
  event.preventDefault();
  
  const docType = document.getElementById('verifyDocType').value;
  const realName = document.getElementById('verifyRealName').value.trim();
  
  const saved = localStorage.getItem('zeroMarginMember');
  if (!saved) return;
  
  let memberObj = JSON.parse(saved);
  memberObj.isVerified = true;
  memberObj.verifyDoc = docType;
  if (realName) memberObj.name = realName;
  
  localStorage.setItem('zeroMarginMember', JSON.stringify(memberObj));
  closeVerifyModal();
  updateMemberState();
  
  alert(`Verification Complete!\nCongratulations ${memberObj.name}! You are now a "🔵 Verified Trust Member". Your posts will be prioritized at the top of feeds to foster trust and peace.`);
}

function updateMemberState() {
  const saved = localStorage.getItem('zeroMarginMember');
  const navContainer = document.getElementById('navMemberArea');
  const myPageTabBtn = document.getElementById('myPageTabBtn');
  const myPageContent = document.getElementById('myPageContentArea');
  
  if (saved) {
    const member = JSON.parse(saved);
    
    // Show My Page button in tab bar
    if (myPageTabBtn) myPageTabBtn.style.display = 'inline-flex';
    
    // Navbar display
    if (navContainer) {
      navContainer.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem; background:#FFFDF9; border:1px solid #EADEC9; padding:0.35rem 0.85rem; border-radius:9999px; cursor:pointer;" onclick="switchTab('mypage')">
          <span style="font-weight:700; font-size:0.85rem; color:#1F2937;">👤 ${escapeHtml(member.name)}</span>
          ${member.isVerified ? 
            `<span class="verified-badge">🔵 Verified Member</span>` : 
            `<span class="anonymous-badge">⚪ Anonymous</span>`}
        </div>
      `;
    }
    
    // Render My Page Content
    if (myPageContent) {
      myPageContent.innerHTML = `
        <div style="background:var(--bg-card); border:1px solid var(--border-warm); border-radius:var(--radius-lg); padding:2.5rem; margin-bottom:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem; border-bottom:1px solid var(--border-warm); padding-bottom:1.5rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
                <h2 style="font-size:2rem; margin:0;">${escapeHtml(member.name)}</h2>
                ${member.isVerified ? 
                  `<span class="verified-badge" style="font-size:0.85rem; padding:0.3rem 0.8rem;">🔵 Verified Trust Member</span>` : 
                  `<span class="anonymous-badge" style="font-size:0.85rem; padding:0.3rem 0.8rem;">⚪ Anonymous Member</span>`}
              </div>
              <p style="font-size:0.9rem; color:var(--text-secondary);">Member ID: <strong>${member.memberId}</strong> | Registered: ${member.registeredDate}</p>
            </div>
            
            ${!member.isVerified ? `
              <button class="btn btn-indigo" onclick="openVerifyModal()">
                🔒 Verify Real-Name (Get 🔵 Trust Badge & Priority Feed)
              </button>
            ` : `
              <div style="background:#E0F2FE; border:1px solid #7DD3FC; padding:0.75rem 1.25rem; border-radius:12px; color:#0369A1; font-size:0.85rem; font-weight:600;">
                ✓ Verified via ${escapeHtml(member.verifyDoc)}
              </div>
            `}
          </div>

          <div class="grid-3" style="margin-bottom:2rem;">
            <div class="card" style="background:#FFFDF9;">
              <h4 style="font-size:0.95rem; color:#718096; margin-bottom:0.4rem;">Work (0 Margin) Status</h4>
              <strong style="font-size:1.5rem; color:#059669;">0 Active Listings</strong>
              <p style="font-size:0.8rem; color:#4A5568; margin-top:0.3rem;">100% payout protected with 0% platform cuts.</p>
            </div>
            <div class="card" style="background:#FFFDF9;">
              <h4 style="font-size:0.95rem; color:#718096; margin-bottom:0.4rem;">Shelter Intake Status</h4>
              <strong style="font-size:1.5rem; color:#D97706;">Confidential & Safe</strong>
              <p style="font-size:0.8rem; color:#4A5568; margin-top:0.3rem;">Connected to 24/7 AI intake & local care.</p>
            </div>
            <div class="card" style="background:#FFFDF9;">
              <h4 style="font-size:0.95rem; color:#718096; margin-bottom:0.4rem;">Feed Priority Weight</h4>
              <strong style="font-size:1.5rem; color:#4F46E5;">${member.isVerified ? 'Top Priority (Verified)' : 'Standard (Anonymous)'}</strong>
              <p style="font-size:0.8rem; color:#4A5568; margin-top:0.3rem;">${member.isVerified ? 'Your posts are ranked at the top of feeds.' : 'Upgrade to real-name for priority ranking.'}</p>
            </div>
          </div>

          <div style="text-align:right;">
            <button class="btn btn-secondary" style="font-size:0.85rem; color:#E11D48;" onclick="handleLogout()">
              Log Out
            </button>
          </div>
        </div>
      `;
    }
  } else {
    if (myPageTabBtn) myPageTabBtn.style.display = 'none';
    if (navContainer) {
      navContainer.innerHTML = `
        <button class="btn btn-emerald" style="padding:0.45rem 1rem; font-size:0.85rem;" onclick="openRegisterModal()">
          👤 Member Sign Up (Free)
        </button>
      `;
    }
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to log out of zero-margin?')) {
    localStorage.removeItem('zeroMarginMember');
    updateMemberState();
    switchTab('philosophy');
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  updateMemberState();
});
