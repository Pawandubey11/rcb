const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=60",
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=600&q=60",
  },
  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover:
      "https://images.unsplash.com/photo-1508747703725-719a30a2b6c7?w=600&q=60",
  },
];

const songList = document.getElementById("songList");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");

let audio = new Audio();
let currentSong = 0;
let isPlaying = false;

// Load songs
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.classList.add("song");
  div.innerHTML = `
    <img src="${song.cover}" alt="cover">
    <h3>${song.title}</h3>
    <p>${song.artist}</p>
  `;
  div.addEventListener("click", () => loadSong(index));
  songList.appendChild(div);
});

function loadSong(index) {
  const song = songs[index];
  currentSong = index;
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  playSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) pauseSong();
  else playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});
