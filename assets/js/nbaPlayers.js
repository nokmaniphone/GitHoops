
//for ajax request to mysportsfeeds api
let url = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2019-2020-regular/active_players.json';
let username = '1f8e90ca-f858-4d60-9055-701d03';
let password = 'nbagames';

let headers = new Headers();

headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

// array containing all active nba players
let currentPlayers = JSON.parse(localStorage.getItem('players'))  || [];

//AJAX to populate array of current players
fetch(url, {
  method: 'GET',
  headers: headers,

})
  .then(response => response.json())
  .then( ({activeplayers}) => {
    
  for (let k = 0; k < activeplayers.playerentry.length; k++ ){
    
    // add all the current nba players to an array
    currentPlayers.push((activeplayers.playerentry[k].player.FirstName).toLowerCase() + ' ' + (activeplayers.playerentry[k].player.LastName).toLowerCase());
  } 
    if (currentPlayers.length > activeplayers.playerentry.length){
      return;
    }
    localStorage.setItem('players', JSON.stringify(currentPlayers));
  })
  .catch(e => console.error(e));
