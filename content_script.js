// 假设有一个全局的悬浮球元素和气泡容器  
let floatingBall = null;  
let bubbleContainer = null;  
  
// 初始化悬浮球和气泡容器（这部分代码可能需要在DOM加载完成后执行）  
function initializeFloatingBall() {  
    // 创建悬浮球元素和气泡容器元素  
    // ...  
  
    // 监听悬浮球的点击事件  
    floatingBall.addEventListener('click', function(e) {  
        // 显示气泡内容的逻辑  
        // ...  
    });  
  
    // 监听悬浮球的长按事件（这里可能需要更复杂的逻辑来检测长按）  
    // ...  
  
    // 加载用户设置（可选）  
    chrome.storage.sync.get(['floatingBallImageUrl', 'floatingBallContent'], function(items) {  
        if (items.floatingBallImageUrl) {  
            // 更新悬浮球图片  
            // ...  
        }  
        // 初始化气泡内容等  
    });  
}  
  
// 页面加载完成后初始化  
document.addEventListener('DOMContentLoaded', initializeFloatingBall);