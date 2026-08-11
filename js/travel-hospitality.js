/* ==========================================================================
   Travel: Global Hospitality Network
   ========================================================================== */

const sampleTravelHosts = [
  {
    id: 1,
    host: 'Lukas M. (Berlin / Student Fellow)',
    location: 'Berlin, Germany (Kreuzberg)',
    capacity: '1–2 Guests (Free Stay)',
    language: 'German, English, Learning Japanese',
    desc: 'Welcoming traveling students & youth from Tokyo, Seoul, or worldwide. Happy to show you local museum island, historical sights, and food spots.',
    aiGuideSupport: 'AI assists with cultural etiquette, safe area maps, historical facts & live translation'
  },
  {
    id: 2,
    host: 'Kenji & Yuka (Okinawa / Guide Association)',
    location: 'Naha & Nago, Okinawa, Japan',
    capacity: 'Up to 2 Guests (Cultural Stay)',
    language: 'Japanese, English, Fluent Korean',
    desc: 'Experience Okinawa sea, food, and history. Guided by certified interpreter association members eager to foster global youth exchange.',
    aiGuideSupport: 'AI assists with local bus navigation, authentic eateries, and cultural history'
  },
  {
    id: 3,
    host: 'Hannah S. (Amsterdam / NGO Fellow)',
    location: 'Amsterdam, Netherlands',
    capacity: '1 Guest (Solo traveler / Researcher)',
    language: 'Dutch, English, French',
    desc: 'Welcoming youth eager to study environmental policy, art, and diversity. Clean, safe, homey environment for peaceful shelter.',
    aiGuideSupport: 'AI helps with museum bookings, eco-tours, and local travel advisories'
  }
];

function renderTravelHosts() {
  const container = document.getElementById('travelHostGrid');
  if (!container) return;
  
  container.innerHTML = sampleTravelHosts.map(h => `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
        <span class="agent-badge" style="background:#FFE4E6; color:#E11D48;">🏡 Host & Guide</span>
        <span style="font-size:0.8rem; font-weight:700; color:#059669;">Free Hospitality</span>
      </div>
      <h3 style="font-size:1.15rem; margin-bottom:0.4rem; font-family:var(--font-sans);">${h.host}</h3>
      <p style="font-size:0.85rem; color:#4A5568; margin-bottom:0.75rem;">📍 ${h.location} | 🗣️ ${h.language}</p>
      <p style="font-size:0.9rem; color:#2D3748; margin-bottom:1rem;">${h.desc}</p>
      <div style="background:#FFFDF9; border:1px dashed #EADEC9; border-radius:8px; padding:0.75rem; font-size:0.8rem; color:#D97706; margin-bottom:1.25rem;">
        <strong>🤖 AI Guide Support:</strong> ${h.aiGuideSupport}
      </div>
      <button class="btn btn-primary" style="width:100%; justify-content:center; padding:0.6rem;" onclick="requestHospitalityStay('${h.host}')">
        Request Hospitality Stay
      </button>
    </div>
  `).join('');
}

function requestHospitalityStay(host) {
  alert(`Hospitality request sent to "${host}".\nzero-margin Travel Agent verifies safety checks for both parties to ensure a peaceful matching experience.`);
}

window.addEventListener('DOMContentLoaded', () => {
  renderTravelHosts();
});
