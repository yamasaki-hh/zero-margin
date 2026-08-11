/* ==========================================================================
   Seed → Tree → Fruit → New Seed Perfect Circular Loop Visualizer (円環)
   ========================================================================== */

function initSeedCycleCanvas() {
  const canvas = document.getElementById('seedCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  let angleOffset = 0;
  
  // 4 Nodes arranged in a perfect circle (0°, 90°, 180°, 270°)
  const nodeDefs = [
    { title: '1. SEED', subtitle: 'Dignity Restored', color: '#C2410C', angle: -Math.PI / 2, desc: 'God’s love & human worth' },
    { title: '2. TREE', subtitle: 'Personal Growth', color: '#059669', angle: 0, desc: 'Deep roots in work & study' },
    { title: '3. FRUIT', subtitle: 'Giving Back', color: '#D97706', angle: Math.PI / 2, desc: 'Supporting others & society' },
    { title: '4. NEW SEED', subtitle: 'Cycle Continues', color: '#4F46E5', angle: Math.PI, desc: 'Becoming shelter for next' }
  ];
  
  function draw() {
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) * 0.32;
    
    ctx.clearRect(0, 0, w, h);
    
    angleOffset += 0.008;
    if (angleOffset > Math.PI * 2) angleOffset = 0;
    
    // Draw Outer Perfect Circle (円環)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#EADEC9';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw Inner Glowing Core ("GOD'S LOVE")
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFBEB';
    ctx.shadowColor = 'rgba(217, 119, 6, 0.3)';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D97706';
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#92400E';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("GOD'S LOVE", centerX, centerY - 4);
    ctx.fillStyle = '#059669';
    ctx.font = '9px sans-serif';
    ctx.fillText("SUSTAINABLE", centerX, centerY + 8);
    
    // Draw revolving light particles along the circular loop
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const pAngle = angleOffset + (i * (Math.PI * 2 / particleCount));
      const px = centerX + Math.cos(pAngle) * radius;
      const py = centerY + Math.sin(pAngle) * radius;
      
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.shadowColor = 'rgba(217, 119, 6, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    // Draw 4 Main Nodes & Labels on the Circle
    nodeDefs.forEach((node, idx) => {
      const nx = centerX + Math.cos(node.angle) * radius;
      const ny = centerY + Math.sin(node.angle) * radius;
      
      // Node Glowing Outer Pulse
      ctx.beginPath();
      ctx.arc(nx, ny, 22 + Math.sin(angleOffset * 2 + idx) * 3, 0, Math.PI * 2);
      ctx.fillStyle = node.color + '22';
      ctx.fill();
      
      // Main Node Circle
      ctx.beginPath();
      ctx.arc(nx, ny, 16, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      
      // Label Text Placement
      let textX = nx;
      let textY = ny;
      let align = 'center';
      
      if (idx === 0) { textY = ny - 24; } // Top (SEED)
      else if (idx === 1) { textX = nx + 26; textY = ny + 4; align = 'left'; } // Right (TREE)
      else if (idx === 2) { textY = ny + 32; } // Bottom (FRUIT)
      else if (idx === 3) { textX = nx - 26; textY = ny + 4; align = 'right'; } // Left (NEW SEED)
      
      ctx.fillStyle = '#1C201E';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = align;
      ctx.fillText(node.title, textX, textY);
      
      ctx.fillStyle = node.color;
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(node.subtitle, textX, textY + (idx === 0 ? -14 : 14));
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(initSeedCycleCanvas, 200);
});
