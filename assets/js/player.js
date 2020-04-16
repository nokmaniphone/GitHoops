
// get search value from local storage
let searchVal = localStorage.getItem('search') || '';

//get value from redirect
let search = (localStorage.getItem('search')).split(" ");

//render player page 
function searchPlayer(strFirst, strLast) {
  fetch('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=' + strFirst + '%20' + strLast)
    .then(r => r.json())
    .then(({ player }) => {

      document.getElementById('playerPhoto').innerHTML = `
            <img class="playerCardImg" src="${player[0].strCutout}">
        `
      document.getElementById('team').innerHTML = `
            <strong>Team: </strong>${player[0].strTeam}
        `
      document.getElementById('birthday').innerHTML = `
            <strong>Birthday: </strong>${player[0].dateBorn}
        `
      document.getElementById('hometown').innerHTML = `
            <strong>Hometown: </strong>${player[0].strBirthLocation}
        `
      document.getElementById('height').innerHTML = `
            <strong>Height: </strong>${player[0].strHeight}
        `
      document.getElementById('weight').innerHTML = `
            <strong>Weight: </strong>${player[0].strWeight}
        `
      document.getElementById('playerName').innerHTML = `
            <h2>${player[0].strPlayer}<h2>
        `
      document.getElementById('bio').innerHTML = `
            ${player[0].strDescriptionEN}
        `
    })
    .catch(e => console.error(e));
}

// to render players on redirect
searchPlayer(search[0], search[1]);

//search bar redirect
document.getElementById('searchBtn').addEventListener("click", event => {
  event.preventDefault();
  searchVal = document.getElementById("searchBar").value.toLowerCase();

  //check if anything has been typed
  if ((searchVal === '')) {
    document.getElementById('searchBar').focus();
  }
  else {
    localStorage.setItem('search', searchVal);

    //change page to player page if name is in array of players
    if (!(nbaTeamNames.includes(searchVal)) && (currentPlayers.includes(searchVal))) {
      //split name for ajax request
      let splitName = searchVal.split(" ");

      localStorage.setItem('player', splitName);

      window.location.replace('./player.html')
    } else if (nbaTeamNames.includes(searchVal)) {

      // if team name doesn't include city, go back to previous index with city
      if (!((nbaTeamNames.indexOf(searchVal)) % 2 === 0)) {
        searchVal = nbaTeamNames[(nbaTeamNames.indexOf(searchVal) - 1)];
        localStorage.setItem('search', searchVal);
      }
      window.location.replace('./team.html');
    }
    document.getElementById('searchBar').value = '';
  }
});

//for mobile navbar drop
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, 'left');
});