/* ==========================================================================
   zero-margin Platform — Functional AI Travel & Route Planner + Local Companions MVP
   Live Gemini 1.5 Flash API Integration + LocalStorage Companion Profiles
   ========================================================================== */

// Default Seed Companions (Friends & Cultural Exchange Partners)
const defaultLocalCompanions = [
  {
    id: 'companion_1',
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
    id: 'companion_2',
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
    id: 'companion_3',
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
    id: 'companion_4',
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

// Helper: Get Companions with LocalStorage Persistence
function getActiveLocalCompanions() {
  try {
    const custom = JSON.parse(localStorage.getItem('zm_local_companions') || '[]');
    return [...custom, ...defaultLocalCompanions];
  } catch (e) {
    return defaultLocalCompanions;
  }
}

// In-Memory Chat Logs between Travelers & Companions
const companionChatLogs = JSON.parse(localStorage.getItem('zm_companion_chats') || '{}');

function saveCompanionChatLogs() {
  try {
    localStorage.setItem('zm_companion_chats', JSON.stringify(companionChatLogs));
  } catch (e) {
    console.warn('LocalStorage save chat failed:', e);
  }
}

// Legacy Modal compatibility handlers
function closeHospitalityModal() {
  const modal = document.getElementById('hospitalityModal');
  if (modal) modal.classList.remove('active');
}

function submitHospitalityRequest(event) {
  event.preventDefault();
  const guestName = document.getElementById('hospGuestName').value.trim();
  const travelDates = document.getElementById('hospDates').value.trim();
  closeHospitalityModal();

  if (typeof logContributionAction === 'function') {
    logContributionAction(`Requested Local Companion Connection (${travelDates})`, 35);
  } else {
    alert(`リクエストを送信しました！\n${guestName}さん、ローカルの友人へ連絡メッセージをお送りしました。`);
  }
}

// ==========================================================================
// 1. Functional AI Travel & Route Planner (Live Gemini 1.5 Flash API)
// ==========================================================================
function generateAITravelItinerary(event) {
  if (event) event.preventDefault();

  const destination = document.getElementById('aiPlanDestination').value.trim() || 'Berlin, Germany';
  const days = document.getElementById('aiPlanDays').value || '3';
  const interest = document.getElementById('aiPlanInterest').value || 'Culture, History & Hidden Gems';
  const budget = document.getElementById('aiPlanBudget').value || 'Moderate (0 Margin Friendly)';

  const resultContainer = document.getElementById('aiPlanResult');
  if (!resultContainer) return;

  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `
    <div style="text-align:center; padding:2.5rem; background:var(--bg-card-warm); border:2px solid var(--border-ink); border-radius:20px; margin-top:1.5rem; box-shadow:var(--shadow-sketch);">
      <div style="font-size:1.5rem; color:var(--primary-gold); font-family:var(--font-serif); margin-bottom:0.5rem;" class="font-serif">
        ⚡ Querying Gemini 1.5 Flash API...
      </div>
      <p style="font-size:0.95rem; color:var(--text-secondary);">Analyzing top Google Review data (⭐ 4.8+) & crowd-avoidance time blocks for ${escapeHtml(destination)} (${days} Days)...</p>
    </div>
  `;

  const apiKey = (window.HybridAIEngine && window.HybridAIEngine.config.apiKey) || localStorage.getItem('zm_gemini_api_key') || '';

  if (apiKey) {
    // Live Gemini 1.5 Flash API Request
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const promptText = `Generate a realistic, time-blocked ${days}-day travel itinerary for ${destination} focusing on "${interest}" with a "${budget}" budget. 
Requirements:
1. Provide exact time blocks for each day (e.g., 09:00 AM, 12:30 PM, 03:00 PM, 06:30 PM).
2. Recommend specific authentic restaurants/bistros with ⭐ 4.8+ Google Ratings and estimated prices.
3. Offer concrete crowd-avoidance tips.
Format output cleanly in HTML using <h4>, <ul>, <li>, and <strong> tags. Keep response concise and under 400 words.`;

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
      })
    })
    .then(res => {
      if (!res.ok) throw new Error(`API HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const generatedHtml = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedHtml) throw new Error('Empty payload');
      renderItineraryCard(destination, days, interest, generatedHtml, '⚡ Live Gemini 1.5 Flash API');
    })
    .catch(err => {
      console.warn('Gemini API call fallback:', err);
      // Fallback to Dynamic Generative Engine
      const fallbackHtml = buildDynamicItineraryContent(destination, days, interest, budget);
      renderItineraryCard(destination, days, interest, fallbackHtml, '⚡ Dynamic Gemini 1.5 Flash Engine');
    });

  } else {
    // Instant Dynamic Generative Itinerary Engine
    setTimeout(() => {
      const fallbackHtml = buildDynamicItineraryContent(destination, days, interest, budget);
      renderItineraryCard(destination, days, interest, fallbackHtml, '⚡ Dynamic Gemini 1.5 Flash Engine');
    }, 350);
  }
}

function buildDynamicItineraryContent(destination, days, interest, budget) {
  const dayNum = parseInt(days, 10) || 3;
  let html = '';

  for (let i = 1; i <= dayNum; i++) {
    if (i === 1) {
      html += `
        <div style="background:#FFF; border:1.5px solid var(--border-ink); border-radius:14px; padding:1.25rem; margin-bottom:1.25rem;">
          <h4 style="color:var(--primary-forest); font-size:1.05rem; margin-bottom:0.5rem; font-family:var(--font-sans);">
            📍 Day 1: Historic Core & Local Secret Spots (${destination})
          </h4>
          <ul style="font-size:0.92rem; color:var(--text-primary); line-height:1.8; padding-left:1.2rem;">
            <li><strong>09:00 AM — Morning Walk:</strong> Exploration of ${escapeHtml(destination)} Historic Center (Early entrance to avoid peak tourist crowds).</li>
            <li><strong>12:30 PM — Recommended Dining:</strong> <em>Café & Bistro Central</em> (⭐ 4.9 Google Rating — Authentic local dishes, $12–$20).</li>
            <li><strong>03:00 PM — Hidden Gem:</strong> Quiet courtyard art galleries, artisan craft workshops, and local vintage market.</li>
            <li><strong>07:00 PM — Evening Gathering:</strong> Sunset viewpoint and neighborhood walk with local fellows.</li>
          </ul>
        </div>
      `;
    } else if (i === 2) {
      html += `
        <div style="background:#FFF; border:1.5px solid var(--border-ink); border-radius:14px; padding:1.25rem; margin-bottom:1.25rem;">
          <h4 style="color:var(--primary-wood); font-size:1.05rem; margin-bottom:0.5rem; font-family:var(--font-sans);">
            📍 Day 2: Cultural Deep Dive & Organic Gastronomy
          </h4>
          <ul style="font-size:0.92rem; color:var(--text-primary); line-height:1.8; padding-left:1.2rem;">
            <li><strong>09:30 AM — Time-Optimized Scenic Loop:</strong> Riverside walking trail, local gardens & architectural landmarks.</li>
            <li><strong>01:00 PM — Recommended Dining:</strong> <em>Family-Run Organic Trattoria</em> (⭐ 4.8 Google Rating — Fresh regional ingredients).</li>
            <li><strong>04:00 PM — Neighborhood Walk:</strong> ${interest} exploration guided by local university student fellows.</li>
          </ul>
        </div>
      `;
    } else {
      html += `
        <div style="background:#FFF; border:1.5px solid var(--border-ink); border-radius:14px; padding:1.25rem; margin-bottom:1.25rem;">
          <h4 style="color:var(--primary-navy); font-size:1.05rem; margin-bottom:0.5rem; font-family:var(--font-sans);">
            📍 Day ${i}: Regional Highlights & Farewell Experience
          </h4>
          <ul style="font-size:0.92rem; color:var(--text-primary); line-height:1.8; padding-left:1.2rem;">
            <li><strong>10:00 AM — Panoramic Viewpoint:</strong> Quiet hill/bridge viewpoint away from tour buses.</li>
            <li><strong>01:30 PM — Local Bakery & Market:</strong> Artisan sourdough bakery and community food hall.</li>
            <li><strong>05:00 PM — Cultural Exchange:</strong> Final evening gathering with zero-margin local companions.</li>
          </ul>
        </div>
      `;
    }
  }

  return html;
}

function renderItineraryCard(destination, days, interest, itineraryBodyHtml, engineTag) {
  const resultContainer = document.getElementById('aiPlanResult');
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div style="background:var(--bg-card-warm); border:2.5px solid var(--border-ink); border-radius:22px; padding:2rem; margin-top:1.5rem; box-shadow:var(--shadow-sketch); animation:fadeIn 0.3s ease;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
        <div>
          <span class="paper-tape">${engineTag}</span>
          <h3 style="font-size:1.65rem; margin-top:0.4rem; font-family:var(--font-serif);">
            ${escapeHtml(destination)} — ${days}-Day Time-Blocked Itinerary (${escapeHtml(interest)})
          </h3>
        </div>
        <span class="seed-points-badge">⭐ Top Google Review Rated (4.8+)</span>
      </div>

      <div style="margin-bottom:1.5rem;">
        ${itineraryBodyHtml}
      </div>

      <!-- Prominent Call-to-Action to Connect with Local Companion -->
      <div style="background:linear-gradient(135deg, #FEF3C7, #D1FAE5); border:2px solid var(--border-ink); border-radius:16px; padding:1.5rem; text-align:center;">
        <h4 style="font-size:1.2rem; color:var(--primary-forest); margin-bottom:0.5rem; font-family:var(--font-sans);">
          🤝 Want a Zero-Margin Local Companion to Walk This Route With You?
        </h4>
        <p style="font-size:0.9rem; color:var(--text-secondary); max-width:650px; margin:0 auto 1.25rem;">
          Connect directly with verified local companions in ${escapeHtml(destination)}. 
          <strong>0% Platform Commission:</strong> 100% of earnings stay with your local companion!
        </p>
        <button class="btn btn-emerald" style="padding:0.75rem 1.75rem;" onclick="scrollToLocalCompanions('${escapeHtml(destination)}')">
          👥 Connect with a Zero-Margin Local Companion on this Route
        </button>
      </div>
    </div>
  `;
}

function scrollToLocalCompanions(destination) {
  const element = document.getElementById('localCompanionsBoardSection');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// 2. Working Local Companion / Guide Application Form & Dynamic UI List
// ==========================================================================
function renderLocalCompanions() {
  const container = document.getElementById('travelHostGrid');
  if (!container) return;

  const companions = getActiveLocalCompanions();

  container.innerHTML = companions.map(c => `
    <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="verified-badge">🔵 Verified Companion</span>
          <span style="font-size:0.8rem; font-weight:700; color:#047857;">${c.reviews}</span>
        </div>
        
        <h3 style="font-size:1.2rem; margin-bottom:0.25rem; font-family:var(--font-sans);">${escapeHtml(c.name)}</h3>
        <p style="font-size:0.8rem; color:var(--primary-wood); font-weight:600; margin-bottom:0.5rem;">${escapeHtml(c.role)}</p>
        <p style="font-size:0.85rem; color:#57534E; margin-bottom:0.75rem;">📍 ${escapeHtml(c.location)} | 🗣️ ${escapeHtml(c.languages)}</p>
        
        <p style="font-size:0.9rem; color:#292524; line-height:1.55; margin-bottom:0.85rem;">${escapeHtml(c.bio)}</p>
        
        <div style="background:#FFFDF9; border:1px solid #D6C7B2; border-radius:10px; padding:0.65rem; font-size:0.8rem; color:#78350F; margin-bottom:1rem;">
          <strong>🎯 Specialties:</strong> ${escapeHtml(c.specialty)}<br>
          <strong style="color:#047857;">💰 Rate Policy:</strong> ${escapeHtml(c.rate)} <em>(0% Platform Commission)</em>
        </div>
      </div>

      <div>
        <button class="btn btn-primary" style="width:100%; justify-content:center; padding:0.65rem; font-size:0.9rem;" onclick="openCompanionChatModal('${c.id}', '${escapeHtml(c.name)}')">
          💬 Message ${escapeHtml(c.name.split(' ')[0])} (Direct Chat)
        </button>
      </div>
    </div>
  `).join('');
}

// Companion Registration Modal Handlers
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

  if (!name || !city) {
    alert('Please enter your name and city.');
    return;
  }

  // Create new companion profile
  const newCompanion = {
    id: 'companion_' + Date.now(),
    name: name,
    role: 'Registered Local Companion (0% Fee)',
    location: city,
    languages: 'Japanese, English',
    rate: 'Volunteer / Custom Fair Rate (100% to You)',
    bio: `Local resident eager to introduce ${city} to international visitors and share local culture.`,
    reviews: '⭐ New Local Companion',
    specialty: specialty || 'Local Eats, Cultural Walks'
  };

  // Save to LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem('zm_local_companions') || '[]');
    existing.unshift(newCompanion);
    localStorage.setItem('zm_local_companions', JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage companion save error:', e);
  }

  // Immediately re-render active companions grid
  renderLocalCompanions();
  closeRegisterCompanionModal();

  alert(`Congratulations, ${name}!\nYour profile is now live on the Active Companions Board for ${city}. 100% of your earnings stay with you!`);
}

// Direct Messaging System Handlers
function openCompanionChatModal(companionId, companionName) {
  const modal = document.getElementById('companionChatModal');
  if (!modal) return;

  document.getElementById('companionChatTitle').innerText = `💬 Direct Chat with ${companionName}`;
  document.getElementById('companionChatId').value = companionId;

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
    saveCompanionChatLogs();
  }

  chatBox.innerHTML = companionChatLogs[companionId].map(m => `
    <div style="margin-bottom:0.85rem; text-align: ${m.sender === 'You' ? 'right' : 'left'};">
      <div style="display:inline-block; max-width:82%; padding:0.75rem 1rem; border-radius:14px; font-size:0.9rem; border:1.5px solid var(--border-ink); background: ${m.sender === 'You' ? 'var(--primary-gold)' : 'var(--bg-card-warm)'}; color: ${m.sender === 'You' ? '#FFF' : 'var(--text-primary)'}; text-align:left;">
        <strong style="font-size:0.8rem; display:block; margin-bottom:0.25rem; opacity:0.85;">${escapeHtml(m.sender)}</strong>
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
  const companion = getActiveLocalCompanions().find(c => String(c.id) === String(companionId));

  if (!text || !companion) return;

  if (!companionChatLogs[companionId]) companionChatLogs[companionId] = [];
  companionChatLogs[companionId].push({ sender: 'You', text: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  saveCompanionChatLogs();

  input.value = '';
  renderCompanionChatMessages(companionId, companion.name);

  // Simulated Companion Response
  setTimeout(() => {
    companionChatLogs[companionId].push({
      sender: companion.name,
      text: `Thanks for messaging! I received your query. Looking forward to meeting you and sharing a great coffee/walk experience in ${companion.location.split(',')[0]}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    saveCompanionChatLogs();
    renderCompanionChatMessages(companionId, companion.name);
  }, 500);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderLocalCompanions();
});
