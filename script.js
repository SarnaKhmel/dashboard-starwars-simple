const charactersAccount = document.getElementById("personage");
const speciesAccount = document.getElementById("species");
const shipsCounter = document.getElementById("ships");
const vehiclesCounter = document.getElementById("vehicles");
const planetsCounter = document.getElementById("planets");

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

function fillAccount() {
  Promise.all([
    swapiGet("people/"),
    swapiGet("species/"),
    swapiGet("starships/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
  ]).then((result) => {
    charactersAccount.innerHTML = result[0].data.count;
    speciesAccount.innerHTML = result[1].data.count;
    shipsCounter.innerHTML = result[2].data.count;
    vehiclesCounter.innerHTML = result[3].data.count;
    planetsCounter.innerHTML = result[4].data.count;
  });
}

async function fillTable() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  //   console.log(tableData);
  tableData.forEach((film) => {
    $("#filmsTable").append(`
    <tr>
    <td>${film.title}</td>
    <td>${moment(film.release_date).format("DD.MM.YYYY")}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    <td>${film.characters.length}</td>
    <td>${film.species.length}</td>
    <td>${film.starships.length}</td>
    <td>${film.vehicles.length}</td> 
    </tr>`);
  });
}

async function fillPersonageTable() {
  const response = await swapiGet("people/");
  const tableData = response.data.results;
  console.log(tableData);
  tableData.forEach((person) => {
    $("#personageTable").append(`
        <tr>
        <td>${person.name}</td>
        <td>${person.gender}</td>
        <td>${person.birth_year}</td>
        <td>${person.hair_color}</td>
        <td>${person.eye_color}</td>
        <td>${person.mass}</td>
        <td>${person.height}</td>
        </tr>`);
  });
}

fillAccount();
fillTable();
fillPersonageTable();
