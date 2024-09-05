chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'search') {
      const { text, imageSrc } = message.data;
  
      if (text) {
        const query = encodeURIComponent(text);
        const searchUrl = `https://www.google.com/search?q=${query}`;
        chrome.tabs.create({ url: searchUrl });
      } else if (imageSrc) {
        const searchUrl = `https://www.google.com/searchbyimage?image_url=${imageSrc}`;
        chrome.tabs.create({ url: searchUrl });
      }
    }
  });
  