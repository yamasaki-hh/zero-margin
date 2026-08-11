/* ==========================================================================
   AI runaway & Global War Prevention Hub
   ========================================================================== */

const threatMetrics = [
  { 
    title: 'Autonomous Weapons (LAWS) Monitoring', 
    status: 'High Alert', 
    score: 'Level 4/5', 
    detail: 'Monitoring lethal autonomous weapon deployment. Proposing ethical constraints based on human dignity and God’s love.' 
  },
  { 
    title: 'Analysis of Forceful "North Wind" Policies', 
    status: 'Limits Proven', 
    score: 'Dialogue Needed', 
    detail: 'Analyzing historical failures of pressure-only foreign policy (e.g. US military interventions). Advocating reconciliation and economic care.' 
  },
  { 
    title: 'Reconciliation Channel with Designated Groups', 
    status: 'Protocol Active', 
    score: 'Neutral Intake', 
    detail: 'Building unofficial humanitarian dialogue channels to melt conflict, anger, and sorrow between enemy nations and groups.' 
  }
];

function renderAntiWarHub() {
  const container = document.getElementById('antiWarMetricGrid');
  if (!container) return;
  
  container.innerHTML = threatMetrics.map(m => `
    <div class="card" style="border-top:4px solid #C2410C;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <span class="agent-badge" style="background:#FFEDD5; color:#C2410C;">${m.status}</span>
        <strong style="color:#C2410C; font-size:0.9rem;">${m.score}</strong>
      </div>
      <h3 style="font-size:1.1rem; margin-bottom:0.5rem; font-family:var(--font-sans);">${m.title}</h3>
      <p style="font-size:0.875rem; color:#4A5568; line-height:1.6; margin-bottom:1rem;">${m.detail}</p>
      <button class="btn btn-secondary" style="width:100%; justify-content:center; padding:0.5rem; font-size:0.85rem;" onclick="openPeaceDialogueModal('${m.title}')">
        Participate in Peace Proposal
      </button>
    </div>
  `).join('');
}

function openPeaceDialogueModal(title) {
  alert(`Proposal form for "${title}" will open.\nGuardian Agent and Global Fellows will review your insights and present recommendations to international policy councils.`);
}

window.addEventListener('DOMContentLoaded', () => {
  renderAntiWarHub();
});
