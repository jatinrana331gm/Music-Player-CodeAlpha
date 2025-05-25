let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'images/stay.png',
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        music: 'music/stay.mp3'
    },
    {
        img: 'images/fallingdown.jpg',
        name: 'Falling Down',
        artist: 'Wid Cards',
        music: 'music/fallingdown.mp3'
    },
    {
        img: 'images/faded.png',
        name: 'Faded',
        artist: 'Alan Walker',
        music: 'music/Faded.mp3'
    },
    {
        img: 'images/ratherbe.jpg',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'music/Rather Be.mp3'
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "4 Days", 
        music: "music/4 Days (DjPunjab.Farm).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Mahila Mittar", 
        music: "music/Mahila Mittar 1.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Rao Sahab Drill", 
        music: "music/Rao Sahab Drill_320(PagalWorld).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Russian Bandana", 
        music: "music/Russian Bandana Dhanda Nyoliwala 320 Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Kesariya", 
        music: "https://pagalfree.com/download/128-Kesariya%20-%20Brahmastra%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Apna Bana Le", 
        music: "https://pagalfree.com/download/128-Apna%20Bana%20Le%20-%20Bhediya%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Tera Ban Jaunga", 
        music: "https://pagalfree.com/download/128-Tera%20Ban%20Jaunga%20-%20Kabir%20Singh%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Raataan Lambiyan", 
        music: "https://pagalfree.com/download/128-Raataan%20Lambiyan%20-%20Shershaah%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Dil Dhadakne Do", 
        music: "https://pagalfree.com/download/128-Dil%20Dhadakne%20Do%20-%20Zindagi%20Na%20Milegi%20Dobara%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Galliyan", 
        music: "https://pagalfree.com/download/128-Galliyan%20-%20Ek%20Villain%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Tum Hi Ho", 
        music: "https://pagalfree.com/download/128-Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Agar Tum Saath Ho", 
        music: "https://pagalfree.com/download/128-Agar%20Tum%20Saath%20Ho%20-%20Tamasha%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Ranjha", 
        music: "https://pagalfree.com/download/128-Ranjha%20-%20Shershaah%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Tera Hone Laga Hoon", 
        music: "https://pagalfree.com/download/128-Tera%20Hone%20Laga%20Hoon%20-%20Ajab%20Prem%20Ki%20Ghazab%20Kahani%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Janam Janam", 
        music: "https://pagalfree.com/download/128-Janam%20Janam%20-%20Dilwale%20128%20Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Tum Hi Aana", 
        music: "music/Tum Hi Aana Marjaavaan 128 Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Muqabla", 
        music: "music/Muqabla - Street Dancer 3D 128 Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "What Jhumka", 
        music: "music/What Jhumka_320(PagalWorld.com.se).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Tip Tip", 
        music: "music/Tip Tip Barsa Pani Mp3 Song Sooryavanshi_128-(PagalWorld.uk).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Saat Samundar", 
        music: "music/Saat Samundar Paar Happy Vishwatma 128 Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Baarish Bulao", 
        music: "music/Baarish Bulao_320(PaglaSongs).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Antidote", 
        music: "music/ANTIDOTE - Karan Aujla.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Bandana", 
        music: "music/Bandana - Shubh.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Case", 
        music: "music/Case.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "King Shit", 
        music: "music/King Shit.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Wavy", 
        music: "music/Wavy.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Safety Off", 
        music: "music/Safety Off - Shubh.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "30 Ka Saman", 
        music: "music/30 Ka Saman.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Lamba Lamba Ghunghat", 
        music: "music/Lamba Lamba Ghunghat_320(PagalWorld.com.sb).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Lofar", 
        music: "music/Lofar(PagalNew.Com.Se).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Blender", 
        music: "music/Blender(KoshalWorld.Com).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Pistol Bole Gi", 
        music: "music/Pistol Bole Gi - DjPunjab.Com.Se.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Pistol Sumit Parta", 
        music: "music/Pistol Sumit Parta 320 Kbps.mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Khatole 2", 
        music: "music/Khatole 2 - Masoom Sharma (youtube).mp3" 
    },
    { 
        img: 'https://tse2.mm.bing.net/th?id=OIP.HymWkoyqMG2600aQQIidKgHaFP&pid=Api&P=0&h=180',
        name: "Knife Brows", 
        music: "music/Knife Brows(KoshalWorld.Com).mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/acousticbreeze.jpg',
        name: "Acoustic Breeze", 
        music: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/sunny.jpg',
        name: "Sunny", 
        music: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/creativeminds.jpg',
        name: "Creative Minds", 
        music: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/hey.jpg',
        name: "Hey!", 
        music: "https://www.bensound.com/bensound-music/bensound-hey.mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/energy.jpg',
        name: "Energy", 
        music: "https://www.bensound.com/bensound-music/bensound-energy.mp3" 
    },
    { 
        img: 'https://www.bensound.com/bensound-img/buddy.jpg',
        name: "Buddy", 
        music: "https://www.bensound.com/bensound-music/bensound-buddy.mp3" 
    }
];


            
loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
