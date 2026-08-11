/* ==========================================================================
   Truth: Political Transparency & Verified Priority Feed Algorithm
   ========================================================================== */

const samplePolicyAnalyses = [
  {
    id: 1,
    title: 'Youth Employment & Housing Subsidy Analysis',
    category: 'Employment & Welfare',
    beneficiaries: 'Large Corporate Contractors (42%), Direct Jobseekers (18%)',
    burden: 'Middle-income Taxpayers & Future Youth',
    verdict: 'Needs Structural Reform',
    proposal: 'Direct 0 margin platform adoption raises direct benefit payout to 75%'
  },
  {
    id: 2,
    title: 'Defense Budget Expansion vs Humanitarian Diplomacy',
    category: 'International Relations',
    beneficiaries: 'Military Vested Interests & Defense Contractors',
    burden: 'General Taxpayers & Social Safety Net Budget',
    verdict: 'Limits of Forceful Aggression',
    proposal: 'Reallocating 15% into Global Hospitality Network reduces conflict risk by 80%'
  }
];

// Priority feed posts weighted by Verified Trust Status
let reconciliationPosts = [
  {
    id: 101,
    author: 'Kenji Yamasaki (Verified Real-Name Member)',
    isVerified: true,
    verificationBadge: '🔵 Verified Trust Member',
    verificationType: 'Passport & Facebook Verified',
    reconciliationScore: 99,
    content: '"Both national defense advocates and peace advocates share the goal of protecting youth and life. Labeling the other side as evil prevents progress; open dialogue with real-name accountability is true strength."',
    boosted: true
  },
  {
    id: 102,
    author: 'Hannah Smith (Verified Real-Name Fellow)',
    isVerified: true,
    verificationBadge: '🔵 Verified Trust Member',
    verificationType: 'Student ID & Government ID Verified',
    reconciliationScore: 96,
    content: '"History shows force alone never brings lasting peace. Addressing root causes like poverty and homelessness is the only way to eliminate conflict."',
    boosted: true
  },
  {
    id: 103,
    author: 'Anonymous Contributor #4829',
    isVerified: false,
    verificationBadge: '⚪ Anonymous Member',
    verificationType: 'Basic Account (Welcomed)',
    reconciliationScore: 82,
    content: '"As someone currently struggling to find employment, I appreciate the 0 margin job board. We need constructive solutions, not online anger."',
    boosted: false
  }
];

function renderPolicyDashboard() {
  const container = document.getElementById('policyAnalysisGrid');
  if (!container) return;
  
  container.innerHTML = samplePolicyAnalyses.map(p => `
    <div class="card" style="border-left:4px solid #4F46E5;">
      <span class="agent-badge" style="background:#E0E7FF; color:#4F46E5;">${p.category}</span>
      <h3 style="font-size:1.15rem; margin-top:0.3rem; margin-bottom:0.75rem; font-family:var(--font-sans);">${p.title}</h3>
      
      <div style="background:#FAF6F0; border-radius:8px; padding:0.85rem; font-size:0.85rem; margin-bottom:1rem;">
        <p style="margin-bottom:0.4rem;"><strong>📊 Who Benefits:</strong> ${p.beneficiaries}</p>
        <p style="margin-bottom:0.4rem;"><strong>⚖️ Who Bears the Burden:</strong> ${p.burden}</p>
        <p style="margin-bottom:0.4rem; color:#C2410C;"><strong>🔍 Fact Diagnosis:</strong> ${p.verdict}</p>
      </div>
      
      <div style="background:#D1FAE5; border-radius:8px; padding:0.85rem; font-size:0.85rem; color:#064E3B;">
        <strong>💡 Alternative Proposal (zero-margin):</strong><br>${p.proposal}
      </div>
    </div>
  `).join('');
}

function renderReconciliationFeed() {
  const container = document.getElementById('reconciliationFeed');
  if (!container) return;
  
  // Sort posts: Verified real-name members first, then higher reconciliation score
  const sorted = [...reconciliationPosts].sort((a, b) => {
    if (a.isVerified !== b.isVerified) return a.isVerified ? -1 : 1;
    return b.reconciliationScore - a.reconciliationScore;
  });
  
  container.innerHTML = sorted.map(post => `
    <div class="card" style="background:${post.isVerified ? '#FFFDF9' : '#fff'}; border:${post.isVerified ? '2px solid #7DD3FC' : '1px solid #EADEC9'}; margin-bottom:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <strong style="font-size:1rem; color:#1F2937;">${post.author}</strong>
          ${post.isVerified ? 
            `<span class="verified-badge">${post.verificationBadge}</span>` : 
            `<span class="anonymous-badge">${post.verificationBadge}</span>`}
        </div>
        <span style="font-size:0.8rem; font-weight:700; background:#FEF3C7; color:#D97706; padding:0.2rem 0.65rem; border-radius:12px; border:1px solid #FCD34D;">
          🌟 ${post.isVerified ? 'Priority Verified Post' : 'Reconciliation Post'} (${post.reconciliationScore} pts)
        </span>
      </div>
      
      <p style="font-size:0.95rem; line-height:1.65; color:#2D3748; margin-bottom:0.75rem;">${post.content}</p>
      
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #EADEC9; padding-top:0.6rem; font-size:0.8rem; color:#718096;">
        <span>Verification: ${post.verificationType}</span>
        <button class="btn btn-secondary" style="padding:0.25rem 0.75rem; font-size:0.8rem;" onclick="boostReconciliationPost(${post.id})">
          🕊️ Support Peace Message
        </button>
      </div>
    </div>
  `).join('');
}

function submitPoliticalPost(event) {
  event.preventDefault();
  const text = document.getElementById('politicalPostText').value.trim();
  if (!text) return;
  
  const savedMember = localStorage.getItem('zeroMarginMember');
  let memberObj = savedMember ? JSON.parse(savedMember) : null;
  
  const isVerified = memberObj && memberObj.isVerified;
  const authorName = memberObj ? memberObj.name : 'Anonymous Member';
  
  const newPost = {
    id: Date.now(),
    author: isVerified ? `${authorName} (Verified Real-Name)` : `${authorName} #${Math.floor(1000 + Math.random()*9000)}`,
    isVerified: isVerified || false,
    verificationBadge: isVerified ? '🔵 Verified Trust Member' : '⚪ Anonymous Member',
    verificationType: isVerified ? (memberObj.verifyDoc || 'ID Verified') : 'Anonymous Account (Welcomed)',
    reconciliationScore: isVerified ? 95 : 80,
    content: `"${escapeHtml(text)}"`,
    boosted: isVerified || false
  };
  
  reconciliationPosts.unshift(newPost);
  renderReconciliationFeed();
  
  document.getElementById('politicalPostText').value = '';
  
  if (isVerified) {
    alert('Thank you for sharing your post as a Verified Real-Name Member! Your post has been prioritized at the top of the feed to promote trust and open dialogue.');
  } else {
    alert('Thank you for your post! Anonymous posts are welcomed. You can upgrade to a Verified Real-Name Member anytime in "My Page" to gain top priority placement.');
  }
}

function boostReconciliationPost(id) {
  const post = reconciliationPosts.find(p => p.id === id);
  if (post) {
    post.reconciliationScore += 5;
    renderReconciliationFeed();
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderPolicyDashboard();
  renderReconciliationFeed();
});
