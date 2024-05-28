let profileLinks = [];
let currentIndex = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startScraping') {
    profileLinks = message.links;
    currentIndex = 0;
    openNextProfile();
  } else if (message.action === 'profileScraped') {
    currentIndex++;
    if (currentIndex < profileLinks.length) {
      setTimeout(openNextProfile, 3000); // Adjust timeout as needed for accurate data fetching
    } else {
      console.log('All profiles have been processed');
    }
  }
});

function openNextProfile() {
  const profileLink = profileLinks[currentIndex];
  chrome.tabs.create({ url: profileLink }, (tab) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
    });
  });
}
