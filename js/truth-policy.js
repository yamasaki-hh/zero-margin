/* ==========================================================================
   Truth: Political Transparency & Reconciliation Algorithm
   ========================================================================== */

const samplePolicyAnalyses = [
  {
    id: 1,
    title: 'Youth Employment & Housing Subsidy Analysis',
    category: 'Employment & Welfare',
    beneficiaries: 'Large Corporate Contractors (42%), Direct Jobseekers (18%)',
    burden: 'Middle-income Taxpayers & Future Youth',
    verdict: 'Needs Structural Reform',
    proposal: 'Direct 0% fee platform adoption raises direct benefit payout to 75%'
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

const sampleReconciliationPosts = [
  {
    id: 101,
    author: 'Peace & Reconciliation Advocate (Tokyo)',
    stance: 'Transcending Right vs Left',
    reconciliationScore: 98,
    content: '"Both national defense advocates and peace advocates share the goal of protecting youth and life. Labeling the other side as evil prevents progress; open dialogue is true strength."',
    boosted: true
  },
  {
    id: 102,
    author: 'Global Fellow (Berlin)',
    stance: 'Humanitarian Policy Fellow',
    reconciliationScore: 95,
    content: '"History shows force alone never brings lasting peace. Addressing root causes like poverty and hopelessness is the only way to eliminate conflict."',
    boosted: true
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
  
  container.innerHTML = sampleReconciliationPosts.map(post => `
    <div class="card" style="background:${post.boosted ? '#FFFDF9' : '#fff'}; border:${post.boosted ? '2px solid #FCD34D' : '1px solid #EADEC9'}; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <strong style="font-size:0.95rem;">${post.author}</strong>
          <span style="font-size:0.75rem; color:#718096; background:#EDF2F7; padding:0.1rem 0.5rem; border-radius:10px;">${post.stance}</span>
        </div>
        <span style="font-size:0.8rem; font-weight:700; background:#FEF3C7; color:#D97706; padding:0.2rem 0.6rem; border-radius:12px; border:1px solid #FCD34D;">
          🌟 Reconciliation Score: ${post.reconciliationScore}/100 (Promoted)
        </span>
      </div>
      <p style="font-size:0.95rem; line-height:1.6; color:#2D3748; font-style:italic;">${post.content}</p>
      <div style="margin-top:0.75rem; text-align:right;">
        <button class="btn btn-secondary" style="padding:0.3rem 0.75rem; font-size:0.8rem;" onclick="boostReconciliationPost(${post.id})">
          🕊️ Support Peace Message
        </button>
      </div>
    </div>
  `).join('');
}

function submitPoliticalPost(event) {
  event.preventDefault();
  const text = document.getElementById('politicalPostText').value;
  if (!text.trim()) return;
  
  alert('Your political post has been submitted.\nTruth AI scores posts based on constructive dialogue, reconciliation, and peace, promoting un-polarized perspectives to the top.');
  document.getElementById('politicalPostText').value = '';
}

function boostReconciliationPost(id) {
  alert('Thank you for supporting this peace message! Together we bridge political divides.');
}

window.addEventListener('DOMContentLoaded', () => {
  renderPolicyDashboard();
  renderReconciliationFeed();
});
