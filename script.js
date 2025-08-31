document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('code-input');
    const outputFrame = document.getElementById('output-frame');

    inputArea.addEventListener('input', updateOutput);
    updateOutput();

    function updateOutput() {
        const code = inputArea.value;
        const frameDoc = outputFrame.contentDocument;

        frameDoc.body.innerHTML = '';
        frameDoc.head.innerHTML = '';

        const isHtml = /<[a-z][\s\S]*>/.test(code);
        const isCss = /\{[\s\S]*\}/.test(code) && (code.includes('background-color') || code.includes('font-family'));

        if (isHtml) {
            frameDoc.body.innerHTML = code;
        } else if (isCss) {
            const style = frameDoc.createElement('style');
            style.textContent = code;
            frameDoc.head.appendChild(style);
        } else {
            // 使用 Marked.js 函式庫來渲染 Markdown
            frameDoc.body.innerHTML = marked.parse(code);
        }
    }
});