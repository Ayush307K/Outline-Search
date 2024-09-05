let activeOutline = null;

document.addEventListener('click', function (event) {
  if (activeOutline) {
    event.preventDefault();
    event.stopPropagation();

    const rect = event.target.getBoundingClientRect();
    const outline = document.createElement('div');
    outline.style.position = 'absolute';
    outline.style.border = '2px solid red';
    outline.style.top = `${rect.top + window.scrollY}px`;
    outline.style.left = `${rect.left + window.scrollX}px`;
    outline.style.width = `${rect.width}px`;
    outline.style.height = `${rect.height}px`;
    document.body.appendChild(outline);

    chrome.runtime.sendMessage({
      type: 'search',
      data: {
        text: event.target.innerText,
        imageSrc: event.target.src || null
      }
    });

    activeOutline = null;
  }
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'start-outline') {
    activeOutline = true;
  } else if (request.type === 'clear-outline') {
    const outlines = document.querySelectorAll('div[style*="solid red"]');
    outlines.forEach(outline => outline.remove());
  }
});
