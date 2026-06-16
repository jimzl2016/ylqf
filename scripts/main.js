// ==================== 交互脚本 ====================

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initPageInteractions();
  console.log('艺旅清风智慧监督系统 - 原型已加载');
});

// 导航菜单交互
function initNavigation() {
  // 子菜单展开/收起
  const submenuTriggers = document.querySelectorAll('[data-submenu]');
  
  submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const submenuKey = this.getAttribute('data-submenu');
      const submenu = document.getElementById('submenu-' + submenuKey);
      const arrow = this.querySelector('.nav-arrow');
      
      if (submenu) {
        submenu.classList.toggle('open');
        if (arrow) {
          arrow.classList.toggle('open');
        }
      }
    });
  });

  // 默认展开档案管理和案件管理菜单
  const defaultExpandMenus = ['archive', 'ai-analysis', 'case', 'ledger', 'lowcode'];
  defaultExpandMenus.forEach(key => {
    const submenu = document.getElementById('submenu-' + key);
    const trigger = document.querySelector('[data-submenu="' + key + '"]');
    if (submenu && trigger) {
      submenu.classList.add('open');
      const arrow = trigger.querySelector('.nav-arrow');
      if (arrow) {
        arrow.classList.add('open');
      }
    }
  });
}

// 页面交互
function initPageInteractions() {
  // 搜索框聚焦效果
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.style.boxShadow = 'none';
    });
  }

  // 按钮悬停效果
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      showToast('操作已执行');
    });
  });

  // 统计卡片点击事件 - 模拟钻取
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const labels = ['人员详情', '预警详情', '处理记录', '形态分析'];
      showToast('查看' + labels[index] + '详情');
    });
  });

  // 表格行点击
  const tableRows = document.querySelectorAll('.data-table tbody tr');
  tableRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function() {
      showToast('查看详情');
    });
  });

  // Tab切换
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      showToast('切换至' + this.textContent);
    });
  });

  // 分页按钮
  const pageBtns = document.querySelectorAll('.page-btn');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        pageBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        showToast('跳转至第' + this.textContent + '页');
      }
    });
  });
}

// Toast提示
function showToast(message, type = 'info') {
  // 创建toast元素
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#1f2937'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  
  // 动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  if (!document.querySelector('style[data-toast]')) {
    style.setAttribute('data-toast', 'true');
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  // 3秒后移除
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 页面导航辅助函数
function navigateTo(page) {
  window.location.href = page;
}

// 控制台欢迎信息
console.log('%c艺旅清风 - 智慧监督系统', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%c高保真交互原型 - 演示版本', 'color: #6b7280; font-size: 14px;');
console.log('%c点击任意元素查看交互效果', 'color: #9ca3af; font-size: 12px;');