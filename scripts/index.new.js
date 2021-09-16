







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
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
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
    const attrs = {}
    const eventListeners = { }
    return createElement("div",id,[detailContainer,image],classes,attrs, eventListeners)
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
          return element;
        }
        }
     

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songsList = document.getElementById('songs');
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
