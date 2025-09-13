function showOverlayMessage(message, isError) {
    const overlay = document.createElement('div');
    overlay.textContent = message;
    overlay.style.position = 'fixed';
    overlay.style.top = '10px';
    overlay.style.left = '50%';
    overlay.style.transform = 'translateX(-50%)';
    overlay.style.background = isError ? 'rgba(124, 0, 0, 0.8)' : 'rgba(5, 34, 1, 0.8)';
    overlay.style.color = '#fff';
    overlay.style.padding = '8px 16px';
    overlay.style.borderRadius = '6px';
    overlay.style.fontFamily = 'sans-serif';
    overlay.style.fontSize = '14px';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '1';
    overlay.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 500); }, 1500);
}
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function getLink() {
    const url = encodeURI(document.URL);
    const title = escapeHtml(document.title);
    return `<a href="${url}">${title}</a>`

}

function getClipboardItem(html) {
    return new ClipboardItem({ 
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html], { type: 'text/plain' })
    });
}

const converted = getLink();
navigator.clipboard.write([getClipboardItem(converted)])
    .then(() => showOverlayMessage('Copied as Rich Text: "' + converted + '"', false))
    .catch(err => showOverlayMessage('Failed to copy title: ' + err, true));
