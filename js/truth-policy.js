/* ==========================================================================
   Perspective Forum & Co-Creation Community Discussions
   ========================================================================== */

const perspectiveForumFeedData = [
  {
    id: 101,
    topic: 'POLITICAL & ECONOMY',
    title: 'Analyzing 0 Margin Welfare vs Traditional State Safety Nets',
    source: 'Zero Margin Research Institute',
    date: '2 hours ago',
    summary: 'Evaluating how zero-commission work matching and direct community shelter reduce administrative overhead by 40% compared to traditional bureaucracy.',
    verifiedPosters: true,
    comments: [
      {
        id: 1,
        author: 'Pastor Kenji Yamasaki',
        isVerified: true,
        docType: 'Passport Verified',
        seedPoints: 450,
        rankIcon: '🍎',
        text: 'When basic shelter and work are guaranteed without middleman commissions, people regain human dignity. We must shift from passive welfare to active community co-creation.',
        likes: 42
      },
      {
        id: 2,
        author: 'Lukas M.',
        isVerified: true,
        docType: 'Student ID Verified',
        seedPoints: 210,
        rankIcon: '🌿',
        text: 'In Berlin, student fellows are using this system to host traveling researchers for free. It really works when trust is transparently verified!',
        likes: 28
      }
    ]
  },
  {
    id: 102,
    topic: 'HOUSING & SHELTER',
    title: 'Emergency Housing Crisis: Transforming Vacant Properties into Local Shelters',
    source: 'Global Housing Rights Watch',
    date: '5 hours ago',
    summary: 'Proposing non-profit community trusts that repurpose vacant urban buildings into free emergency stays and youth fellowship hubs.',
    verifiedPosters: true,
    comments: [
      {
        id: 3,
        author: 'Hannah S.',
        isVerified: true,
        docType: 'NGO Fellow Verified',
        seedPoints: 320,
        rankIcon: '🌳',
        text: 'Housing should never be a speculative commodity used to drive vulnerable youth into debt. Emergency shelter is a fundamental human right.',
        likes: 35
      }
    ]
  },
  {
    id: 103,
    topic: 'YOUTH & WORK',
    title: 'Zero Platform Cut Freelancing: How 0% Margin Protects Youth Earnings',
    source: 'Economy Agent Analytics',
    date: '1 day ago',
    summary: 'Commercial gig platforms take 20%-30% of youth income. Zero-margin guarantees 100% payout directly to freelancers.',
    verifiedPosters: false,
    comments: [
      {
        id: 4,
        author: 'Alex Chen',
        isVerified: false,
        docType: 'Anonymous Fellow',
        seedPoints: 80,
        rankIcon: '🌱',
        text: 'I completed my first translation job with 0% fee here. Saved $200 compared to other sites!',
        likes: 19
      }
    ]
  }
];

function renderPerspectiveForumFeed() {
  const container = document.getElementById('reconciliationFeed');
  if (!container) return;

  container.innerHTML = perspectiveForumFeedData.map(item => `
    <div class="forum-feed-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
        <span class="paper-tape" style="font-size:0.95rem; padding:0.2rem 0.6rem;">${item.topic}</span>
        <span style="font-size:0.8rem; color:var(--text-light);">${item.date} • ${item.source}</span>
      </div>
      
      <h3 class="forum-title">${escapeHtml(item.title)}</h3>
      <p style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.6;">${escapeHtml(item.summary)}</p>
      
      <!-- Interactive Perspective Comments -->
      <div style="border-top:1.5px dashed var(--border-ink); padding-top:1rem;">
        <h4 style="font-size:0.95rem; font-family:var(--font-sans); color:var(--primary-wood); margin-bottom:0.75rem;">
          💬 Community Perspectives (${item.comments.length})
        </h4>
        
        ${item.comments.map(c => `
          <div class="forum-comment-box">
            <div class="forum-comment-header">
              <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <span style="font-size:1.1rem;">${c.rankIcon}</span>
                <strong style="font-size:0.9rem; color:var(--text-primary);">${escapeHtml(c.author)}</strong>
                ${c.isVerified ? 
                  `<span class="verified-badge">🔵 Verified (${escapeHtml(c.docType)})</span>` : 
                  `<span class="anonymous-badge">⚪ Community Member</span>`}
              </div>
              <div style="text-align:right;">
                <span class="seed-points-badge">🌱 ${c.seedPoints} Seed Pts</span>
                <span class="seed-points-subtext">Non-monetary evaluation representing community care and constructive dialog.</span>
              </div>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6; margin-top:0.4rem;">${escapeHtml(c.text)}</p>
            <div style="margin-top:0.65rem; text-align:right;">
              <button class="btn btn-secondary" style="padding:0.3rem 0.85rem; font-size:0.8rem;" onclick="boostComment(${item.id}, ${c.id})">
                🌱 Support Perspective (+10 Pts) • ${c.likes}
              </button>
            </div>
          </div>
        `).join('')}

        <!-- Add Comment Input Box -->
        <div style="margin-top:1.2rem; display:flex; gap:0.5rem;">
          <input type="text" id="forumCommentInput_${item.id}" class="form-control" placeholder="Share your perspective on this topic..." style="font-size:0.88rem;">
          <button class="btn btn-emerald" style="padding:0.55rem 1.25rem; font-size:0.88rem;" onclick="submitPerspectiveComment(${item.id})">
            Join Discussion
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function submitPerspectiveComment(feedId) {
  const input = document.getElementById(`forumCommentInput_${feedId}`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const saved = localStorage.getItem('zeroMarginMember');
  let authorName = 'Community Guest';
  let isVerified = false;
  let docType = 'Anonymous Fellow';
  let pts = 50;

  if (saved) {
    const member = JSON.parse(saved);
    authorName = member.name || authorName;
    isVerified = !!member.isVerified;
    docType = member.verifyDoc || 'Registered Member';
    pts = member.points || 50;
  }

  const feedItem = perspectiveForumFeedData.find(f => f.id === feedId);
  if (feedItem) {
    feedItem.comments.unshift({
      id: Date.now(),
      author: authorName,
      isVerified: isVerified,
      docType: docType,
      seedPoints: pts,
      rankIcon: isVerified ? '🍎' : '🌱',
      text: text,
      likes: 1
    });

    feedItem.comments.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0));
  }

  input.value = '';
  renderPerspectiveForumFeed();

  if (typeof logContributionAction === 'function' && saved) {
    logContributionAction('Posted Perspective on Forum', 30);
  }
}

function boostComment(feedId, commentId) {
  const feedItem = perspectiveForumFeedData.find(f => f.id === feedId);
  if (feedItem) {
    const c = feedItem.comments.find(item => item.id === commentId);
    if (c) {
      c.likes += 1;
      c.seedPoints += 10;
      renderPerspectiveForumFeed();
    }
  }
}

function submitPoliticalPost(event) {
  event.preventDefault();
  const input = document.getElementById('politicalPostText');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  submitPerspectiveComment(101);
  input.value = '';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

window.addEventListener('DOMContentLoaded', () => {
  renderPerspectiveForumFeed();
});
