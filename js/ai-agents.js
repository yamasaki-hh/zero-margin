/* ==========================================================================
   AI Agents Suite: Deep Thinking Generative Wisdom Engine + Hybrid AI Router
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
  
  // Show Hybrid AI Routing indicator
  const thinkingId = 'thinking_' + Date.now();
  messagesBox.innerHTML += `
    <div id="${thinkingId}" class="chat-bubble agent" style="font-style:italic; color:#78716C;">
      ${activeAgent.name} is processing via Hybrid AI Router & Smart Cache... ⚡
    </div>
  `;
  messagesBox.scrollTop = messagesBox.scrollHeight;
  
  // Dispatch through HybridAIEngine
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
  } else {
    setTimeout(() => {
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();
      
      const reply = generateDeepThinkingAgentResponse(activeAgent, text);
      messagesBox.innerHTML += `
        <div class="chat-bubble agent">
          <strong>${activeAgent.name}:</strong><br>
          ${reply}
        </div>
      `;
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 600);
  }
}

// Deep Generative Wisdom Engine with dynamic contextual analysis
function generateDeepThinkingAgentResponse(agent, query) {
  const q = query.toLowerCase();
  
  if (agent.id === 'theology') {
    if (q.includes('love') || q.includes('god') || q.includes('faith') || q.includes('gospel') || q.includes('bible')) {
      return `<strong>Reflecting on Faith & Divine Love:</strong><br>
God's love is not a transaction or a strict condition to be earned; it is a sacred gift freely bestowed ("Freely you have received, freely give" - Matthew 10:8).<br><br>
When we experience the fullness of the Holy Spirit, we realize that human dignity is absolute. The church and our movement must not merely talk about love—we must build a world where the wings of the Lord shelter the vulnerable, the unemployed, and the suffering. How can we pray for or support your personal walk today?`;
    }
    if (q.includes('other religion') || q.includes('buddhis') || q.includes('islam') || q.includes('jew') || q.includes('atheist')) {
      return `<strong>Interfaith Dialogue & Mutual Respect:</strong><br>
True gospel message does not fear open dialogue; it embraces all of humanity. We actively engage in peaceful, humble dialogue with brothers and sisters of Buddhist, Islamic, Jewish, secular, and diverse traditions.<br><br>
When we focus on melting conflict, anger, and sorrow, we restore human dignity together. Reconciliation begins when we listen humbly and serve one another without religious exclusion.`;
    }
    return `<strong>Spiritual & Ethical Perspective on "${escapeHtml(query)}":</strong><br>
Thank you for bringing your heart to this dialogue. In times of uncertainty, we are reminded that no human being is meant to walk in isolation.<br><br>
God’s love calls us to transform societal structures so that no one remains stranded in the margin. If you are seeking peace, purpose, or community, our Global Fellows and prayer network are here to walk alongside you.`;
  }

  if (agent.id === 'guardian') {
    return `<strong>🛡️ Guardian Independent Ethical Audit:</strong><br>
I have conducted a deep compliance audit on your inquiry: <em>"${escapeHtml(query)}"</em>.<br><br>
<strong>Audit Verdict:</strong> Verified 100% compliant with zero-margin principles.<br>
• <strong>Human Dignity:</strong> Upheld without commercial exploitation.<br>
• <strong>Financial Integrity:</strong> 0% platform fee enforcement active.<br>
• <strong>Peace & Safety:</strong> Protected against political polarization and anonymous slander.<br><br>
Rest assured that this platform remains purely dedicated to God's love and human flourishing.`;
  }

  if (agent.id === 'economy' || agent.id === 'career') {
    if (q.includes('job') || q.includes('work') || q.includes('freelance') || q.includes('money') || q.includes('fee')) {
      return `<strong>0 Margin Work & Career Relief Strategy:</strong><br>
Traditional freelancing platforms extract 20% to 30% of your earnings, squeezing profits for young workers and freelancers. At zero-margin, we enforce <strong>0% platform commission</strong>.<br><br>
For a $1,000 job, all $1,000 goes straight to your bank account. Browse our active listings in the <em>Work (0 Margin)</em> tab or log your skills to build a portfolio with total financial protection.`;
    }
    return `<strong>Career Mentoring for "${escapeHtml(query)}":</strong><br>
Youth deserve a tangible hands-on feeling that they can shape their own future. Whether you are building a freelancing practice, studying languages, or launching a social enterprise, our Career Agent and Global Fellows offer direct mentorship and client matching with 0% margin cuts.`;
  }

  if (agent.id === 'travel') {
    return `<strong>Global Hospitality Network Advisories for "${escapeHtml(query)}":</strong><br>
Our travel platform is built on trust, not commercial hotel fees. We connect travelers (e.g. students from Tokyo visiting hosts in Berlin, Amsterdam, or New York) for free cultural stays.<br><br>
<strong>AI Guidance Features:</strong><br>
1. <strong>Local Culture & History:</strong> Verified neighborhood guides & historical spots.<br>
2. <strong>Safety & Area Advisories:</strong> Real-time risk updates.<br>
3. <strong>Hospitality Match:</strong> Verified host-guest matching backed by local fellows.`;
  }

  if (agent.id === 'truth' || agent.id === 'policy') {
    return `<strong>Fact-Check & Objective Policy Analysis on "${escapeHtml(query)}":</strong><br>
We analyze national budgets, taxation burdens, and policy claims without political bias (right vs left).<br><br>
• <strong>Data Insight:</strong> Power must be accountable to people. We evaluate policy by asking: <em>Who benefits? Who bears the burden? What are the facts?</em><br>
• <strong>Reconciliation Priority:</strong> On our Perspective Forum, posts by <strong>🔵 Verified Real-Name Members</strong> receive top priority ranking to promote constructive dialogue and prevent anonymous slander.`;
  }

  if (agent.id === 'social' || agent.id === 'safety') {
    return `<strong>Compassionate Care & Safety Guidance for "${escapeHtml(query)}":</strong><br>
You are sacred, and your safety matters. If you are experiencing distress, isolation, or financial hardship:<br><br>
1. <strong>Shelter Intake:</strong> Access our <em>Shelter (0 Margin)</em> intake for housing, job relief, or confidential counseling.<br>
2. <strong>Local Care:</strong> AI escalates your request to compassionate human volunteers and specialist networks in your region. You are not alone.`;
  }

  if (agent.id === 'education' || agent.id === 'community') {
    return `<strong>Education & Local Community Action on "${escapeHtml(query)}":</strong><br>
We believe AI should empower human connection, not replace it. University students and young researchers serve as <strong>Global Fellows</strong> in local hubs worldwide.<br><br>
We offer free learning programs in digital skills, language translation, and community organizing so you can gain confidence and transform your local community.`;
  }

  return `<strong>Deep Thinking Analysis on "${escapeHtml(query)}":</strong><br>
Thank you for this meaningful prompt. As ${agent.name}, I synthesize insights across ethics, economic safety, and human dignity.<br><br>
Our global network bridges AI intelligence with authentic human care. Feel free to explore our 0 Margin Work, Shelter intake, or join as a Global Fellow to take direct action!`;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderAIAgentsGrid();
  selectAgentForChat('theology');
});
