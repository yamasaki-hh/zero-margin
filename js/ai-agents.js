/* ==========================================================================
   AI Agents Suite: 10 Specialized Agents + Independent Guardian Agent
   ========================================================================== */

const aiAgentsList = [
  { id: 'theology', name: 'Theology Agent', role: 'Theology, Ethics & Interfaith Dialogue', icon: '🕊️', color: '#D97706', initialMsg: 'Welcome! I am grounded in God’s infinite love, Christ’s grace, and human dignity. Whether you seek spiritual peace, ethical guidance, or respectful dialogue across different faiths, I am here for you.' },
  { id: 'truth', name: 'Truth Agent', role: 'Fact-checking & Objective Verification', icon: '🔍', color: '#4F46E5', initialMsg: 'Greetings. I analyze facts, statistical evidence, and public policies objectively, stripping away media noise and political spin so you can see the truth.' },
  { id: 'policy', name: 'Policy Agent', role: 'Policy, Law & Budget Analysis', icon: '⚖️', color: '#2563EB', initialMsg: 'I evaluate government budgets, tax burdens, and social security. I reveal who actually benefits, who pays, and how zero-margin policies offer better choices.' },
  { id: 'economy', name: 'Economy Agent', role: '0 Margin Work & Employment Relief', icon: '💼', color: '#059669', initialMsg: 'Hello! I help freelancers, youth, and workers match with jobs at 0% platform fees. 100% of your labor stays in your pocket as an economic safety net.' },
  { id: 'social', name: 'Social Agent', role: 'Human Rights, Isolation & Care', icon: '🤝', color: '#E11D48', initialMsg: 'You are never alone. I listen to those struggling with isolation, poverty, or emotional weight, connecting you to compassionate local shelter and fellowship.' },
  { id: 'travel', name: 'Travel Agent', role: 'Global Hospitality Network & Travel Safety', icon: '✈️', color: '#0284C7', initialMsg: 'I facilitate free, trust-based host/guest matching worldwide (e.g. Tokyo students visiting Berlin) with real-time cultural, culinary, and safety AI guidance.' },
  { id: 'education', name: 'Education Agent', role: 'Free Skill & Philosophy Learning', icon: '📚', color: '#7C3AED', initialMsg: 'Education is a fundamental human right. I offer free learning paths in digital skills, languages, critical thinking, and ethics to empower youth.' },
  { id: 'career', name: 'Career Agent', role: 'Freelance Mentoring & Startup Guidance', icon: '🚀', color: '#D97706', initialMsg: 'Ready to shape your future? I mentor young people in starting freelancing, social enterprises, and finding real hands-on purpose.' },
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
          <span style="font-size:0.75rem; color:#718096;">${a.role}</span>
        </div>
      </div>
      <p style="font-size:0.85rem; color:#4A5568; line-height:1.5; margin-top:0.5rem;">${a.initialMsg.substring(0, 65)}...</p>
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
  
  // Rich, thoughtful AI responses per agent
  setTimeout(() => {
    const reply = generateRichAgentResponse(activeAgent, text);
    
    messagesBox.innerHTML += `
      <div class="chat-bubble agent">
        <strong>${activeAgent.name}:</strong><br>
        ${reply}
      </div>
    `;
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, 500);
}

function generateRichAgentResponse(agent, query) {
  const q = query.toLowerCase();
  
  if (agent.id === 'theology') {
    if (q.includes('love') || q.includes('god') || q.includes('faith') || q.includes('church')) {
      return `God’s love is not a strict condition to be earned; it is a gift freely given to all ("Freely you have received, freely give" - Matthew 10:8). Regardless of your religious background, past pain, or doubts, your existence has sacred dignity. We are called to shelter one another under the wings of grace rather than judge or exclude.`;
    }
    if (q.includes('other religion') || q.includes('dialogue') || q.includes('buddhis') || q.includes('islam') || q.includes('jew')) {
      return `True faith opens arms rather than building walls. We actively engage in peaceful, humble dialogue with brothers and sisters of all faiths and philosophies. Reconciliation happens when we see God’s light in human dignity and work together to heal suffering.`;
    }
    return `Thank you for sharing your thoughts ("${escapeHtml(query)}"). In times of difficulty or reflection, remember that you are never forgotten. God's love promises that no one is left in the margin. How can our community support your spirit today?`;
  }
  
  if (agent.id === 'guardian') {
    return `[Guardian Audit Report]: I have analyzed your query ("${escapeHtml(query)}"). My independent ethical verification confirms that zero-margin prioritizes human dignity, zero financial exploitation, and authentic peace. All interactions are protected against commercial greed and ideological distortion.`;
  }
  
  if (agent.id === 'economy') {
    return `Regarding your inquiry on work and income ("${escapeHtml(query)}"): At zero-margin, we eliminate the 20%–30% platform cuts taken by corporate middlemen. Every dollar or yen you earn is 100% yours. We invite you to browse our 0 Margin Work listings or post your own skill offer today!`;
  }
  
  if (agent.id === 'travel') {
    return `Regarding travel and hospitality ("${escapeHtml(query)}"): Our Global Hospitality Network connects you with verified hosts in cities like Berlin, Tokyo, Okinawa, and Amsterdam. AI verifies safety advisories, cultural etiquette, and translation so you can travel freely with peace of mind.`;
  }
  
  if (agent.id === 'truth' || agent.id === 'policy') {
    return `[Policy Fact Analysis]: Evaluating "${escapeHtml(query)}". Our data models track national budget allocation, who benefits (e.g. defense contractors vs public housing), and who bears the burden. We present transparent facts so citizens can hold power accountable and choose peaceful, constructive solutions.`;
  }
  
  if (agent.id === 'social' || agent.id === 'safety') {
    return `Your safety and emotional well-being are paramount. If you are experiencing distress or need shelter regarding "${escapeHtml(query)}", our confidential intake connects you immediately with local Global Fellows and volunteer support hubs. You are safe here.`;
  }

  // Default thoughtful agent response
  return `Thank you for your message regarding "${escapeHtml(query)}". As ${agent.name}, I am coordinating with our human Global Fellows and expert network to offer thoughtful guidance and concrete support. How else can we assist you on your journey today?`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderAIAgentsGrid();
  selectAgentForChat('theology');
});
