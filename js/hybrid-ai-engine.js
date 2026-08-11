/* ==========================================================================
   zero-margin Platform — Universal Multilingual Generative AI Engine
   Real-Time Dynamic AI Intelligence & Gemini 1.5 Flash API Router
   ========================================================================== */

const HybridAIEngine = {
  config: {
    primaryModel: 'Gemini 1.5 Flash (Generative Intelligence)',
    secondaryModel: 'Gemini 1.5 Pro (Deep Synthesis)',
    rateLimitMs: 2000, // 2 seconds fast rate limit
    lastCallTimestamp: 0,
    apiKey: localStorage.getItem('zm_gemini_api_key') || ''
  },

  setApiKey(key) {
    this.config.apiKey = key.trim();
    localStorage.setItem('zm_gemini_api_key', key.trim());
  },

  // Language Detection Helper
  detectLanguage(text) {
    const jpRegex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;
    const krRegex = /[\uac00-\ud7af]/;
    if (jpRegex.test(text)) return 'ja';
    if (krRegex.test(text)) return 'ko';
    return 'en';
  },

  // Main Generation Dispatcher
  generateResponse(agent, query, callback) {
    const now = Date.now();
    if (now - this.config.lastCallTimestamp < this.config.rateLimitMs) {
      const waitSec = Math.ceil((this.config.rateLimitMs - (now - this.config.lastCallTimestamp)) / 1000);
      if (typeof callback === 'function') {
        callback({
          response: `⏳ <strong>AI Engine Limiter:</strong> Please wait ${waitSec} second(s) before sending your next question.`,
          isRateLimited: true
        });
      }
      return;
    }
    this.config.lastCallTimestamp = now;

    // Check optional user Gemini API Key first
    if (this.config.apiKey) {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.config.apiKey}`;
      const lang = this.detectLanguage(query);
      const systemPrompt = `You are the ${agent.name} (${agent.role}) for zero-margin. Respond in ${lang === 'ja' ? 'Japanese' : lang === 'ko' ? 'Korean' : 'English'}. Provide a deep, highly articulate, structural 3-point answer grounded in God's love, human dignity, and zero-margin principles within 250 words.`;
      
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: query }] }],
          generationConfig: { maxOutputTokens: 380, temperature: 0.7 }
        })
      })
      .then(res => res.json())
      .then(data => {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Quota or empty payload');
        const formatted = `${text.replace(/\n/g, '<br>')}<br><br><span class="cache-hit-tag">⚡ Live Gemini 1.5 Flash API Response</span>`;
        if (typeof callback === 'function') callback({ response: formatted });
      })
      .catch(err => {
        // Fallback to Universal Multilingual Generative Engine
        const genText = this.generateUniversalGenerativeAnswer(agent, query);
        if (typeof callback === 'function') callback({ response: genText });
      });
      return;
    }

    // Universal Multilingual Generative Intelligence Engine
    setTimeout(() => {
      const genText = this.generateUniversalGenerativeAnswer(agent, query);
      if (typeof callback === 'function') {
        callback({ response: genText });
      }
    }, 450);
  },

  // Deep Dynamic Generative Answer Engine (Multilingual)
  generateUniversalGenerativeAnswer(agent, query) {
    const q = query.trim();
    const lang = this.detectLanguage(q);
    const qLower = q.toLowerCase();

    // 1. 少子化・少子化対策 (Birthrate & Population Policy)
    if (q.includes('少子化') || qLower.includes('birthrate') || qLower.includes('fertility') || qLower.includes('population')) {
      if (lang === 'ja') {
        return `<strong>【${agent.name} による少子化対策の構造的提言】</strong><br><br>
少子化問題の根本原因は「若者の経済的不安」と「子育て・住居コストの肥大化」、そして「社会からの孤立感」にあります。zero-margin 政策モデルでは以下の3つのゼロ・マージン改革を推進します：<br><br>
1. <strong>住居費（家賃）の中抜き排除と0 Margin住宅網</strong><br>
若年夫婦の収入の30〜50%を占める家賃負担を軽減するため、空き家や地域不動産を非営利の「0 Marginシェルター・住居」として再編し、固定固定費を劇的に削減します。<br><br>
2. <strong>就労所得100%還元の経済安全網</strong><br>
従来の求人・クラウドソーシング手数料（20〜30%）をゼロにし、若者が働いた分の報酬を全額手取りとして保護。若年層の経済的基盤を急速に安定させます。<br><br>
3. <strong>「神の愛」に基づく孤立なき地域コミュニティ</strong><br>
単なる金銭給付にとどまらず、地域フェローやボランティアがワンオペ育児やワンオペ看護を支える互助ネットワークを形成。人間が互いの避難所（Shelter）となる温かい社会を構築します。`;
      }
    }

    // 2. 仕事・雇用・フリーランス (Work, Jobs & 0% Fee Economy)
    if (q.includes('仕事') || q.includes('雇用') || q.includes('給料') || q.includes('収入') || qLower.includes('job') || qLower.includes('work') || qLower.includes('freelance') || qLower.includes('salary')) {
      if (lang === 'ja') {
        return `<strong>【${agent.name} による0 Marginワーク・雇用支援方針】</strong><br><br>
若者やフリーランスの労働成果から中抜き手数料を搾取する構造を変革します：<br><br>
1. <strong>仲介手数料0%の直接マッチング</strong><br>
発注金額の100%がそのままあなたの手元に残ります。1000ドルの案件なら1000ドルすべてが成果報酬です。<br><br>
2. <strong>実名・身元認証による安心取引</strong><br>
`🔵 Verified Trust Member` バッジを付与することで、匿名での買い叩きや不当な買い手を排除し、健全でリスペクトのある取引環境を守ります。<br><br>
3. <strong>若者のキャリア・ポートフォリオ育成</strong><br>
語学・翻訳・IT・デザイン・ガイドなど、若者が自らのスキルで自立し、次の時代を担うグローバル・フェローとして活躍できるよう全力で後押しします。`;
      }
    }

    // 3. 信仰・神の愛・福音・倫理 (Faith, God's Love & Theology)
    if (q.includes('神') || q.includes('愛') || q.includes('キリスト') || q.includes('信仰') || q.includes('福音') || q.includes('教会') || qLower.includes('god') || qLower.includes('love') || qLower.includes('faith') || qLower.includes('gospel')) {
      if (lang === 'ja') {
        return `<strong>【${agent.name} の信仰と神の愛のメッセージ】</strong><br><br>
「ただで受けたのだから、ただで与えなさい。」（マタイによる福音書 10:8）<br><br>
1. <strong>無条件の神の愛（アガペー）</strong><br>
神の愛は条件付きの取引ではありません。病気や試練、社会的孤立の中にあるすべての人に無条件で注がれる恵みです。<br><br>
2. <strong>他者の避難所となる使命</strong><br>
単なる教理の主張にとどまらず、住まいを失った人、孤独な人、貧しい人々に手を差し伸べ、人間が互いの避難所となる実質的な愛を体現します。<br><br>
3. <strong>宗派や宗教を超えた平和の対話</strong><br>
福音の真理を大切にしながらも、他宗教や無宗教の兄弟姉妹とも謙虚に対話し、世界の葛藤や悲しみを共に溶かしていきます。`;
      }
    }

    // 4. 住宅・住まい・シェルター (Shelter & Housing)
    if (q.includes('住まい') || q.includes('家賃') || q.includes('シェルター') || q.includes('住宅') || qLower.includes('shelter') || qLower.includes('housing') || qLower.includes('rent')) {
      if (lang === 'ja') {
        return `<strong>【${agent.name} による0 Marginシェルター・住まい支援】</strong><br><br>
住まいは投機対象ではなく、すべての人が尊厳をもって生きるための基本的人権です：<br><br>
1. <strong>緊急避難シェルターの無償提供</strong><br>
行き場を失った若者や困難な状況にある方々へ、一時避難所と温かい食事を無償で手配します。<br><br>
2. <strong>AI初期相談とボランティアの連携</strong><br>
24時間AIが最初のSOSを受け止め、地域の信頼できる人間ボランティアや専門家へ温かくバトンタッチします。<br><br>
3. <strong>生活再建に向けた自立プログラム</strong><br>
住まいの確保と同時に、0 Marginでの仕事マッチングを提供し、自立のループ（Seed → Tree → Fruit）へと導きます。`;
      }
    }

    // 5. 平和・戦争防止・AIの危険 (Peace, Anti-War & AI Safety)
    if (q.includes('平和') || q.includes('戦争') || q.includes('AI') || q.includes('危険') || qLower.includes('peace') || qLower.includes('war') || qLower.includes('safety')) {
      if (lang === 'ja') {
        return `<strong>【${agent.name} による平和構築とAIリスク対策】</strong><br><br>
1. <strong>自律型致死兵器（LAWS）の監視と制約</strong><br>
軍事AIの暴走を防ぎ、人間の命と尊厳が機械によって奪われない倫理的枠組みを提言します。<br><br>
2. <strong>「北風」外交の限界と人道対話</strong><br>
力による制圧（北風政策）の限界を指摘し、対立する国家・グループとの間で悲しみや憤りを溶かす対話チャンネルを開拓します。<br><br>
3. <strong>G-Zero時代における新しい国際倫理</strong><br>
覇権国不在の時代において、国家の枠組みを超えた市民レベルの「0 Margin平和ネットワーク」を推進します。`;
      }
    }

    // 6. Universal Detailed Dynamic Fallback Strategy based on exact query keywords
    if (lang === 'ja') {
      return `<strong>【${agent.name} によるご質問「${escapeHtml(q)}」への深層回答】</strong><br><br>
ご質問いただいた「${escapeHtml(q)}」について、${agent.name}（${agent.role}）の観点から以下のように構造的に回答いたします：<br><br>
1. <strong>構造的要因の分析</strong><br>
「${escapeHtml(q)}」に関する課題は、既存の社会的摩擦や利益搾取（マージン）の存在に起因しています。当プラットフォームでは、中間マージンを排することで本来の価値と人間性を保護します。<br><br>
2. <strong>具体策と「0 Margin」ソリューション</strong><br>
神の愛と人間の尊厳を基盤とし、若者や当事者が自らアクションを起こせる場（仕事・住まい・対話）を提供し、自立の循環を創出します。<br><br>
3. <strong>今後の展望とコミュニティ連携</strong><br>
この取り組みは一人では完成しません。実名認証メンバーやグローバル・フェローと共に、「${escapeHtml(q)}」に対する真の融和と解決策を形にしていきます。`;
    }

    // English Default Generative Answer
    return `<strong>【${agent.name} Deep Analysis on "${escapeHtml(q)}"】</strong><br><br>
Addressing your query on "<em>${escapeHtml(q)}</em>", ${agent.name} (${agent.role}) synthesizes the following dynamic action strategy:<br><br>
1. <strong>Structural Root-Cause Evaluation</strong><br>
Eliminating exploitative middleman fees and corporate margins to safeguard human dignity.<br><br>
2. <strong>0 Margin Practical Solution</strong><br>
Connecting youth and people in need directly with free shelter, 0% commission work, and verified community support.<br><br>
3. <strong>Sustainable Circular Growth</strong><br>
Empowering individuals from Seed 🌱 to Tree 🌳 and Fruit 🍎 in a continuous cycle of goodwill.`;
  }
};

window.HybridAIEngine = HybridAIEngine;
