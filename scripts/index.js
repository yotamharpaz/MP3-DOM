/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


 function playSong(songId) {
    let playedSong = document.getElementsByClassName("played")
    if( playedSong.length > 0) playedSong[0].className = "notPlayed";
    document.getElementById(songId).className = "played";

}




/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEl = createElement('span',[`title ; ${title}`])
    const albumEl = createElement('span',[`Album: ${album}`])
    const artistEl = createElement('span',[`Artist: ${artist}`])
    const durEl = createElement('span',[`Duration: ${durationFormat(duration)}`])

    const image = createElement('img', [], [], {src: coverArt})
    
    const detailContainer = createElement('div',[durEl,artistEl,albumEl,titleEl] , ['detail'])
    const classes = ['song']
    const attrs = { onclick: `playSong(${id})`}
    let obj = createElement("div",[detailContainer,image],classes,attrs);
    obj.id=id;
    return obj
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const idEl = createElement('span',[`id: ${id}`])
    const nameEl = createElement('span',[`name: ${name}`])
    const songsEl = createElement('span',[`songs: ${songs}`])
    const durationEL = createElement('span',[`duration:${durationFormat (playlistDuration(id))} `])
    const detailContainer = createElement('div',[idEl,nameEl,songsEl,durationEL] , ['detail'])
    let obj = createElement("div",[detailContainer]);
    obj.id=id;
    const classes = []
    const attrs = {}

    return obj

}

/**
 * Creates a new DOM element.

 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
   const element = document.createElement(tagName);
   children.forEach(child => element.append(child));


    classes.forEach(clls => element.classList.add(clls));

    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    console.log(element);
    return element;
   
}


const songsList = document.getElementById('songs');
const playlistsList = document.getElementById('playlists');

player.songs.forEach((song) => {
    const songElment = createSongElement(song);
    
    songsList.appendChild(songElment);
})

player.playlists.forEach((playlist) => {
    const playlistElment = createPlaylistElement(playlist);

    playlistsList.appendChild(playlistElment);
})


function durationFormat (secDuration) {

    let seconds = secDuration % 60;
    const fomatedSec = seconds.toString().length === 1 ? "0" + seconds : seconds;
  
    let minutes = Math.floor(secDuration / 60);
    const fomatedMin = minutes.toString().length === 1 ? "0" + minutes : minutes;
  
    return (fomatedMin + ":" + fomatedSec);
  }
  function playlistDuration(id) {
    let duration = 0
    const playlist =  player.playlists.find( (playlist) => playlist.id === id);
    playlist.songs.forEach((songId) =>{
      duration += player.songs.find((song) => song.id === songId).duration
  
    })
     return duration;
  }
