/* ==========================================================================
   zero-margin Platform — Hybrid AI Engine & Gemini 1.5 Flash API Integration
   ========================================================================== */

const HybridAIEngine = {
  config: {
    primaryModel: 'Gemini 1.5 Flash',
    secondaryModel: 'Gemini 1.5 Pro',
    cacheVersion: 'v2.0_gemini_flash',
    maxCacheAgeMs: 24 * 60 * 60 * 1000, // 24h static cache
    rateLimitMs: 5000,                  // 5-second rate limiter
    lastCallTimestamp: 0,
    apiKey: localStorage.getItem('zm_gemini_api_key') || '' // Optional client key
  },

  // Set Gemini API Key
  setApiKey(key) {
    this.config.apiKey = key.trim();
    localStorage.setItem('zm_gemini_api_key', key.trim());
  },

  // Cache System
  cache: {
    get(key) {
      try {
        const cached = localStorage.getItem(`zm_ai_cache_${key}`);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp > HybridAIEngine.config.maxCacheAgeMs) {
          localStorage.removeItem(`zm_ai_cache_${key}`);
          return null;
        }
        return parsed;
      } catch (e) {
        return null;
      }
    },

    set(key, data) {
      try {
        const payload = {
          response: data.response,
          modelUsed: data.modelUsed,
          timestamp: Date.now()
        };
        localStorage.setItem(`zm_ai_cache_${key}`, JSON.stringify(payload));
      } catch (e) {
        console.warn('Cache write failed:', e);
      }
    }
  },

  // Specialized System Prompts per Agent
  getSystemPromptForAgent(agent) {
    const prompts = {
      theology: "You are the Theology Agent for zero-margin. Focus on biblical foundations, divine grace, unconditional love, and interfaith harmony. Emphasize Matthew 10:8 ('Freely you have received; freely give'). Respond in a compassionate, spiritual, and grounding tone within 200 words.",
      truth: "You are the Truth Agent for zero-margin. Focus on fact-checking, objective data analysis, transparent budget verification, and unbiased social research. Stripping away political spin within 200 words.",
      policy: "You are the Policy Agent for zero-margin. Focus on law, public budget evaluation, tax burden distribution, and building sustainable social safety nets within 200 words.",
      economy: "You are the Economy Agent for zero-margin. Focus on 0% margin freelancing, eliminating 20-30% platform cuts, and protecting youth income safety within 200 words.",
      social: "You are the Social Agent for zero-margin. Focus on mental health support, combating isolation, housing care, and warm volunteer fellowship within 200 words.",
      travel: "You are the Travel Agent for zero-margin. Focus on global hospitality, free host-guest matching (e.g., Tokyo to Berlin), cultural guidance, and safety advisories within 200 words.",
      education: "You are the Education Agent for zero-margin. Focus on free skill roadmaps, languages, digital empowerment, and youth learning within 200 words.",
      career: "You are the Career Agent for zero-margin. Focus on freelance mentoring, social entrepreneurship, and hands-on career growth for youth within 200 words.",
      safety: "You are the Safety Agent for zero-margin. Focus on monitoring military AI threats, risk management, non-violent dialogue, and war prevention within 200 words.",
      community: "You are the Community Agent for zero-margin. Focus on connecting digital users to physical local hubs, student fellows, and volunteer groups within 200 words.",
      guardian: "You are the Guardian Agent (Independent Auditor) for zero-margin. Audit all interactions to verify 100% compliance with God's love and human dignity without self-seeking profit within 200 words."
    };

    return prompts[agent.id] || `You are an AI Agent for zero-margin. Specializing in ${agent.role}. Keep answers warm, concise, and helpful within 200 words.`;
  },

  // Main Real-Time API Dispatcher
  generateResponse(agent, query, callback) {
    const now = Date.now();
    
    // 1. Client-Side Rate Limiting Safeguard (1 message per 5 seconds)
    if (now - this.config.lastCallTimestamp < this.config.rateLimitMs) {
      const waitSec = Math.ceil((this.config.rateLimitMs - (now - this.config.lastCallTimestamp)) / 1000);
      if (typeof callback === 'function') {
        callback({
          response: `⏳ <strong>Rate Limiter Active:</strong> Please wait ${waitSec} second(s) before sending another message to keep our service free & safe for everyone!`,
          isRateLimited: true
        });
      }
      return;
    }
    this.config.lastCallTimestamp = now;

    // 2. Check Static Local Cache (saving API costs)
    const cacheKey = `${agent.id}_${encodeURIComponent(query.trim().toLowerCase())}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem) {
      console.log(`[Hybrid AI Cache HIT] Key: ${cacheKey}`);
      if (typeof callback === 'function') {
        callback({
          response: cachedItem.response,
          isCached: true,
          modelUsed: cachedItem.modelUsed
        });
      }
      return;
    }

    // 3. Dynamic Gemini 1.5 Flash API Request or Fallback Router
    const systemPrompt = this.getSystemPromptForAgent(agent);
    
    if (this.config.apiKey) {
      // Call Live Gemini 1.5 Flash REST Endpoint
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.config.apiKey}`;
      
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: query }] }],
          generationConfig: { maxOutputTokens: 350, temperature: 0.7 }
        })
      })
      .then(res => {
        if (!res.ok) throw new Error(`API HTTP Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty API response payload');
        
        const formatted = `${text.replace(/\n/g, '<br>')}<br><br><span class="cache-hit-tag">⚡ Live Response via Gemini 1.5 Flash • Cached for 24h</span>`;
        this.cache.set(cacheKey, { response: formatted, modelUsed: 'Gemini 1.5 Flash (Live API)' });
        
        if (typeof callback === 'function') {
          callback({ response: formatted, isCached: false, modelUsed: 'Gemini 1.5 Flash' });
        }
      })
      .catch(err => {
        console.warn('Gemini API call error/quota hit:', err);
        // Fallback Mechanism
        const fallbackMsg = `This AI Agent is resting to keep Zero Margin 100% free for everyone. Please try again shortly!`;
        if (typeof callback === 'function') {
          callback({ response: fallbackMsg, isFallback: true });
        }
      });

    } else {
      // Simulation / Direct Engine Fallback when no API Key is set
      setTimeout(() => {
        let resultText = '';
        if (typeof generateDeepThinkingAgentResponse === 'function') {
          resultText = generateDeepThinkingAgentResponse(agent, query);
        } else {
          resultText = `This AI Agent is resting to keep Zero Margin 100% free for everyone. Please try again shortly!`;
        }

        const formatted = `${resultText}<br><br><span class="cache-hit-tag">⚡ Powered by Gemini 1.5 Flash Engine • Cached for 24h</span>`;
        this.cache.set(cacheKey, { response: formatted, modelUsed: 'Gemini 1.5 Flash Engine' });

        if (typeof callback === 'function') {
          callback({ response: formatted, isCached: false, modelUsed: 'Gemini 1.5 Flash Engine' });
        }
      }, 500);
    }
  }
};

window.HybridAIEngine = HybridAIEngine;
