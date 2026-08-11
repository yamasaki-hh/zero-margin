/* ==========================================================================
   Main Application Controller & Member Registration System
   ========================================================================== */

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('onclick') && item.getAttribute('onclick').includes(tabId));
  });
  
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });
  
  const navElement = document.querySelector('.tab-nav');
  if (navElement) {
    window.scrollTo({ top: navElement.offsetTop - 90, behavior: 'smooth' });
  }
}

// Member Registration Modal & Local Storage Management
function openRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) modal.classList.remove('active');
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const role = document.getElementById('regRole').value;
  const location = document.getElementById('regLocation').value.trim();
  
  if (!name || !email) {
    alert('Please enter your name and email address.');
    return;
  }
  
  const memberId = 'ZM-' + Math.floor(1000 + Math.random() * 9000);
  const memberData = { name, email, role, location, memberId, date: new Date().toLocaleDateString() };
  
  localStorage.setItem('zeroMarginMember', JSON.stringify(memberData));
  
  closeRegisterModal();
  updateMemberUI(memberData);
  
  alert(`Welcome to zero-margin, ${name}!\nYour Member ID: ${memberId}\nThank you for joining our global network of shelter, peace, and 0% margin support.`);
}

function updateMemberUI(data) {
  const memberContainer = document.getElementById('navMemberArea');
  if (!memberContainer) return;
  
  if (data) {
    memberContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem; background:#FEF3C7; border:1px solid #FCD34D; padding:0.35rem 0.85rem; border-radius:9999px; font-size:0.85rem; color:#92400E; font-weight:700;">
        <span>👤 ${data.name}</span>
        <span style="font-size:0.75rem; background:#D97706; color:#fff; padding:0.1rem 0.5rem; border-radius:10px;">ID: ${data.memberId}</span>
      </div>
    `;
  } else {
    memberContainer.innerHTML = `
      <button class="btn btn-emerald" style="padding:0.45rem 1rem; font-size:0.85rem;" onclick="openRegisterModal()">
        👤 Member Sign Up (Free)
      </button>
    `;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  const savedMember = localStorage.getItem('zeroMarginMember');
  if (savedMember) {
    try {
      updateMemberUI(JSON.parse(savedMember));
    } catch (e) {
      updateMemberUI(null);
    }
  } else {
    updateMemberUI(null);
  }
});
