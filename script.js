const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress');
const playPauseBtn = document.getElementById('playPauseBtn');
const timeDisplay = document.getElementById('timeDisplay');

function seek(event) {
    const percent = event.offsetX / event.target.clientWidth;
    audio.currentTime = percent * audio.duration;
}

function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
    updateTimeDisplay();
}

function updateTimeDisplay() {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateTimeDisplay);
audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶';
});

playPauseBtn.addEventListener('click', togglePlayPause);

