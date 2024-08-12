const $templateInput = document.querySelector('#review-template');

// 處理使用者輸入並儲存模板
$templateInput.addEventListener('input', (e) => {
  const { value } = e.currentTarget;

  // 使用 chrome.storage 同步設定
  chrome.storage.sync.set({ reviewTemplate: value });
});

// 取得 storage 中的模板
async function fetchData() {
  let { reviewTemplate } = await chrome.storage.sync.get(['reviewTemplate']);

  $templateInput.value = reviewTemplate;
}

// 由於每次重新打開 popup，就等同打開新視窗，所以使用 onload 重新取得資料
window.onload = () => {
  fetchData();
}