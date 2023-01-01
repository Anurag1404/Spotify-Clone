// Variables
let songIndex = 0;
let audioElement = new Audio("./Songs/1.mp3");
const masterPlay = document.querySelector("#masterPlay");
const myProgressBar = document.querySelector("#myProgressBar");
const gif = document.querySelector("#gif");
const masterSongName = document.querySelector("#masterSongName");
const songItems = Array.from(document.getElementsByClassName("songItem"));
const songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const songBanner = document.querySelector('.songBanner');

let songs = [
    {
        songName: "90s Love Mashup",
        filePath: "./Songs/1.mp3",
        coverPath: "./Covers/90s-cover.jpg",
        duration: "05:18"
    },
    {
        songName: "A R Rahman Mashup",
        filePath: "./Songs/2.mp3",
        coverPath: "./Covers/ar-cover.jpg",
        duration: "05:29"
    },
    {
        songName: "Arijit Singh Mashup",
        filePath: "./Songs/3.mp3",
        coverPath: "./Covers/arijit-cover.jpg",
        duration: "05:13"
    },
    {
        songName: "Atif x Arijit Mashup",
        filePath: "./Songs/4.mp3",
        coverPath: "./Covers/atif-arijit-cover.jpg",
        duration: "05:17"
    },
    {
        songName: "Atif Aslam Mashup",
        filePath: "./Songs/5.mp3",
        coverPath: "./Covers/atif-cover.jpg",
        duration: "05:16"
    },
    {
        songName: "Darshan Raval Mashup",
        filePath: "./Songs/6.mp3",
        coverPath: "./Covers/darshan-cover.jpg",
        duration: "04:01"
    },
    {
        songName: "Falling For You Mashup",
        filePath: "./Songs/7.mp3",
        coverPath: "./Covers/falling-cover.jpg",
        duration: "04:45"
    },
    {
        songName: "Punjabi Love Mashup",
        filePath: "./Songs/8.mp3",
        coverPath: "./Covers/punjabi-cover.jpg",
        duration: "04:01"
    },
    {
        songName: "Retro Mashup",
        filePath: "./Songs/9.mp3",
        coverPath: "./Covers/retro-cover.jpg",
        duration: "04:09"
    },
    {
        songName: "Shershaah x Kabir Singh Mashup",
        filePath: "./Songs/10.mp3",
        coverPath: "./Covers/shershaah-cover.jpg",
        duration: "04:56"
    }
]

songItems.forEach((songItem, index) => {
    songItem.querySelectorAll('img')[0].src = songs[index].coverPath;
    songItem.querySelectorAll('.songName')[0].innerText = songs[index].songName;
    songItem.querySelectorAll('.timestamp')[0].innerText = songs[index].duration;
})


// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener("timeupdate", () => {
    // update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    if(progress === 100) {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    } else {
        null;
    }
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {       
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

next.addEventListener("click", () => {
    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `Songs/${songIndex + 1}.mp3`; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songBanner.src = songs[songIndex].coverPath;   
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
})

previous.addEventListener("click", () => {
    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `Songs/${songIndex + 1}.mp3`;         
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName; 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songBanner.src = songs[songIndex].coverPath;
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');  
})

masterPlay.addEventListener("click", () =>{
    if(masterPlay.classList.contains('fa-circle-play')) {
        songItemPlay[songIndex].classList.add('fa-circle-play');
        songItemPlay[songIndex].classList.remove('fa-circle-pause');
    } else {
        songItemPlay[songIndex].classList.add('fa-circle-pause');
        songItemPlay[songIndex].classList.remove('fa-circle-play');
    }
})



