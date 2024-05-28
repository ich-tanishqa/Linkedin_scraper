document.getElementById('scrape').addEventListener('click', () => {
    const links = document.getElementById('links').value.split('\n').filter(Boolean);
    chrome.runtime.sendMessage({ action: 'startScraping', links });
  });
  