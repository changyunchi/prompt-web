// 切換圖標功能
const toggleIcon = document.getElementById('toggleIcon');
const body = document.body;

// 初始狀態：白色背景，顯示太陽
body.classList.remove('dark-mode');
toggleIcon.classList.add('active');

toggleIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    body.classList.toggle('dark-mode');
});

// 複製功能
function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    const code = codeBlock.querySelector('code').innerText;
    const message = button.nextElementSibling;
    
    navigator.clipboard.writeText(code).then(() => {
        message.textContent = "複製成功!";
        message.className = "copy-message copy-success";
        message.style.opacity = "1";
        
        setTimeout(() => {
            message.style.opacity = "0";
        }, 2000);
    }).catch(err => {
        message.textContent = "複製失敗!";
        message.className = "copy-message copy-error";
        message.style.opacity = "1";
        
        setTimeout(() => {
            message.style.opacity = "0";
        }, 2000);
    });
}

// 實時渲染功能
function renderContent() {
    const inputText = document.getElementById('inputText').value;
    const renderArea = document.getElementById('renderArea');
    
    if (!inputText.trim()) {
        renderArea.innerHTML = '<h3>渲染預覽區</h3><p>在此處顯示輸入的內容。支援 HTML、CSS 和 Markdown 語法。</p>';
        return;
    }
    
    // 簡單的Markdown轉HTML（基本功能）
    let htmlContent = inputText
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n/gim, '<br>');
    
    renderArea.innerHTML = htmlContent;
}
