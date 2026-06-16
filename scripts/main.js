// ====================================
// 艺旅清风智慧监督系统 - 主交互脚本
// ====================================

// --- 全局配置 ---
const API_BASE = '/api';

// --- 弹窗系统 ---
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}
function closeAllModals() { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); }

// --- Toast消息 ---
function showToast(msg, type = 'success') {
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div'); c.id = 'toast-container';
    c.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(c); return c;
  })();
  const t = document.createElement('div');
  t.style.cssText = `padding:12px 20px;background:${colors[type]||'#10b981'};color:#fff;border-radius:6px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,.15);animation:slideIn .3s ease;display:flex;align-items:center;gap:8px;min-width:200px;`;
  t.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':type==='error'?'fa-times-circle':type==='warning'?'fa-exclamation-triangle':'fa-info-circle'}"></i> ${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100px)'; t.style.transition = 'all .3s'; setTimeout(() => t.remove(), 300); }, 2500);
}

// --- 确认对话框 ---
function confirmDialog(msg, cb) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:9999;display:flex;align-items:center;justify-content:center;';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:8px;padding:24px;min-width:360px;box-shadow:0 8px 30px rgba(0,0,0,.2);';
  box.innerHTML = `<p style="margin:0 0 20px;font-size:15px;color:#333;">${msg}</p><div style="display:flex;gap:8px;justify-content:flex-end;"><button class="btn btn-sm" onclick="this.closest('div[style]').parentElement.remove()">取消</button><button class="btn btn-sm btn-primary" id="confirmBtn">确定</button></div>`;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  document.getElementById('confirmBtn').onclick = () => { overlay.remove(); if (cb) cb(); };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// --- 分类填报 ---
function selectCategory(el) {
  document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('checked'));
  el.classList.add('checked');
}

// --- 批量导入 ---
function openImportModal() {
  // 动态创建导入弹窗
  if (document.getElementById('importModal')) { openModal('importModal'); return; }
  const div = document.createElement('div');
  div.id = 'importModal';
  div.className = 'modal';
  div.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.4);';
  div.innerHTML = `
    <div class="modal-content" style="background:#fff;border-radius:12px;width:560px;max-height:80vh;overflow-y:auto;box-shadow:0 8px 30px rgba(0,0,0,.2);">
      <div class="modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <h3 style="margin:0;font-size:16px;"><i class="fas fa-upload" style="color:var(--primary);margin-right:8px;"></i>批量导入档案</h3>
        <button onclick="closeModal('importModal')" style="background:none;border:none;font-size:20px;cursor:pointer;color:#999;">&times;</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        <div style="border:2px dashed #d1d5db;border-radius:8px;padding:32px;text-align:center;background:#f9fafb;margin-bottom:16px;cursor:pointer;" onclick="showToast('选择导入文件')">
          <i class="fas fa-cloud-upload-alt" style="font-size:36px;color:var(--primary);margin-bottom:8px;display:block;"></i>
          <p style="margin:0;color:var(--text-secondary);">点击上传或拖拽文件到此区域</p>
          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">支持 .xlsx, .xls, .csv 格式</p>
        </div>
        <div style="margin-bottom:12px;">
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">导入模板</label>
          <button class="btn btn-sm" onclick="showToast('模板下载中...')"><i class="fas fa-download"></i> 下载导入模板</button>
        </div>
        <div>
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">导入选项</label>
          <select class="search-input" style="width:100%;">
            <option>覆盖已有数据（以导入数据为准）</option>
            <option>跳过已存在记录</option>
            <option>追加模式（新增不更新）</option>
          </select>
        </div>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px;padding:16px 24px;border-top:1px solid #e5e7eb;">
        <button class="btn" onclick="closeModal('importModal')">取消</button>
        <button class="btn btn-primary" onclick="showToast('导入数据验证完成，共10条记录，9条成功，1条失败');closeModal('importModal')"><i class="fas fa-file-import"></i> 开始导入</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  openModal('importModal');
}

// --- 档案退回 ---
function openRejectModal() {
  if (document.getElementById('rejectModal')) { openModal('rejectModal'); return; }
  const div = document.createElement('div');
  div.id = 'rejectModal';
  div.className = 'modal';
  div.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.4);';
  div.innerHTML = `
    <div class="modal-content" style="background:#fff;border-radius:12px;width:520px;box-shadow:0 8px 30px rgba(0,0,0,.2);">
      <div class="modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <h3 style="margin:0;font-size:16px;"><i class="fas fa-undo" style="color:var(--warning);margin-right:8px;"></i>档案退回</h3>
        <button onclick="closeModal('rejectModal')" style="background:none;border:none;font-size:20px;cursor:pointer;color:#999;">&times;</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">退回对象</label>
          <select class="search-input" style="width:100%;"><option>张三 - 教务处</option><option>李四 - 财务处</option><option>王五 - 学生处</option></select>
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">退回类型</label>
          <select class="search-input" style="width:100%;"><option>信息不完整</option><option>材料缺失</option><option>信息有误</option><option>格式不符合要求</option><option>其他</option></select>
        </div>
        <div>
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">退回说明 <span style="color:red;">*</span></label>
          <textarea class="search-input" style="width:100%;min-height:80px;resize:vertical;" placeholder="请详细说明退回原因..."></textarea>
        </div>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px;padding:16px 24px;border-top:1px solid #e5e7eb;">
        <button class="btn" onclick="closeModal('rejectModal')">取消</button>
        <button class="btn" style="background:var(--warning);color:#fff;" onclick="showToast('档案已退回','warning');closeModal('rejectModal')"><i class="fas fa-undo"></i> 确认退回</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  openModal('rejectModal');
}

// --- 定时回收 ---
function openRecycleModal() {
  if (document.getElementById('recycleModal')) { openModal('recycleModal'); return; }
  const div = document.createElement('div');
  div.id = 'recycleModal';
  div.className = 'modal';
  div.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.4);';
  div.innerHTML = `
    <div class="modal-content" style="background:#fff;border-radius:12px;width:520px;box-shadow:0 8px 30px rgba(0,0,0,.2);">
      <div class="modal-header" style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <h3 style="margin:0;font-size:16px;"><i class="fas fa-clock" style="color:var(--primary);margin-right:8px;"></i>定时回收设置</h3>
        <button onclick="closeModal('recycleModal')" style="background:none;border:none;font-size:20px;cursor:pointer;color:#999;">&times;</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">回收策略</label>
          <select class="search-input" style="width:100%;"><option>手动回收</option><option>每周自动回收</option><option>每月自动回收</option><option>每季度自动回收</option></select>
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">回收条件</label>
          <select class="search-input" style="width:100%;"><option>档案状态为"已退回"超过30天</option><option>档案状态为"已退回"超过60天</option><option>档案状态为"已退回"超过90天</option></select>
        </div>
        <div>
          <label style="display:block;font-size:13px;font-weight:500;margin-bottom:4px;">回收操作</label>
          <select class="search-input" style="width:100%;"><option>放入回收站（可恢复）</option><option>彻底删除（不可恢复）</option><option>归档封存</option></select>
        </div>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px;padding:16px 24px;border-top:1px solid #e5e7eb;">
        <button class="btn" onclick="closeModal('recycleModal')">取消</button>
        <button class="btn btn-primary" onclick="showToast('定时回收设置已保存');closeModal('recycleModal')"><i class="fas fa-check"></i> 保存设置</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  openModal('recycleModal');
}

// --- 档案下载 ---
function downloadArchive(name) {
  showToast(`正在下载 ${name || '选中'} 档案...`,'info');
  setTimeout(() => showToast('档案下载完成'), 1500);
}

// --- 批量操作 ---
function batchDownload() { 
  const checked = document.querySelectorAll('.archive-checkbox:checked');
  if (checked.length === 0) { showToast('请先选择要导出的档案','warning'); return; }
  downloadArchive(`已选${checked.length}份档案`);
}
function batchImport() { openImportModal(); }

// --- 表格全选 ---
function toggleSelectAll(cb) {
  document.querySelectorAll('.archive-checkbox').forEach(c => c.checked = cb.checked);
}

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', function () {
  // 侧边栏子菜单切换
  document.querySelectorAll('.nav-item > .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const parent = this.parentElement;
      const submenu = parent.querySelector('.nav-submenu');
      if (submenu) {
        e.preventDefault();
        submenu.classList.toggle('open');
      }
    });
  });

  // Toast样式注入
  const style = document.createElement('style');
  style.textContent = `@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}`;
  document.head.appendChild(style);

  // 标记当前页面
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll(`.nav-submenu a[href="${path}"]`).forEach(el => el.classList.add('active'));
});