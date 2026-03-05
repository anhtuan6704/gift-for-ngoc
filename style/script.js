// Detect iOS for specific optimizations
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Performance monitoring for adaptive optimization
const devicePerformance = {
  isMobile: window.innerWidth <= 480,
  isTablet: window.innerWidth > 480 && window.innerWidth <= 768,
  memory: navigator.deviceMemory || 4,
  cores: navigator.hardwareConcurrency || 2,
  connection: navigator.connection?.effectiveType || '4g'
};

// Detect high-performance device
const isHighPerformance = devicePerformance.memory >= 6 && devicePerformance.cores >= 6;
const isMidPerformance = devicePerformance.memory >= 4 && devicePerformance.cores >= 4;

// iOS Safari specific optimizations - only for animations
if (isIOS) {
  // Force GPU acceleration on iOS for smoother animations
  document.body.style.transform = 'translate3d(0, 0, 0)';
  document.body.style.webkitTransform = 'translate3d(0, 0, 0)';
  document.body.style.webkitBackfaceVisibility = 'hidden';
  document.body.style.webkitPerspective = '1000';
}

const heartsContainer = document.body;
const imageFiles = Array.from(
  { length: 20 },
  (_, i) => `style/img/ngoc (${i + 1}).jpg`,
);

let letterText = [];

async function loadLetter() {
  try {
    const response = await fetch("style/letter.txt");
    const text = await response.text();
    letterText = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p !== "");
  } catch (error) {
    console.error("Error loading letter.txt:", error);
    letterText = ["Mãi yêu em ❤️"];
  }
}

loadLetter();

const songs = [
  {
    title: "Ai Ngoài Anh",
    cover: "style/sound/ngoc (1).jpg",
    src: "style/sound/Ai Ngoài Anh.mp3",
  },
  {
    title: "In Love x Có Đôi Điều",
    cover: "style/sound/ngoc (2).jpg",
    src: "style/sound/In Love x Có Đôi Điều.mp3",
  },
  {
    title: "Track 06 x Nơi Này Có Anh",
    cover: "style/sound/ngoc (3).jpg",
    src: "style/sound/Track 06 x Nơi Này Có Anh.mp3",
  },
  {
    title: "Lỡ Say Bye Là Bye",
    cover: "style/sound/ngoc (4).jpg",
    src: "style/sound/Lỡ Say Bye Là Bye.mp3",
  },
  {
    title: "MISSING YOU",
    cover: "style/sound/ngoc (5).jpg",
    src: "style/sound/MISSING YOU.mp3",
  },
  {
    title: "Anh Là Ai ?",
    cover: "style/sound/ngoc (6).jpg",
    src: "style/sound/Anh là ai.mp3",
  },
];

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const icons = ["❤", "💖", "💗", "💓", "💕", "🌸"];
  const gifs = [
    "https://i.pinimg.com/originals/88/23/82/882382f97862c72e60fc06822e36eb55.gif",
    "https://i.pinimg.com/originals/b9/67/4f/b9674f3f995aba177250894d57f42bbf.gif",
    "https://i.pinimg.com/originals/4e/89/d3/4e89d3e4ec4b1f59b1664e880a875c65.gif",
    "https://i.pinimg.com/originals/b6/6b/1b/b66b1bfe70a9ad4f69dea3b620011222.gif",
  ];

  const isGif = Math.random() > 0.5;

  if (isGif) {
    const img = document.createElement("img");
    img.src = gifs[Math.floor(Math.random() * gifs.length)];
    const gifSize = Math.random() * 30 + 30;
    img.style.width = `${gifSize}px`;
    img.style.height = "auto";
    heart.appendChild(img);
  } else {
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = `${size}px`;
  }

  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 3;
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = opacity;
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, Math.random() * 3000);
}

setInterval(createHeart, 400);

const btnLetter = document.getElementById("btn-letter");
const letterOverlay = document.getElementById("letter-overlay");
const closeLetter = document.getElementById("close-letter");
const letterBody = document.getElementById("letter-body");

let typingInterval;
let paragraphIndex = 0;
let charIndex = 0;
let isTyping = false;

function typeWriter() {
  if (paragraphIndex < letterText.length) {
    isTyping = true;
    let p = letterBody.lastElementChild;
    if (!p || charIndex === 0) {
      p = document.createElement("p");
      if (paragraphIndex === letterText.length - 1) {
        p.classList.add("letter-footer");
      }
      letterBody.appendChild(p);
    }

    p.textContent += letterText[paragraphIndex][charIndex];
    charIndex++;
    letterBody.scrollTop = letterBody.scrollHeight;

    if (charIndex < letterText[paragraphIndex].length) {
      typingInterval = setTimeout(typeWriter, 30);
    } else {
      paragraphIndex++;
      charIndex = 0;
      typingInterval = setTimeout(typeWriter, 500);
    }
  } else {
    isTyping = false;
  }
}

btnLetter.addEventListener("click", () => {
  letterOverlay.classList.add("active");

  if (!isTyping && paragraphIndex < letterText.length) {
    setTimeout(typeWriter, 500);
  }
});

closeLetter.addEventListener("click", () => {
  letterOverlay.classList.remove("active");
  clearTimeout(typingInterval);
  isTyping = false;
});

const btnMusic = document.getElementById("btn-music");
const musicOverlay = document.getElementById("music-overlay");
const closeMusic = document.getElementById("close-music");
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const albumArt = document.querySelector("#album-art img");
const songListContainer = document.getElementById("song-list");

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.innerText = song.title;
  songArtist.style.display = "none";
  albumArt.src = song.cover;
  audioPlayer.src = song.src;
  updateSongListUI();
}

function updateSongListUI() {
  const items = document.querySelectorAll(".song-item");
  items.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function playSong() {
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audioPlayer.play();
  console.log("Bản quyền thuộc về Dr.Gifter");
  console.log("Tiktok: https://www.tiktok.com/@dr.gifter306");
  console.log("Github: https://github.com/DrGifter");
}

function pauseSong() {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audioPlayer.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// Populate Song List
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.classList.add("song-item");
  item.innerHTML = `
    <img src="${song.cover}" alt="${song.title}">
    <div class="song-item-info">
      <div class="song-item-title">${song.title}</div>
    </div>
  `;
  item.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  songListContainer.appendChild(item);
});

const btnImage = document.getElementById("btn-image");
const imageOverlay = document.getElementById("image-overlay");
const closeImage = document.getElementById("close-image");
const galleryTop = document.getElementById("gallery-top");
const galleryBottom = document.getElementById("gallery-bottom");
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");

function populateGallery() {
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
  
  // Optimal number of images for smooth scrolling
  const topImages = imageFiles.slice(0, 10);
  const bottomImages = imageFiles.slice(10);

  const createImg = (src) => {
    const img = document.createElement("img");
    img.alt = "Gallery Image";
    img.draggable = false;
    
    // Force eager loading for smooth experience
    img.loading = "eager";
    img.decoding = "async"; // Non-blocking decode
    
    // Optimize image rendering
    if (isMobile) {
      img.style.imageRendering = "-webkit-optimize-contrast";
    }
    
    // Set src immediately for faster load
    img.src = src;
    
    // Error handling
    img.addEventListener("error", () => {
      img.style.display = "none";
    }, { once: true, passive: true });
    
    // Prevent context menu on mobile
    if (isMobile) {
      img.addEventListener("contextmenu", (e) => e.preventDefault(), { passive: false });
    }
    
    // Optimized touch handling
    let tapStartTime;
    let tapStartY;
    
    img.addEventListener("touchstart", (e) => {
      tapStartTime = performance.now();
      tapStartY = e.touches[0].clientY;
    }, { passive: true });
    
    img.addEventListener("touchend", (e) => {
      const tapDuration = performance.now() - tapStartTime;
      const currentY = e.changedTouches[0].clientY;
      const moveDistance = Math.abs(currentY - tapStartY);
      
      // Only trigger if quick tap with minimal movement
      if (tapDuration < 200 && moveDistance < 10) {
        e.preventDefault();
        requestAnimationFrame(() => openLightbox(src));
      }
    }, { passive: false });
    
    img.addEventListener("click", (e) => {
      if (!isMobile) {
        e.stopPropagation();
        requestAnimationFrame(() => openLightbox(src));
      }
    }, { passive: true });
    
    return img;
  };

  // Use document fragment for batch DOM operations
  const topFragment = document.createDocumentFragment();
  const bottomFragment = document.createDocumentFragment();
  
  // Duplicate for seamless loop
  for (let i = 0; i < 2; i++) {
    topImages.forEach((src) => topFragment.appendChild(createImg(src)));
  }
  for (let i = 0; i < 2; i++) {
    bottomImages.forEach((src) => bottomFragment.appendChild(createImg(src)));
  }
  
  // Clear and append in single RAF for smooth rendering
  requestAnimationFrame(() => {
    galleryTop.innerHTML = "";
    galleryBottom.innerHTML = "";
    galleryTop.appendChild(topFragment);
    galleryBottom.appendChild(bottomFragment);
    
    // Force composite layer on iOS
    if (isIOS) {
      void galleryTop.offsetHeight;
      void galleryBottom.offsetHeight;
    }
  });
}

function openLightbox(src) {
  lightboxImg.classList.add('loading');
  lightboxImg.src = src;
  lightboxImg.onload = () => {
    lightboxImg.classList.remove('loading');
  };
  lightboxOverlay.classList.add("active");
  
  // Prevent body scroll on mobile
  if (window.innerWidth <= 480) {
    document.body.style.overflow = 'hidden';
  }
}

function closeLightboxFunc() {
  lightboxOverlay.classList.remove("active");
  document.body.style.overflow = '';
}

closeLightbox.addEventListener("click", () => {
  closeLightboxFunc();
});

lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) closeLightboxFunc();
});

function makeDraggable(element) {
  let isDown = false;
  let touchStartTime;
  let animationFrameId;

  const pauseAnimations = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
      element.classList.add('paused');
      const rows = element.querySelectorAll('.gallery-row');
      rows.forEach(row => {
        row.style.animationPlayState = 'paused';
      });
    });
  };

  const resumeAnimations = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
      element.classList.remove('paused');
      const rows = element.querySelectorAll('.gallery-row');
      rows.forEach(row => {
        row.style.animationPlayState = 'running';
      });
    });
  };

  // Mouse events
  element.addEventListener("mousedown", (e) => {
    isDown = true;
    element.style.cursor = "grabbing";
    pauseAnimations();
  }, { passive: true });

  window.addEventListener("mouseup", () => {
    if (isDown) {
      isDown = false;
      element.style.cursor = "grab";
      resumeAnimations();
    }
  }, { passive: true });

  element.addEventListener("mouseleave", () => {
    if (isDown) {
      isDown = false;
      resumeAnimations();
    }
  }, { passive: true });

  // Touch events - optimized for 60fps
  element.addEventListener("touchstart", (e) => {
    touchStartTime = performance.now();
    pauseAnimations();
  }, { passive: true });

  element.addEventListener("touchend", () => {
    const touchDuration = performance.now() - touchStartTime;
    // Instant resume for quick taps (< 150ms)
    if (touchDuration < 150) {
      requestAnimationFrame(resumeAnimations);
    } else {
      // Smooth delayed resume for long touches
      requestAnimationFrame(() => {
        setTimeout(resumeAnimations, 80);
      });
    }
  }, { passive: true });

  element.addEventListener("touchcancel", () => {
    resumeAnimations();
  }, { passive: true });
}

btnImage.addEventListener("click", () => {
  // Use RAF for smooth transition
  requestAnimationFrame(() => {
    populateGallery();
    
    requestAnimationFrame(() => {
      imageOverlay.classList.add("active");
      
      // Enable touch interactions
      const galleryContainer = document.querySelector('.gallery-container');
      if (galleryContainer) {
        makeDraggable(galleryContainer);
      }
      
      // Force composite layers on mobile for smooth animation
      if (window.innerWidth <= 480) {
        const rows = document.querySelectorAll('.gallery-row');
        rows.forEach(row => {
          row.style.transform = 'translateZ(0)';
        });
      }
    });
  });
});

const btnGift = document.getElementById("btn-gift");
const giftOverlay = document.getElementById("gift-overlay");
const closeGift = document.getElementById("close-gift");
const fullscreenGiftBtn = document.getElementById("fullscreen-gift");
const giftModalElement = document.getElementById("gift-modal-element");

const giftIframe = document.querySelector(".gift-iframe");

btnGift.addEventListener("click", () => {
  if (giftIframe) {
    giftIframe.src = giftIframe.src;
  }
  giftOverlay.classList.add("active");
});

closeGift.addEventListener("click", () => {
  giftOverlay.classList.remove("active");
});

fullscreenGiftBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (giftModalElement.requestFullscreen) {
      giftModalElement.requestFullscreen();
    } else if (giftModalElement.webkitRequestFullscreen) {
      giftModalElement.webkitRequestFullscreen();
    } else if (giftModalElement.msRequestFullscreen) {
      giftModalElement.msRequestFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

closeImage.addEventListener("click", () => {
  imageOverlay.classList.remove("active");
  document.body.style.overflow = '';
});

imageOverlay.addEventListener("click", (e) => {
  if (e.target === imageOverlay) {
    imageOverlay.classList.remove("active");
    document.body.style.overflow = '';
  }
});

btnMusic.addEventListener("click", () => musicOverlay.classList.add("active"));
closeMusic.addEventListener("click", () => {
  musicOverlay.classList.remove("active");
});

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", nextSong);
progressBar.addEventListener("click", setProgress);

// Global Click Pop Sound
const popSound = document.getElementById("pop-sound");
window.addEventListener("click", () => {
  if (popSound) {
    const sound = popSound.cloneNode();
    sound.play();
  }
}, true);


loadSong(songs[songIndex]);

const lockScreen = document.getElementById("lock-screen");
const mainContent = document.getElementById("main-content");
const passDots = document.querySelectorAll(".dot");
const numBtns = document.querySelectorAll(".num-btn[data-value]");
const deleteBtn = document.querySelector(".num-btn.delete-btn");

let enteredPin = "";
const correctPin = "0803";

function updateDots() {
  passDots.forEach((dot, index) => {
    if (index < enteredPin.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function handleInput(num) {
  if (!lockScreen || lockScreen.classList.contains("unlocked")) return;

  if (enteredPin.length < 4) {
    enteredPin += num;
    updateDots();

    if (enteredPin.length === 4) {
      setTimeout(checkPin, 300);
    }
  }
}

function checkPin() {
  if (enteredPin === correctPin) {
    unlock();
  } else {
    fail();
  }
}

function unlock() {
  lockScreen.classList.add("unlocked");
  mainContent.classList.remove("main-content-hidden");
  mainContent.classList.add("main-content-visible");
  enteredPin = "";
  updateDots();
}

function fail() {
  const dotsContainer = document.getElementById("pass-dots");
  dotsContainer.classList.add("shake");

  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  setTimeout(() => {
    dotsContainer.classList.remove("shake");
    enteredPin = "";
    updateDots();
  }, 500);
}

function deleteLastDigit() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
  }
}

if (numBtns) {
  numBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      handleInput(btn.getAttribute("data-value"));
    });
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteLastDigit();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lockScreen || lockScreen.classList.contains("unlocked")) return;

  if (e.key >= "0" && e.key <= "9") {
    handleInput(e.key);
  } else if (e.key === "Backspace") {
    deleteLastDigit();
  }
});

const resetLockBtn = document.getElementById("btn-reset-lock");
if (resetLockBtn) {
  resetLockBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

// Performance optimizations for mobile
if (window.innerWidth <= 480) {
  // Optimize rendering
  document.body.style.setProperty('pointer-events', 'auto');
  
  // Force hardware acceleration on key elements
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 480px) {
      .gallery-row {
        transform: translate3d(0, 0, 0) !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Optimize viewport on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => window.scrollTo(0, 1), 100);
  }, { passive: true });
  
  // Aggressive image preloading for smooth experience
  setTimeout(() => {
    const fragment = document.createDocumentFragment();
    imageFiles.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      fragment.appendChild(link);
    });
    document.head.appendChild(fragment);
  }, 1000);
  
  // Disable momentum scrolling on iOS for gallery
  if (isIOS) {
    document.addEventListener('DOMContentLoaded', () => {
      const overlays = document.querySelectorAll('.overlay');
      overlays.forEach(overlay => {
        overlay.style.webkitOverflowScrolling = 'auto';
      });
    });
  }
}

// Throttle function for performance
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}

// Debounce function for resize events
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Optimize scroll performance
if ('scrollBehavior' in document.documentElement.style) {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Detect device performance tier
const getDevicePerformance = () => {
  const memory = navigator.deviceMemory || 4; // GB
  const cores = navigator.hardwareConcurrency || 2;
  
  if (memory >= 6 && cores >= 6) return 'high';
  if (memory >= 4 && cores >= 4) return 'medium';
  return 'low';
};

// Adjust animation speed based on device performance
if (window.innerWidth <= 480) {
  const perfTier = getDevicePerformance();
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    if (perfTier === 'low') {
      style.textContent = `
        @media (max-width: 480px) {
          .row-top { animation-duration: 25s !important; }
          .row-bottom { animation-duration: 25s !important; }
        }
      `;
    } else if (perfTier === 'medium') {
      style.textContent = `
        @media (max-width: 480px) {
          .row-top { animation-duration: 22s !important; }
          .row-bottom { animation-duration: 22s !important; }
        }
      `;
    }
    if (style.textContent) document.head.appendChild(style);
  });
}

