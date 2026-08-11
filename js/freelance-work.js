/* ==========================================================================
   Work: 0% Fee Freelance & Employment Relief Platform
   ========================================================================== */

const sampleJobs = [
  {
    id: 1,
    title: 'Multilingual Translation (Japanese ⇔ English ⇔ Korean)',
    category: 'Translation & Guide',
    client: 'Okinawa Tourist Interpreter Guild',
    budget: '$500',
    location: 'Remote / Okinawa',
    desc: 'Translating travel & cultural guide material for youth tourism initiatives. 100% payout goes directly to you with 0% platform fee.',
    tags: ['0% Fee', 'Multilingual', 'Youth Welcome']
  },
  {
    id: 2,
    title: 'Warm Hand-Drawn Logo & Web Illustration',
    category: 'Design & Art',
    client: 'Netherlands Local Community Hub',
    budget: '$800',
    location: 'Remote',
    desc: 'Designing warm, analog-style logo assets for apparel and web. Open to beginner youth freelancers mentored by senior fellows.',
    tags: ['0% Fee', 'Art & Expression', 'Beginner Friendly']
  },
  {
    id: 3,
    title: 'Real Estate & Housing Data Research',
    category: 'Data & Writing',
    client: 'Housing Rights Authors Group',
    budget: '$1,200',
    location: 'Remote',
    desc: 'Collecting data and writing articles on affordable housing policies for youth. Build your portfolio while receiving 100% of your earnings.',
    tags: ['0% Fee', 'Housing Support', 'Career Relief']
  }
];

function calculateSavings(amount) {
  const num = parseFloat(amount) || 0;
  const traditionalFee = num * 0.20;
  const netEarnings = num;
  
  return {
    traditionalFee: Math.round(traditionalFee),
    zeroMarginFee: 0,
    savings: Math.round(traditionalFee),
    netEarnings: Math.round(netEarnings)
  };
}

function renderWorkJobs() {
  const container = document.getElementById('workJobGrid');
  if (!container) return;
  
  container.innerHTML = sampleJobs.map(job => `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
        <span class="agent-badge" style="background:#D1FAE5; color:#059669;">${job.category}</span>
        <strong style="font-size:1.2rem; color:#059669;">${job.budget} <span style="font-size:0.75rem; color:#718096;">(0% Fee)</span></strong>
      </div>
      <h3 style="font-size:1.15rem; margin-bottom:0.5rem; font-family:var(--font-sans);">${job.title}</h3>
      <p style="font-size:0.85rem; color:#4A5568; margin-bottom:1rem;">Client: ${job.client} | Location: ${job.location}</p>
      <p style="font-size:0.9rem; color:#2D3748; margin-bottom:1.25rem;">${job.desc}</p>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.25rem;">
        ${job.tags.map(t => `<span style="font-size:0.75rem; background:#FAF6F0; border:1px solid #EADEC9; padding:0.2rem 0.6rem; border-radius:12px; color:#D97706;"># ${t}</span>`).join('')}
      </div>
      <button class="btn btn-emerald" style="width:100%; justify-content:center; padding:0.6rem;" onclick="openJobApplyModal('${job.title}', '${job.client}')">
        Apply Now with 0% Fee
      </button>
    </div>
  `).join('');
}

function updateCalculatorUI() {
  const input = document.getElementById('calcInput');
  if (!input) return;
  
  const val = input.value || 1000;
  const result = calculateSavings(val);
  
  const tradEl = document.getElementById('calcTraditionalFee');
  const savEl = document.getElementById('calcSavings');
  const netEl = document.getElementById('calcNet');
  
  if (tradEl) tradEl.innerText = '$' + result.traditionalFee.toLocaleString();
  if (savEl) savEl.innerText = '$' + result.savings.toLocaleString();
  if (netEl) netEl.innerText = '$' + result.netEarnings.toLocaleString();
}

function openJobApplyModal(title, client) {
  const modal = document.getElementById('jobApplyModal');
  const targetTitle = document.getElementById('jobApplyTargetTitle');
  if (targetTitle) targetTitle.innerText = `${title} (${client})`;
  if (modal) modal.classList.add('active');
}

function closeJobApplyModal() {
  const modal = document.getElementById('jobApplyModal');
  if (modal) modal.classList.remove('active');
}

function submitJobApplication(event) {
  event.preventDefault();
  const name = document.getElementById('jobApplicantName').value.trim();
  const msg = document.getElementById('jobApplicantMsg').value.trim();
  
  if (!name || !msg) return;
  
  closeJobApplyModal();
  
  if (typeof logContributionAction === 'function') {
    logContributionAction('Applied for 0 Margin Freelance Job', 40);
  } else {
    alert(`Application Sent!\nThank you, ${name}. Your application has been sent with 0% platform cuts.`);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderWorkJobs();
  const input = document.getElementById('calcInput');
  if (input) {
    input.addEventListener('input', updateCalculatorUI);
    updateCalculatorUI();
  }
});
