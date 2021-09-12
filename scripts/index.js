/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    
    
}




/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [`Title: ${title}`, `Album: ${album}`, `Artist: ${artist}`, `Duration: ${durationFormat(duration)}`, coverArt]
    const classes = ['song']
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [`id: ${id}`, `name: ${name}`, `songs: ${songs}`]
    const classes = []
    const attrs = {}
    const ul = document.createElement('ul')

    return createElement("div", children, classes, attrs)
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

   // append children to elemnet
   //children.forEach((child) => element.appendChild(child));
   element.append(children)

   // add classes to element
    classes.forEach(clls => element.classList.add(clls));

    // set the attrbutes to the elenment
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    return element;
}


const songsList = document.getElementById('songs');
const playlistsList = document.getElementById('playlists');

player.songs.forEach((song) => {
    const songElment = createSongElement(song);
    
    songsList.appendChild(songElment);
    const image = createElement('img')
    image.setAttribute("src",song.coverArt)
    songElment.append(image);
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