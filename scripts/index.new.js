    
function playlistDuration(id) {
    let duration = 0
    const playlist =  player.playlists.find( (playlist) => playlist.id === id);
    playlist.songs.forEach((songId) =>{
      duration += player.songs.find((song) => song.id === songId).duration
  
    })
     return duration;
  }

  function durationFormat (secDuration) {

    let seconds = secDuration % 60;
    const fomatedSec = seconds.toString().length === 1 ? "0" + seconds : seconds;
  
    let minutes = Math.floor(secDuration / 60);
    const fomatedMin = minutes.toString().length === 1 ? "0" + minutes : minutes;
  
    return (fomatedMin + ":" + fomatedSec);
  }

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    document.getElementById(songId).className = "played";
}


/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    song = document.getElementById(songId)
        song.remove()
    player.songs = player.songs.filter( (song) => song.id !== songId);
    player.playlists = player.playlists.map((playlist) => {
      return {
        ...playlist,
        songs: playlist.songs.filter((song) => song !== songId)
      };
  
    });
    
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    let maxId = 0;
   player.songs.forEach((song) => {
    maxId = Math.max(song.id,maxId);     
   })

  const newId = id ?? maxId + 1;
  player.songs = [
    ...player.songs,
    createSongElement({ newId, title, album, artist, duration, coverArt })
  ];
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    if(event.target.id === "playButton"){
        let songId = event.target.closest(".song").id;
        playSong(songId)
    }else if((event.target.id==="removeButton")){
        let songId = event.target.closest(".song").id;
        removeSong(songId)
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {

   if(event.target.id==="add-button"){
    let [title] = document.getElementsByName("title");
    let [album] = document.getElementsByName("album");
    let [artist] = document.getElementsByName("artist");
    let [duration] = document.getElementsByName("duration");
    let [coverArt] = document.getElementsByName("cover-art");
        const newSong= createSongElement({id: title.value, title: title.value,album: album.value,artist: artist.value,duration: duration.value,coverArt: coverArt.value })
        const songsList = document.getElementById('songs');
        songsList.appendChild(newSong)
   }
       

      
}

/**
 * Creates a song DOM element based on a song object.
 */

 function createSongElement({ id, title, album, artist, duration, coverArt }) {

    const titleEl = createElement('span',[`title ; ${title}`])
    const albumEl = createElement('span',[`Album: ${album}`])
    const artistEl = createElement('span',[`Artist: ${artist}`])
    const durEl = createElement('span',[`Duration: ${durationFormat(duration)}`])

    const playButton = document.createElement("BUTTON");
    playButton.classList.add("element")
    playButton.innerText = "▶";
    playButton.id = "playButton"
    const removeButton = document.createElement("BUTTON");
    removeButton.classList.add("element")
    removeButton.innerText = "🚮";
    removeButton.id = "removeButton"
    

    const image = createElement('img', [], [], {src: coverArt})
    
    const detailContainer = createElement('div',[durEl,artistEl,albumEl,titleEl,playButton,removeButton] , ['detail'])
   
    const classes = ['song']
    const attrs = {}
    const eventListeners = {}
    let songObject = createElement("div",[detailContainer,image],classes,attrs, eventListeners);
    songObject.id=id;
    return songObject
   
}
// function createSongElement({ id, title, album, artist, duration, coverArt }) {
//     const titleEl = createElement('span',[`title ; ${title}`])
//     const albumEl = createElement('span',[`Album: ${album}`])
//     const artistEl = createElement('span',[`Artist: ${artist}`])
//     const durEl = createElement('span',[`Duration: ${durationFormat(duration)}`])

//     const image = createElement('img', [], [], {src: coverArt})
    
//     const detailContainer = createElement('div',[durEl,artistEl,albumEl,titleEl] , ['detail'])
//     const classes = ['song']
//     const attrs = { onclick: `playSong(${id})`}
//     let obj = createElement("div",[detailContainer,image],classes,attrs);
//     obj.id=id;
//     return obj
// }
/**
 * Creates a playlist DOM element based on a playlist object.
 */
 
function createPlaylistElement({ id, name, songs }) {
    const idEl = createElement('span',[`id: ${id}`])
    const nameEl = createElement('span',[`name: ${name}`])
    const songsEl = createElement('span',[`songs: ${songs.length}`])
    const durationEL = createElement('span',[`duration:${durationFormat (playlistDuration(id))} `])
    const playButton = document.createElement("BUTTON");
    playButton.classList.add("element")
    playButton.innerText = "▶";
    playButton.id = "playButton"
    const detailContainer = createElement('div',[idEl,nameEl,songsEl,durationEL] , ['detail'])
    let obj = createElement("div",[detailContainer]);
    obj.id=id;
    const classes = ["playList"]
    const attrs = {}
    const eventListeners = {}
    return createElement("div", [detailContainer], classes, attrs, eventListeners)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const element = document.createElement(tagName);

    children.forEach(child => element.append(child));

    classes.forEach(clls => element.classList.add(clls));

    for(let key in attributes) {
          element.setAttribute(key, attributes[key]);

          for (const [key, value] of Object.entries(eventListeners)) {
            console.log(`${key}: ${value}`);
            element.addEventListener(key, value)
         }
        }
     return element;
}
     

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songsList = document.getElementById('songs');
    player.songs.sort((a,b) => a.title.localeCompare(b.title)) 
    player.songs.forEach((song) => {
        const songElment = createSongElement(song);
        
        songsList.appendChild(songElment);
    })
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    const playlistsList = document.getElementById('playlists');
    player.playlists.forEach((playlist) => {
        const playlistElment = createPlaylistElement(playlist);
    
        playlistsList.appendChild(playlistElment);
    })
}
// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
document.getElementById("songs").addEventListener("click",handleSongClickEvent)


