const promptInput = document.getElementById('promptInput');
const enterButton = document.getElementById('enterButton');
const videoContainer = document.querySelector('.video-container');
const videoPlayer = document.getElementById('videoPlayer');
const loader = document.getElementById('loader');

enterButton.addEventListener('click', () => {
  const prompt = promptInput.value.trim().toLowerCase();
  if (prompt.length === 0) {
    alert("Please enter a prompt!");
    return;
  }

  loader.style.display = 'block';
  setTimeout(() => {
    loader.style.display = 'none';
    const videoURL = "/assets/Flame.mp4"; // Replace with appropriate path
    videoPlayer.src = videoURL;
    videoPlayer.onloadedmetadata = () => {
      videoContainer.classList.add('visible');
      videoPlayer.play(); // This will autoplay immediately.

      // Add event listener to prevent autoplay interruption:
      videoPlayer.addEventListener('ended', () => {
        videoPlayer.currentTime = 0;  // Rewind to the beginning
        videoPlayer.play(); // Start playback again immediately
      });
    };
    videoPlayer.onerror = (error) => {
      console.error("Error loading video:", error);
      alert("Error loading video. Check file name and path.");
      videoContainer.classList.remove('visible'); // Hide if error occurs
      loader.style.display = 'none'; // Hide loader
    };
  }, 4000); // 4-second delay

});

promptInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    enterButton.click();
  }
});