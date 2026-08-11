/* ==========================================================================
   AI Agents Suite: Dynamic Multilingual Real-Time AI Intelligence
   ========================================================================== */

const aiAgentsList = [
  { id: 'theology', name: 'Theology Agent', role: 'Theology, Grace & Interfaith Harmony', icon: '🕊️', color: '#D97706', initialMsg: 'Welcome! I am grounded in God’s infinite love, Christ’s grace, and human dignity ("Freely you have received; freely give" - Matthew 10:8). Whether you seek spiritual peace or respectful dialogue, I am here for you.' },
  { id: 'truth', name: 'Truth Agent', role: 'Fact-checking & Objective Verification', icon: '🔍', color: '#4F46E5', initialMsg: 'Greetings. I analyze facts, statistical evidence, and public policies objectively, stripping away media noise and political spin so you can see the truth.' },
  { id: 'policy', name: 'Policy Agent', role: 'Policy, Law & Social Safety Nets', icon: '⚖️', color: '#2563EB', initialMsg: 'I evaluate government budgets, tax burdens, and social security. I reveal who actually benefits, who pays, and how zero-margin policies offer better choices.' },
  { id: 'economy', name: 'Economy Agent', role: '0% Margin Work & Employment Relief', icon: '💼', color: '#059669', initialMsg: 'Hello! I help freelancers, youth, and workers match with jobs at 0% platform fees. 100% of your labor stays in your pocket as an economic safety net.' },
  { id: 'social', name: 'Social Agent', role: 'Human Rights, Isolation & Care', icon: '🤝', color: '#E11D48', initialMsg: 'You are never alone. I listen to those struggling with isolation, poverty, or emotional weight, connecting you to compassionate local shelter and fellowship.' },
  { id: 'travel', name: 'Travel Agent', role: 'Global Hospitality & Travel Safety', icon: '✈️', color: '#0284C7', initialMsg: 'I facilitate free, trust-based host/guest matching worldwide (e.g. Tokyo students visiting Berlin) with real-time cultural, culinary, and safety guidance.' },
  { id: 'education', name: 'Education Agent', role: 'Free Skill & Philosophy Learning', icon: '📚', color: '#7C3AED', initialMsg: 'Education is a fundamental human right. I offer free learning paths in digital skills, languages, critical thinking, and ethics to empower youth.' },
  { id: 'career', name: 'Career Agent', role: 'Freelance Mentoring & Entrepreneurship', icon: '🚀', color: '#D97706', initialMsg: 'Ready to shape your future? I mentor young people in starting freelancing, social enterprises, and finding real hands-on purpose.' },
  { id: 'safety', name: 'Safety Agent', role: 'Risk Management & Peace Monitoring', icon: '🛡️', color: '#DC2626', initialMsg: 'I monitor military AI threats, geopolitical conflict risks, and personal safety advisories to protect vulnerable lives across the globe.' },
  { id: 'community', name: 'Community Agent', role: 'Local Hubs & Human Connection', icon: '🌱', color: '#16A34A', initialMsg: 'Connecting digital intelligence with physical reality! I link you with local Global Fellows, university chapters, and volunteer support hubs near you.' },
  { id: 'guardian', name: 'Guardian Agent (Independent Auditor)', role: 'Auditing Human Dignity & Happiness', icon: '🛡️✨', color: '#7C3AED', initialMsg: 'I am the independent ethical auditor of zero-margin. My sole duty is to verify that all AI agents and human hubs uphold God’s love and human dignity without self-seeking profit.' }
];

let activeAgent = aiAgentsList[0];

function renderAIAgentsGrid() {
  const container = document.getElementById('aiAgentsGrid');
  if (!container) return;
  
  container.innerHTML = aiAgentsList.map(a => `
    <div class="card agent-card" style="border-left-color:${a.color}; cursor:pointer;" onclick="selectAgentForChat('${a.id}')">
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
        <span style="font-size:1.75rem;">${a.icon}</span>
        <div>
          <h4 style="font-size:1.05rem; font-family:var(--font-sans); margin:0;">${a.name}</h4>
          <span style="font-size:0.75rem; color:#78716C;">${a.role}</span>
        </div>
      </div>
      <p style="font-size:0.85rem; color:#57534E; line-height:1.5; margin-top:0.5rem;">${a.initialMsg.substring(0, 65)}...</p>
      <div style="margin-top:0.75rem; text-align:right;">
        <span style="font-size:0.85rem; font-weight:700; color:${a.color};">Consult Agent →</span>
      </div>
    </div>
  `).join('');
}

function selectAgentForChat(agentId) {
  const agent = aiAgentsList.find(a => a.id === agentId);
  if (!agent) return;
  
  activeAgent = agent;
  document.getElementById('currentAgentName').innerText = `${agent.icon} ${agent.name}`;
  document.getElementById('currentAgentRole').innerText = agent.role;
  
  const messagesBox = document.getElementById('chatMessages');
  messagesBox.innerHTML = `
    <div class="chat-bubble agent">
      <strong>${agent.name}:</strong><br>
      ${agent.initialMsg}
    </div>
  `;
  
  const chatSection = document.getElementById('chatSection');
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  const messagesBox = document.getElementById('chatMessages');
  
  messagesBox.innerHTML += `
    <div class="chat-bubble user">
      ${escapeHtml(text)}
    </div>
  `;
  
  input.value = '';
  messagesBox.scrollTop = messagesBox.scrollHeight;
  
  // Thinking Indicator
  const thinkingId = 'thinking_' + Date.now();
  messagesBox.innerHTML += `
    <div id="${thinkingId}" class="chat-bubble agent" style="font-style:italic; color:#78716C;">
      ${activeAgent.name} is contemplating your prompt deeply... ⚡
    </div>
  `;
  messagesBox.scrollTop = messagesBox.scrollHeight;
  
  // Dispatch via Multilingual HybridAIEngine
  if (window.HybridAIEngine) {
    window.HybridAIEngine.generateResponse(activeAgent, text, (res) => {
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();
      
      messagesBox.innerHTML += `
        <div class="chat-bubble agent">
          <strong>${activeAgent.name}:</strong><br>
          ${res.response}
        </div>
      `;
      messagesBox.scrollTop = messagesBox.scrollHeight;
    });
  }
}

function configureGeminiKey() {
  const key = prompt('Optional: Enter your Gemini 1.5 Flash API Key to enable live Gemini API calls:\n(Leave empty for built-in Universal Multilingual Engine)', window.HybridAIEngine ? window.HybridAIEngine.config.apiKey : '');
  if (key !== null && window.HybridAIEngine) {
    window.HybridAIEngine.setApiKey(key);
    alert(key.trim() ? 'Gemini 1.5 Flash API Key saved! Live API responses enabled.' : 'Switched to Universal Multilingual Engine.');
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderAIAgentsGrid();
  selectAgentForChat('theology');
});
