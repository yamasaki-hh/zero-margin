/* ==========================================================================
   Main Application Controller, Simplified Sign-Up & My Page Gamification
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
  if (modal) modal.classList.remove('active');
}

function closeVerifyModal() {
  const modal = document.getElementById('verifyModal');
  if (modal) modal.classList.remove('active');
}

// Rank & Contribution Calculator
function calculateMemberRank(pts, isVerified) {
  let basePoints = pts || 0;
  if (isVerified) basePoints += 150; // Bonus points for real-name verification
  
  if (basePoints >= 1000) {
    return { title: 'Golden Pioneer', icon: '🌟', color: '#D97706', level: 5, nextPts: 2000, desc: 'Master Pioneer nurturing global shelter & peace' };
  } else if (basePoints >= 500) {
    return { title: 'Fruitful Guardian', icon: '🍎', color: '#E11D48', level: 4, nextPts: 1000, desc: 'Providing fruits of support & active mentorship' };
  } else if (basePoints >= 250) {
    return { title: 'Growing Tree', icon: '🌳', color: '#059669', level: 3, nextPts: 500, desc: 'Deep roots established in community & work' };
  } else if (basePoints >= 100) {
    return { title: 'Sprout Fellow', icon: '🌿', color: '#16A34A', level: 2, nextPts: 250, desc: 'Actively participating in dialogue & 0 margin work' };
  } else {
    return { title: 'Seed Fellow', icon: '🌱', color: '#C2410C', level: 1, nextPts: 100, desc: 'Receiving God’s love & starting the journey' };
  }
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
    points: 50, // Initial sign-up bonus
    history: [
      { action: 'Initial Community Registration', pts: '+50', date: new Date().toLocaleDateString() }
    ],
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
    alert(`Welcome to zero-margin, ${name}!\nMember ID: ${memberId}\nYour rank: 🌱 Seed Fellow (50 pts)\nVisit "My Page" anytime to check your growth!`);
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
  memberObj.points = (memberObj.points || 50) + 150;
  memberObj.history.unshift({ action: `Real-Name Verification (${docType})`, pts: '+150', date: new Date().toLocaleDateString() });
  
  localStorage.setItem('zeroMarginMember', JSON.stringify(memberObj));
  closeVerifyModal();
  updateMemberState();
  
  const rank = calculateMemberRank(memberObj.points, memberObj.isVerified);
  alert(`Verification Complete!\n${memberObj.name} is now a "🔵 Verified Trust Member".\nNew Rank: ${rank.icon} ${rank.title} (${memberObj.points} pts)\nYour posts will now be prioritized at the top of community feeds!`);
}

// Add Contribution Action (Log Action to earn points)
function logContributionAction(actionName, ptsValue) {
  const saved = localStorage.getItem('zeroMarginMember');
  if (!saved) {
    openRegisterModal();
    return;
  }
  
  let memberObj = JSON.parse(saved);
  memberObj.points = (memberObj.points || 0) + ptsValue;
  if (!memberObj.history) memberObj.history = [];
  memberObj.history.unshift({ action: actionName, pts: `+${ptsValue}`, date: new Date().toLocaleDateString() });
  
  localStorage.setItem('zeroMarginMember', JSON.stringify(memberObj));
  updateMemberState();
  
  const rank = calculateMemberRank(memberObj.points, memberObj.isVerified);
  alert(`Contribution Logged!\nAction: ${actionName} (+${ptsValue} pts)\nTotal Points: ${memberObj.points} pts\nCurrent Rank: ${rank.icon} ${rank.title}`);
}

function updateMemberState() {
  const saved = localStorage.getItem('zeroMarginMember');
  const navContainer = document.getElementById('navMemberArea');
  const myPageTabBtn = document.getElementById('myPageTabBtn');
  const myPageContent = document.getElementById('myPageContentArea');
  
  if (saved) {
    const member = JSON.parse(saved);
    const rank = calculateMemberRank(member.points, member.isVerified);
    
    if (myPageTabBtn) myPageTabBtn.style.display = 'inline-flex';
    
    // Navbar display with Rank Icon
    if (navContainer) {
      navContainer.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem; background:#FFFDF9; border:1px solid #EADEC9; padding:0.35rem 0.85rem; border-radius:9999px; cursor:pointer;" onclick="switchTab('mypage')">
          <span style="font-size:1.1rem;">${rank.icon}</span>
          <span style="font-weight:700; font-size:0.85rem; color:#1F2937;">${escapeHtml(member.name)}</span>
          ${member.isVerified ? 
            `<span class="verified-badge">🔵 Verified</span>` : 
            `<span class="anonymous-badge">⚪ ${rank.title}</span>`}
        </div>
      `;
    }
    
    // Render Enriched My Page Content
    if (myPageContent) {
      const fillPercent = Math.min(100, Math.round((member.points / rank.nextPts) * 100));
      
      myPageContent.innerHTML = `
        <div style="background:var(--bg-card); border:1px solid var(--border-warm); border-radius:var(--radius-lg); padding:2.5rem; margin-bottom:2rem; box-shadow:var(--shadow-sm);">
          
          <!-- Top Member Banner & Rank Card -->
          <div class="rank-card" style="margin-bottom:2rem;">
            <div class="rank-avatar">
              ${rank.icon}
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                <div>
                  <h2 style="font-size:1.6rem; font-family:var(--font-sans); margin:0;">${escapeHtml(member.name)}</h2>
                  <p style="font-size:0.85rem; color:#718096; margin-top:0.2rem;">
                    Member ID: <strong>${member.memberId}</strong> | Rank Level ${rank.level}: <strong style="color:${rank.color};">${rank.title}</strong>
                  </p>
                </div>
                ${member.isVerified ? 
                  `<span class="verified-badge" style="font-size:0.85rem; padding:0.35rem 0.85rem;">🔵 Verified Trust Member</span>` : 
                  `<button class="btn btn-indigo" style="padding:0.4rem 0.9rem; font-size:0.8rem;" onclick="openVerifyModal()">🔒 Upgrade Real-Name (+150 pts & Priority Feed)</button>`}
              </div>
              
              <!-- Progress Bar -->
              <div style="margin-top:0.75rem;">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:700; color:#4A5568;">
                  <span>Contribution Points: ${member.points} pts</span>
                  <span>Next Rank Goal: ${rank.nextPts} pts</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" style="width:${fillPercent}%;"></div>
                </div>
                <p style="font-size:0.75rem; color:#718096; margin-top:0.3rem;">${rank.desc}</p>
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons to Increase Contribution -->
          <div style="background:#FFFDF9; border:1px solid #EADEC9; border-radius:12px; padding:1.5rem; margin-bottom:2rem;">
            <h3 style="font-size:1.15rem; margin-bottom:0.75rem; font-family:var(--font-sans);">🌟 Log Platform Actions & Grow Your Rank</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">
              Contribute to 0 Margin Work, Shelter support, or Peace discussions to earn points and upgrade your rank icon from Seed 🌱 to Sprout 🌿, Tree 🌳, Fruit 🍎, and Pioneer 🌟!
            </p>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
              <button class="btn btn-emerald" style="font-size:0.85rem; padding:0.5rem 1rem;" onclick="logContributionAction('Posted / Applied 0 Margin Job', 40)">
                💼 Log 0 Margin Work (+40 pts)
              </button>
              <button class="btn btn-primary" style="font-size:0.85rem; padding:0.5rem 1rem;" onclick="logContributionAction('Supported Local Shelter / Volunteer Care', 50)">
                🏠 Log Shelter Support (+50 pts)
              </button>
              <button class="btn btn-indigo" style="font-size:0.85rem; padding:0.5rem 1rem;" onclick="logContributionAction('Supported Peace & Reconciliation Post', 30)">
                🕊️ Log Peace Message (+30 pts)
              </button>
            </div>
          </div>

          <!-- Activity History Timeline -->
          <h3 style="font-size:1.2rem; margin-bottom:1rem; font-family:var(--font-sans);">📜 Contribution History</h3>
          <div style="background:#FFF; border:1px solid #EADEC9; border-radius:12px; padding:1rem;">
            ${member.history && member.history.length > 0 ? 
              member.history.map(item => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0; border-bottom:1px dashed #EADEC9;">
                  <div>
                    <strong style="font-size:0.9rem; color:#1F2937;">${escapeHtml(item.action)}</strong>
                    <span style="font-size:0.75rem; color:#718096; margin-left:0.5rem;">${item.date}</span>
                  </div>
                  <span style="font-weight:700; color:#059669; font-size:0.9rem;">${item.pts} pts</span>
                </div>
              `).join('') : 
              `<p style="font-size:0.85rem; color:#718096;">No activities logged yet.</p>`}
          </div>

          <div style="margin-top:2rem; text-align:right;">
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
