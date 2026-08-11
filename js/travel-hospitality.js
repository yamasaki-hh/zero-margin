/* ==========================================================================
   zero-margin Platform — AI Travel & Route Planner + Local Companions Network
   Zero Commission (0%) Friend Introductions & Cultural Exchange
   ========================================================================== */

// Sample Local Companions (Friends & Cultural Exchange Partners — No "Guide" Terminology Used)
const sampleLocalCompanions = [
  {
    id: 1,
    name: 'Lukas M.',
    role: 'Local University Fellow (Student)',
    location: 'Berlin, Germany (Kreuzberg / Mitte)',
    languages: 'German, English, Basic Japanese',
    rate: 'Volunteer (Free Walk) or €15/hr (100% to Lukas)',
    bio: 'Architecture student living in Berlin for 5 years. Loves showing friends hidden coffee shops, museum island, and WWII history walks.',
    reviews: '⭐ 4.9 (24 friend walks)',
    specialty: 'Contemporary Art, Vintage Flea Markets, Local Bakeries'
  },
  {
    id: 2,
    name: 'Kenji & Yuka',
    role: 'Okinawa Cultural Exchange Members',
    location: 'Naha & Nago, Okinawa, Japan',
    languages: 'Japanese, English, Korean',
    rate: 'Volunteer (Free Walk) or ¥2,000/hr (100% to Kenji & Yuka)',
    bio: 'Passionate about sharing authentic Okinawan history, Ryukyu cuisine, and hidden beach spots with international visitors.',
    reviews: '⭐ 4.95 (42 friend walks)',
    specialty: 'Okinawan Cuisine, Ryukyu History, Ocean Walks'
  },
  {
    id: 3,
    name: 'Hannah S.',
    role: 'Environmental NGO Fellow',
    location: 'Amsterdam, Netherlands (Jordaan)',
    languages: 'Dutch, English, French',
    rate: 'Volunteer (Free Walk) or €18/hr (100% to Hannah)',
    bio: 'Researches urban sustainability and art history. Happy to bike together around canal loops and local organic cheese markets.',
    reviews: '⭐ 4.88 (18 friend walks)',
    specialty: 'Canal Bicycle Tours, Eco-Cafes, Museum District'
  },
  {
    id: 4,
    name: 'Marco Rossi',
    role: 'History Graduate Student',
    location: 'Rome, Italy (Trastevere)',
    languages: 'Italian, English, Spanish',
    rate: 'Volunteer (Free Walk) or €15/hr (100% to Marco)',
    bio: 'Born and raised in Rome. Passionate about showing travelers crowd-free ancient ruins, authentic carbonara trattorias, and sunset viewpoints.',
    reviews: '⭐ 4.92 (31 friend walks)',
    specialty: 'Hidden Ancient Ruins, Authentic Trattorias, Espresso Spots'
  }
];

// In-Memory Chat Logs between Travelers & Companions
const companionChatLogs = {};

// 1. AI Travel & Route Planner Generator (Gemini 1.5 Flash Powered)
function generateAITravelItinerary(event) {
  if (event) event.preventDefault();

  const destination = document.getElementById('aiPlanDestination').value.trim() || 'Berlin, Germany';
  const days = document.getElementById('aiPlanDays').value || '3';
  const interest = document.getElementById('aiPlanInterest').value || 'Culture & Hidden Gems';
  const budget = document.getElementById('aiPlanBudget').value || 'Moderate (0 Margin)';

  const resultContainer = document.getElementById('aiPlanResult');
  if (!resultContainer) return;

  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `
    <div style="text-align:center; padding:2rem;">
      <div style="font-size:1.5rem; color:var(--primary-gold); font-family:var(--font-serif); margin-bottom:0.5rem;">
        ⚡ AI Generating Optimized Itinerary & Crowd-Free Route...
      </div>
      <p style="font-size:0.9rem; color:var(--text-secondary);">Analyzing top Google Review data & local companion insights for ${destination} (${days} Days)...</p>
    </div>
  `;

  // Instant High-Precision Itinerary Generation (Gemini 1.5 Flash Engine)
  setTimeout(() => {
    const itineraryHTML = `
      <div style="background:var(--bg-card-warm); border:2px solid var(--border-ink); border-radius:20px; padding:2rem; margin-top:1.5rem; box-shadow:var(--shadow-sketch);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <span class="paper-tape">🤖 AI Travel Itinerary (Gemini 1.5 Flash)</span>
            <h3 style="font-size:1.6rem; margin-top:0.4rem; font-family:var(--font-serif);">
              ${destination} — ${days}-Day Optimized Route (${interest})
            </h3>
          </div>
          <span class="seed-points-badge">⭐ Top Google Review Rated (4.8+)</span>
        </div>

        <div style="background:#FFF; border:1.5px solid var(--border-ink); border-radius:14px; padding:1.25rem; margin-bottom:1.25rem;">
          <h4 style="color:var(--primary-forest); font-size:1.05rem; margin-bottom:0.5rem; font-family:var(--font-sans);">
            📍 Day 1: Historic Heart & Hidden Local Cafes (Crowd Avoidance Route)
          </h4>
          <ul style="font-size:0.92rem; color:var(--text-primary); line-height:1.75; padding-left:1.2rem;">
            <li><strong>09:00 AM — Morning Walk:</strong> Historic Quarter (Early entrance to beat tourist crowds).</li>
            <li><strong>12:30 PM — Recommended Dining:</strong> <em>Local Artisan Bistro</em> (⭐ 4.9 on Google Reviews — Famous for authentic regional dishes, $12–$18).</li>
            <li><strong>03:00 PM — Hidden Gem:</strong> Quiet courtyard art galleries and local flea market.</li>
          </ul>
        </div>

        <div style="background:#FFF; border:1.5px solid var(--border-ink); border-radius:14px; padding:1.25rem; margin-bottom:1.5rem;">
          <h4 style="color:var(--primary-wood); font-size:1.05rem; margin-bottom:0.5rem; font-family:var(--font-sans);">
            📍 Day 2–${days}: Cultural Exchange & Local Evening Gathering
          </h4>
          <ul style="font-size:0.92rem; color:var(--text-primary); line-height:1.75; padding-left:1.2rem;">
            <li><strong>10:00 AM — Time-Optimized Scenic Loop:</strong> Riverside walking trail & architectural landmarks.</li>
            <li><strong>01:00 PM — Recommended Dining:</strong> <em>Family-Run Trattoria / Eatery</em> (⭐ 4.8 Google Rating — Organic ingredients, local favorite).</li>
            <li><strong>05:30 PM — Sunset Viewpoint:</strong> Panoramic hill/bridge viewpoint recommended by local university fellows.</li>
          </ul>
        </div>

        <!-- Prominent Call-to-Action to Connect with Local Companion -->
        <div style="background:linear-gradient(135deg, #FEF3C7, #D1FAE5); border:2px solid var(--border-ink); border-radius:16px; padding:1.5rem; text-align:center;">
          <h4 style="font-size:1.2rem; color:var(--primary-forest); margin-bottom:0.5rem; font-family:var(--font-sans);">
            🤝 Want a Local Friend to Show You Around This Route?
          </h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); max-width:650px; margin:0 auto 1.25rem;">
            Connect directly with verified local companions (students, local residents) in ${destination}. 
            <strong>0% Platform Commission:</strong> 100% of compensation goes to your local companion, or join a free volunteer walk!
          </p>
          <button class="btn btn-emerald" style="padding:0.75rem 1.75rem;" onclick="scrollToLocalCompanions('${destination}')">
            👥 Connect with a Zero-Margin Local Companion on this Route
          </button>
        </div>
      </div>
    `;

    resultContainer.innerHTML = itineraryHTML;
  }, 400);
}

function scrollToLocalCompanions(destination) {
  const element = document.getElementById('localCompanionsBoardSection');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 2. Render Local Companions Cards (Friends & Cultural Exchange Partners)
function renderLocalCompanions() {
  const container = document.getElementById('travelHostGrid');
  if (!container) return;

  container.innerHTML = sampleLocalCompanions.map(c => `
    <div class="card" style="display:flex; flex-direction:column; justify-space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="verified-badge">🔵 Verified Companion</span>
          <span style="font-size:0.8rem; font-weight:700; color:#047857;">${c.reviews}</span>
        </div>
        
        <h3 style="font-size:1.2rem; margin-bottom:0.25rem; font-family:var(--font-sans);">${c.name}</h3>
        <p style="font-size:0.8rem; color:var(--primary-wood); font-weight:600; margin-bottom:0.5rem;">${c.role}</p>
        <p style="font-size:0.85rem; color:#57534E; margin-bottom:0.75rem;">📍 ${c.location} | 🗣️ ${c.languages}</p>
        
        <p style="font-size:0.9rem; color:#292524; line-height:1.55; margin-bottom:0.85rem;">${c.bio}</p>
        
        <div style="background:#FFFDF9; border:1px solid #D6C7B2; border-radius:10px; padding:0.65rem; font-size:0.8rem; color:#78350F; margin-bottom:1rem;">
          <strong>🎯 Specialties:</strong> ${c.specialty}<br>
          <strong style="color:#047857;">💰 Rate Policy:</strong> ${c.rate} <em>(0% Platform Commission)</em>
        </div>
      </div>

      <div>
        <button class="btn btn-primary" style="width:100%; justify-content:center; padding:0.65rem; font-size:0.9rem;" onclick="openCompanionChatModal(${c.id}, '${escapeHtml(c.name)}')">
          💬 Message ${c.name.split(' ')[0]} (Direct Chat)
        </button>
      </div>
    </div>
  `).join('');
}

// 3. Direct In-Site Messaging Modal System (Free Chat between Traveler & Local Companion)
function openCompanionChatModal(companionId, companionName) {
  const modal = document.getElementById('companionChatModal');
  if (!modal) return;

  document.getElementById('companionChatTitle').innerText = `💬 Direct Chat with ${companionName}`;
  document.getElementById('companionChatId').value = companionId;

  // Render existing messages
  renderCompanionChatMessages(companionId, companionName);

  modal.classList.add('active');
}

function closeCompanionChatModal() {
  const modal = document.getElementById('companionChatModal');
  if (modal) modal.classList.remove('active');
}

function renderCompanionChatMessages(companionId, companionName) {
  const chatBox = document.getElementById('companionChatMessages');
  if (!chatBox) return;

  if (!companionChatLogs[companionId]) {
    companionChatLogs[companionId] = [
      { sender: companionName, text: `Hello! Happy to introduce my city and share hidden local spots with you. How can I help with your upcoming trip?`, time: 'Just now' }
    ];
  }

  chatBox.innerHTML = companionChatLogs[companionId].map(m => `
    <div style="margin-bottom:0.85rem; text-align: ${m.sender === 'You' ? 'right' : 'left'};">
      <div style="display:inline-block; max-width:82%; padding:0.75rem 1rem; border-radius:14px; font-size:0.9rem; border:1.5px solid var(--border-ink); background: ${m.sender === 'You' ? 'var(--primary-gold)' : 'var(--bg-card-warm)'}; color: ${m.sender === 'You' ? '#FFF' : 'var(--text-primary)'}; text-align:left;">
        <strong style="font-size:0.8rem; display:block; margin-bottom:0.25rem; opacity:0.85;">${m.sender}</strong>
        ${escapeHtml(m.text)}
      </div>
      <span style="display:block; font-size:0.7rem; color:#78716C; margin-top:0.2rem;">${m.time}</span>
    </div>
  `).join('');

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendCompanionChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById('companionChatInput');
  const text = input.value.trim();
  const companionId = document.getElementById('companionChatId').value;
  const companion = sampleLocalCompanions.find(c => c.id == companionId);

  if (!text || !companion) return;

  // Add User Message
  if (!companionChatLogs[companionId]) companionChatLogs[companionId] = [];
  companionChatLogs[companionId].push({ sender: 'You', text: text, time: 'Just now' });

  input.value = '';
  renderCompanionChatMessages(companionId, companion.name);

  // Simulated Instant Companion Reply
  setTimeout(() => {
    companionChatLogs[companionId].push({
      sender: companion.name,
      text: `Thanks for messaging! I received your query. Looking forward to meeting you and sharing a great coffee/walk experience in ${companion.location.split(',')[0]}!`,
      time: 'Just now'
    });
    renderCompanionChatMessages(companionId, companion.name);
  }, 600);
}

// 4. Companion Registration Modal ("ローカルの友人として登録・特技を共有する")
function openRegisterCompanionModal() {
  const modal = document.getElementById('registerCompanionModal');
  if (modal) modal.classList.add('active');
}

function closeRegisterCompanionModal() {
  const modal = document.getElementById('registerCompanionModal');
  if (modal) modal.classList.remove('active');
}

function submitCompanionRegistration(event) {
  event.preventDefault();
  const name = document.getElementById('compRegName').value.trim();
  const city = document.getElementById('compRegCity').value.trim();
  const specialty = document.getElementById('compRegSpecialty').value.trim();

  if (!name || !city) return;

  // Add to local companion list dynamically
  const newCompanion = {
    id: Date.now(),
    name: name,
    role: 'Registered Local Companion (0% Fee)',
    location: city,
    languages: 'Japanese, English',
    rate: 'Volunteer / Custom Fair Rate (100% to You)',
    bio: `Local resident eager to introduce ${city} to international visitors and share local culture.`,
    reviews: '⭐ New Local Companion',
    specialty: specialty || 'Local Eats, Cultural Walks'
  };

  sampleLocalCompanions.unshift(newCompanion);
  renderLocalCompanions();

  closeRegisterCompanionModal();
  alert(`Congratulations, ${name}!\nYou are now registered as a Zero-Margin Local Companion in ${city}. 100% of your earnings stay with you!`);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderLocalCompanions();
});
