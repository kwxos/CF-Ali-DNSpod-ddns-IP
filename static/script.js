// 初始显示IPv4标签
document.addEventListener('DOMContentLoaded', function() {
    showTab('ipv4');
  });
  
  function showTab(tabName) {
    // 隐藏所有 tab 内容
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
      content.classList.remove('fade-in');
    });
    
    // 显示选中的 tab 内容
    const activeContent = document.getElementById(tabName + '-content');
    activeContent.classList.remove('hidden');
    
    // 应用淡入动画
    setTimeout(() => {
      activeContent.classList.add('fade-in');
    }, 10);
  
    // 更新 tab 按钮样式
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // 更新时间显示
    document.getElementById('update-time').textContent = tabName === 'ipv4' ? '${ipv4time || '未知'}' : '${ipv6time || '未知'}';
  }