let isDragging = false;    
let initialX, initialY, xOffset = 0, yOffset = 0;    

const floatingBall = document.getElementById('floatingBall');    
const bubble = document.querySelector('.bubble');    

floatingBall.addEventListener('mousedown', dragStart, false);    
document.addEventListener('mouseup', dragEnd, false);    
document.addEventListener('mousemove', drag, false);    

floatingBall.addEventListener('click', showBubble, false); // 添加点击事件来显示气泡  

function dragStart(e) {    
    isDragging = true;    
    initialX = e.clientX - xOffset;    
    initialY = e.clientY - yOffset;    
    floatingBall.style.cursor = 'grabbing';    
}    

function dragEnd(e) {    
    isDragging = false;    
    floatingBall.style.cursor = 'grab';    
    // 可以在这里调用 updateBubblePosition 来确保气泡位置正确（如果需要）  
    // 但通常只在悬浮球位置改变且有气泡显示时调用  
    if(bubble.style.display === 'block') {
      updateBubblePosition();
    }
    
}    

function drag(e) {    
    if (isDragging) {    
        e.preventDefault();    
        xOffset = e.clientX - initialX;    
        yOffset = e.clientY - initialY;    
        setTranslate(xOffset, yOffset, floatingBall);    
        // 不在拖动过程中更新气泡位置  
    }    
}    

function setTranslate(xPos, yPos, el) {    
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;    
}    

function showBubble() {  
    updateBubblePosition();  
    bubble.style.display = 'block'; // 显示气泡  
}  

function hideBubble() {  
    bubble.style.display = 'none'; // 隐藏气泡  
}  

function updateBubblePosition() {  
    if (!floatingBall || !bubble) return;  
    const rect = floatingBall.getBoundingClientRect();  
    bubble.textContent = '主人，绳网是用来工作的，不是来**的'; // 气泡内容  
  
    // 气泡的宽度和高度（假设内容不变，可以预先计算或缓存）  
    const bubbleWidth = 300; // 假设宽度  
    const bubbleHeight = 50; // 假设高度  
  
    // 计算气泡的左侧和顶部位置  
    let bubbleLeft = rect.left - bubbleWidth - 0; // +是向右  
    let bubbleTop = rect.bottom - bubbleHeight + 5; // +是向下  
  
    // 检查边界条件  
    if (bubbleLeft < 0) {  
        bubbleLeft = 0; // 防止气泡超出视窗左侧  
    }  
    if (bubbleTop < 20) {  
        bubbleTop = rect.top + 10; // 如果气泡顶部超出屏幕顶部，调整其顶部位置  
    }  
  
    // 设置气泡的位置  
    bubble.style.left = `${bubbleLeft}px`;  
    bubble.style.top = `${bubbleTop}px`;  
}    

// 初始时不显示气泡  
hideBubble();