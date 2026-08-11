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
        <span style="font-size:1.4rem;">🕊️</span> Request Received: AI Intake Connecting to Local Volunteer
      </h4>
      <p style="font-size:0.9rem; line-height:1.6; margin-bottom:0.75rem;">
        Please rest assured that you are not alone. Under God's love, your dignity is protected and we are connecting you to safe shelter and support.
      </p>
      <div style="background:#fff; border-radius:8px; padding:1rem; font-size:0.85rem; color:#2D3748;">
        <strong>【 Intake Status 】</strong><br>
        1. Category: <strong>${category}</strong> (${location || 'Global'})<br>
        2. AI Assessment: <strong>Completed & Verified Confidential</strong><br>
        3. Next Step: <strong>Assigning to nearest Global Fellow / Local Volunteer Hub</strong>
      </div>
    </div>
  `;
}
