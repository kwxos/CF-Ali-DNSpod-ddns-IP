addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    // 从 KV 获取数据（假设 KV 命名空间绑定为 KV_NAMESPACE）
    const ipv6Data = await KV_NAMESPACE.get('ipv6');
    const ipv4Data = await KV_NAMESPACE.get('ipv4');
    const ipv6time = await KV_NAMESPACE.get('ipv6time');
    const ipv4time = await KV_NAMESPACE.get('ipv4time');
    // 检查数据是否存在
    if (!ipv6Data && !ipv4Data) {
      return new Response('错误：未找到键 "ipv6" 或 "ipv4" 的数据', { status: 404 });
    }

    // 解析 IPv6 数据
    let ipv6TableRows = '';
    if (ipv6Data) {
      const rows = ipv6Data.split('&').map(row => row.split(','));
      for (const row of rows) {
        if (row.length === 6) { // 确保每行有 6 个字段
          ipv6TableRows += `
            <tr class="transition-colors duration-200 hover:bg-gray-50 border-b border-gray-200">
              <td class="py-2 px-3 font-mono text-xs">${row[0]}</td>
              <td class="py-2 px-3">${row[1]}</td>
              <td class="py-2 px-3">${row[2]}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded-full text-xs ${parseFloat(row[3]) > 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">${row[3]}%</span></td>
              <td class="py-2 px-3">${row[4]} <span class="text-gray-500 text-xs">ms</span></td>
              <td class="py-2 px-3"><span class="font-medium ${parseFloat(row[5]) > 10 ? 'text-green-600' : parseFloat(row[5]) > 5 ? 'text-blue-600' : 'text-gray-600'}">${row[5]}</span> <span class="text-gray-500 text-xs">MB/s</span></td>
            </tr>
          `;
        }
      }
    }

    // 解析 IPv4 数据
    let ipv4TableRows = '';
    if (ipv4Data) {
      const rows = ipv4Data.split('&').map(row => row.split(','));
      for (const row of rows) {
        if (row.length === 6) { // 确保每行有 6 个字段
          ipv4TableRows += `
            <tr class="transition-colors duration-200 hover:bg-gray-50 border-b border-gray-200">
              <td class="py-2 px-3 font-mono text-xs">${row[0]}</td>
              <td class="py-2 px-3">${row[1]}</td>
              <td class="py-2 px-3">${row[2]}</td>
              <td class="py-2 px-3"><span class="px-2 py-0.5 rounded-full text-xs ${parseFloat(row[3]) > 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">${row[3]}%</span></td>
              <td class="py-2 px-3">${row[4]} <span class="text-gray-500 text-xs">ms</span></td>
              <td class="py-2 px-3"><span class="font-medium ${parseFloat(row[5]) > 10 ? 'text-green-600' : parseFloat(row[5]) > 5 ? 'text-blue-600' : 'text-gray-600'}">${row[5]}</span> <span class="text-gray-500 text-xs">MB/s</span></td>
            </tr>
          `;
        }
      }
    }

    // 生成 HTML 页面
    const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CloudFlare BestIP</title>
      <link rel="shortcut icon" href="https://blog.loadke.tech/assets/img/favico1n.png">
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://jsdelivr.badking.pp.ua/gh/IonRh/Cloudflare-BestIP@main/static/styles.css">
    </head>
    <body>
      <div class="container">
        <!-- 标题居中 -->
        <div class="text-center mb-6">
          <h1 class="text-xl font-medium text-gray-900">CloudFlare BestIP</h1>
        </div>
        
        <!-- 使用说明和注意事项 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-card">
            <h2 class="info-title">
              <span class="icon bg-blue-500 text-white text-xs">使</span>
              使用说明
            </h2>
            <p class="text-sm text-gray-600">
              本站维护公共CNAME域名: <span class="code-block">*.cf.badking.pp.ua</span>，支持 IPv4 与 IPv6。
            </p>
            <p class="text-sm text-gray-600 mt-2">
              可自定义 CNAME 地址来避免劫持蜘蛛情况的发生。
            </p>
            <p class="text-sm text-gray-600 mt-2">
              例如: 自定义<span class="code-block">xxxxx.cf.badking.pp.ua</span>
            </p>
          </div>
          
          <div class="info-card">
            <h2 class="info-title">
              <span class="icon bg-yellow-500 text-white text-xs">注</span>
              注意事项
            </h2>
            <p class="text-sm text-gray-600">
              提供Best CloudFlare 节点 IP，每10分钟检测一次，数据波动较大时更新。
            </p>
            <p class="text-sm text-gray-600 mt-2">
              当检测无变化时，24小时强制刷新解析。本站不提供任何CDN服务。
            </p>
            <p class="text-sm text-gray-600 mt-2">
              严禁用户从事任何违法犯罪活动或被他人网络信息犯罪行为!!!
            </p>
            <p class="text-sm text-gray-600 mt-2">
              本站使用项目：<a href="https://github.com/kwxos/CF-Ali-DNSpod-ddns-IP" class="underline hover:text-blue-700" target="_blank">BestIP for CF-Ali-DNSpod</a>
            </p>
          </div>
        </div>
        
        <!-- 标签切换 + 更新时间（左对齐，时间在右侧） -->
        <div class="flex items-center mb-6">
          <div class="tab-container">
            <button onclick="showTab('ipv4')" class="tab-btn active" id="ipv4-tab">IPv4</button>
            <button onclick="showTab('ipv6')" class="tab-btn" id="ipv6-tab">IPv6</button>
          </div>
          <div class="time-badge" id="update-time-display">
            更新时间: <span id="update-time">${ipv4time || '未知'}</span>
          </div>
        </div>
    
        <!-- 表格卡片 -->
        <div class="card mb-6">
          <!-- IPv4 表格 -->
          <div id="ipv4-content" class="tab-content">
            ${ipv4TableRows ? `
              <div class="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>IP 地址</th>
                      <th>已发送</th>
                      <th>已接收</th>
                      <th>丢包率</th>
                      <th>平均延迟</th>
                      <th>下载速度</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ipv4Data.split('&').map(row => {
                      const cols = row.split(',');
                      if (cols.length === 6) {
                        return `
                          <tr>
                            <td class="font-mono">${cols[0]}</td>
                            <td>${cols[1]}</td>
                            <td>${cols[2]}</td>
                            <td>
                              <span class="badge ${parseFloat(cols[3]) > 5 ? 'badge-error' : 'badge-success'}">${cols[3]}%</span>
                            </td>
                            <td>${cols[4]} <span class="text-gray-400">ms</span></td>
                            <td>
                              <span class="${parseFloat(cols[5]) > 10 ? 'text-green-600' : parseFloat(cols[5]) > 5 ? 'text-blue-600' : 'text-gray-600'} font-medium">${cols[5]}</span>
                              <span class="text-gray-400">MB/s</span>
                            </td>
                          </tr>
                        `;
                      }
                      return '';
                    }).join('')}
                  </tbody>
                </table>
              </div>
            ` : '<div class="py-16 text-center text-gray-500"><svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p>暂无 IPv4 数据</p></div>'}
          </div>
    
          <!-- IPv6 表格 -->
          <div id="ipv6-content" class="tab-content hidden">
            ${ipv6TableRows ? `
              <div class="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>IP 地址</th>
                      <th>已发送</th>
                      <th>已接收</th>
                      <th>丢包率</th>
                      <th>平均延迟</th>
                      <th>下载速度</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ipv6Data.split('&').map(row => {
                      const cols = row.split(',');
                      if (cols.length === 6) {
                        return `
                          <tr>
                            <td class="font-mono">${cols[0]}</td>
                            <td>${cols[1]}</td>
                            <td>${cols[2]}</td>
                            <td>
                              <span class="badge ${parseFloat(cols[3]) > 5 ? 'badge-error' : 'badge-success'}">${cols[3]}%</span>
                            </td>
                            <td>${cols[4]} <span class="text-gray-400">ms</span></td>
                            <td>
                              <span class="${parseFloat(cols[5]) > 10 ? 'text-green-600' : parseFloat(cols[5]) > 5 ? 'text-blue-600' : 'text-gray-600'} font-medium">${cols[5]}</span>
                              <span class="text-gray-400">MB/s</span>
                            </td>
                          </tr>
                        `;
                      }
                      return '';
                    }).join('')}
                  </tbody>
                </table>
              </div>
            ` : '<div class="py-16 text-center text-gray-500"><svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p>暂无 IPv6 数据</p></div>'}
          </div>
        </div>
        
        <!-- 页脚 -->
        <div class="footer">
          <p>© ${new Date().getFullYear()} CloudFlare 优选IP · <a href="https://blog.loadke.tech" >Mr.阿布白</a>
          </p>
        </div>
      </div>
    
      <!-- 标签切换的 JavaScript -->
      <script>
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
      </script>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
      status: 200
    });
  } catch (error) {
    return new Response(`错误：${error.message}`, { status: 500 });
  }
}