const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

async function getData(id) {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/${id}');
	const data = await response.json();
	return {
		name: data.name,
		image: data.sprites.other['oficial-artwork'].front_default,
		id: data.id,
		type: data.types[0].type.name
	};
}

async function getData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        id: data.id,
        type: data.types[0].type.name
    };
}

function getBackground(type) {
    return colors[type] || 'La clave no existe';
}

function createPokemon({ name, image, id, type }) {
    const background = getBackground(type);
    const formattedNumber = String(id).padStart(3, '0');

    const contentCard = `
    <div class="pokemon" style="background-color: ${background};">
      <div class="img-container">
        <img src="${image}" alt="${name}">
      </div>
      <div class="info">
        <span class="number">${formattedNumber}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
      </div>
    </div>
  `;

    poke_container.innerHTML += contentCard;
}

async function fetchAndCreatePokemon() {
    const promises = Array.from({ length: pokemon_count }, (_, i) => getData(i + 1));
	//array de promesas llamando a getData para cada número de Pokémon del 1 al pokemon_count//
	//(i+1) llamadas a getData tendrán un rango de 1 a pokemon_count
    const pokemonDataArray = await Promise.all(promises);

    pokemonDataArray.sort((a, b) => a.id - b.id);

    pokemonDataArray.forEach(createPokemon);
    loader.style.display = "none";
}

fetchAndCreatePokemon();



