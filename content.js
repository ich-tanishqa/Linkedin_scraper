(async function() {
  // Wait for the page to fully load
  await new Promise(resolve => setTimeout(resolve, 10000)); // Increase timeout for accurate data fetching

  // Extract profile data using appropriate selectors
  const nameElement = document.querySelector('.text-heading-xlarge') || document.querySelector('.inline.t-24.t-black.t-normal.break-words');
  const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words') || document.querySelector('.pv-top-card--list-bullet li');
  const aboutElement = document.querySelector('.pv-about-section .pv-about__summary-text');
  const bioElement = document.querySelector('.pv-about__summary-text') || document.querySelector('.pv-top-card-section__summary-text') || document.querySelector('.lt-line-clamp__more');
  const followerCountElement = document.querySelector('.pv-recent-activity-section-v2 .artdeco-container-card-action-bar .display-flex .pv-recent-activity-section__follower-count') || document.querySelector('.pv-top-card--list-bullet li:nth-child(2)');
  const connectionCountElement = document.querySelector('.pv-recent-activity-section-v2 .artdeco-container-card-action-bar .display-flex .pv-recent-activity-section__connection-count') || document.querySelector('.pv-top-card--list-bullet li:nth-child(1)');

  const name = nameElement ? nameElement.innerText.trim() : null;
  const location = locationElement ? locationElement.innerText.trim() : null;
  const about = aboutElement ? aboutElement.innerText.trim() : null;
  const bio = bioElement ? bioElement.innerText.trim() : null;

  let followerCount = 0;
  if (followerCountElement) {
      const followerCountText = followerCountElement.innerText.trim();
      const match = followerCountText.match(/\d+/);
      followerCount = match ? parseInt(match[0], 10) : 0;
  }

  let connectionCount = 0;
  if (connectionCountElement) {
      const connectionCountText = connectionCountElement.innerText.trim();
      const match = connectionCountText.match(/\d+/);
      connectionCount = match ? parseInt(match[0], 10) : 0;
  }

  const profileData = {
      name,
      url: window.location.href,
      about,
      bio,
      location,
      followerCount,
      connectionCount,
  };

  try {
      const response = await fetch('http://localhost:3000/api/profiles', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
      });
      const data = await response.json();
      console.log('Profile saved:', data);
  } catch (error) {
      console.error('Error saving profile:', error);
  }

  chrome.runtime.sendMessage({ action: 'profileScraped' });
})();