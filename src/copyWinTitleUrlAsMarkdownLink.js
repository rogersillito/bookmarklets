function showOverlayMessage(message, isError) {
    const overlay = document.createElement('div');
    overlay.textContent = message;
    overlay.style.position = 'fixed';
    overlay.style.top = '10px';
    overlay.style.left = '50%';
    overlay.style.transform = 'translateX(-50%)';
    overlay.style.background = isError ? 'rgba(124, 0, 0, 0.8)' : 'rgba(7, 4, 48, 0.8)';
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
function escapeForMarkdown(unsafe) {
  return unsafe.replace(/[\[\]\(\)]/g, '\\$&'); 
}
function getMarkdownToCopy() {
    const url = escapeForMarkdown(document.URL);
    const title = escapeForMarkdown(document.title);
    return `[${title}](${url})`;
}
const converted = getMarkdownToCopy();
navigator.clipboard.writeText(converted)
    .then(() => showOverlayMessage('Copied as Markdown: "' + converted + '"', false))
    .catch(err => showOverlayMessage('Failed to copy title: ' + err, true));
