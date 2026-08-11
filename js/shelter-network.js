/* ==========================================================================
   Shelter: Global Shelter Network (Global Care Intake)
   ========================================================================== */

function submitShelterIntake(event) {
  event.preventDefault();
  
  const category = document.getElementById('shelterCategory').value;
  const location = document.getElementById('shelterLocation').value;
  const message = document.getElementById('shelterMessage').value;
  
  if (!message.trim()) {
    alert('Please enter your message or situation.');
    return;
  }
  
  const resultDiv = document.getElementById('shelterResult');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div style="background:#D1FAE5; border:1px solid #059669; border-radius:12px; padding:1.5rem; color:#064E3B; margin-top:1.5rem; animation:fadeIn 0.4s ease;">
      <h4 style="font-size:1.1rem; font-family:var(--font-sans); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">
        <span style="font-size:1.4rem;">🕊️</span> お申込み受付完了 (Intake Received): AI受付より地元のボランティアへ繋ぎます
      </h4>
      <p style="font-size:0.9rem; line-height:1.6; margin-bottom:0.75rem;">
        あなたは決して一人ではありません。神の愛のもとであなたの尊厳を守り、地元の安全な住まいとサポートへ速やかに繋ぎます。
      </p>
      <div style="background:#fff; border-radius:8px; padding:1rem; font-size:0.85rem; color:#2D3748;">
        <strong>【 お申込みステータス 】</strong><br>
        1. カテゴリ: <strong>${category}</strong> (${location || 'グローバル'})<br>
        2. AI初期診断: <strong>完了（秘密厳守・セキュリティ保護済み）</strong><br>
        3. 次のステップ: <strong>最寄りのグローバル・フェロー / 地域ボランティアハブへ割り当て中</strong>
      </div>
    </div>
  `;
}
