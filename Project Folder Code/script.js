//Bygga enkla element "Search" Textruta, text under.
//lyssnare för klick på submit
//hämta från https://pokeapi.co/api/v2/pokemon karaktärinfo
//specifiera karaktärinfo
//presentera olika attribut av pokemonet
//presentationerna i form av <h1> = karaktärsnamn, <p> attribut <br> <p> osv

//skapar body
let body = document.createElement('div');
body.className = 'innehåll';
 
/*skapar knapp för sökning, ger den ett klassnamn,
 på den står det sök. Lägger en lyssnare på den som kallar på funktionen framställPokemon*/
let knapp = document.createElement("button");
knapp.className = "submit-knapp";
knapp.textContent = "Sök";
knapp.addEventListener("click", framställPokemon);

//Skapar sökfältet som en input, med typen search.
let sökFält = document.createElement("input");
sökFält.type = "Search";
sökFält.className="sök-fält";
sökFält.placeholder = "Search for Pokemon";
document.body.appendChild(sökFält);
document.body.appendChild(knapp);

//skapar p element för error meddelandet som aktiveras vid catch
let errorMeddelande = document.createElement('p');
errorMeddelande.textContent = "";
errorMeddelande.className="error-msg";
document.body.appendChild(errorMeddelande);

//skapar ett img element som är tomt tills data.sprites.front_default fetchas
let pokemonBildElement = document.createElement('img');
    pokemonBildElement.className="pokemon-bild";
    pokemonBildElement.src = "";
    document.body.appendChild(pokemonBildElement);
//Här skrivs pokemon namnet ut på denna h2 tagg.
    let pokemonNamn = document.createElement('h2');
    pokemonNamn.className="karaktär-namn";
    let namnTitel = pokemonNamn.textContent="Namn: ";
    document.body.appendChild(pokemonNamn);
//på det här p elementet skrivs pokemonets typ ut, den datan hämtas ifrån Json, på pokemon api:n.
    let pokemonTyp = document.createElement('p');
    pokemonTyp.className="karaktär-typ";
    let typElement = pokemonTyp.textContent="Typ: ";
    document.body.appendChild(pokemonTyp);
   //i det här p elementet skrivs karaktärers "abilites" ut.
    let förmågor = document.createElement('p');
    förmågor.className="karaktär-förmåga";
    //de förmågor de har vid låg level innan de levlas upp
    let förmågaElement = förmågor.textContent="Första Förmågorna/kvalitéer: ";
    document.body.appendChild(förmågor);
   

//en asynkron funktion där fetching och framställande av info om pokemon sker.
async function framställPokemon(event){
//try catch block för validering
    try {
        //förhindra standardbeteende vid fel
    event.preventDefault();
//sökfältets värde dvs text som skickas deklareras som en const. innan jag la .toLowerCase() metoden kunde den ej hitta pokemon om första bokstaven var stor.
    const pokemon = sökFält.value.toLowerCase();
    errorMeddelande.textContent = "";
//GET Anrop/ajax anarop, returerar promise objekt som fullbordas med response objekt
//skickar en förfrågan till Pokemon API via fetch funktionen
const response = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
//om response inte är godkänd skickas en error i consolen
    if(!response.ok){
        throw new Error('Fungerar ej');
    }
//respons objekt, den hämtar bodyn i svaret i form av response.json, response.json returnerar ett promise objekt
//
/*const data lagrar resultatet av json data som hämtats från http anropet,
 await används för att stanna exekveringen tills responsen är slutförd*/
  const data =  await response.json();
 
/*extraherar info från data objektet som jag lagrar i konstanten karaktär
skriver ut elementet namnTitel + karaktär variabeln som skrivs ut
 i PokemonNamn h2 elementet*/
  const karaktär = data.name;
    pokemonNamn.textContent = namnTitel + karaktär;
    console.log(karaktär);
  

    

/*variabeln pokemonBild lagrar json data, som ska generera bild på sökande pokemon.
*/
    let pokemonBild = data.sprites.front_default;
    let bild = document.querySelector('.pokemon-bild');
    bild.src = pokemonBild;
    bild.style.display = "block";
    console.log(pokemonBild);

    /*här använder jag forEach för att få ut 
    strängen type, även om det bara finns en type*/
    data.types.forEach(type =>{
    const typ = type.type.name;
    pokemonTyp.textContent = typElement + typ;
    console.log(typ);
    });
   
    /*Itererar över abilities och skriver ut den extraherade datan*/
  data.abilities.forEach(ability =>{
   const förmåga = ability.ability.name;
   förmågor.textContent = förmågaElement + förmåga;
   console.log(förmåga);
  });





    }
 catch(Err){
console.error('fel uppstod', Err);
errorMeddelande.textContent = "Pokemon Existerar ej ";
//nedanstående kod innan throw new Error är inspirerad från Chat-Gpt med kommentaren och koden oförändrad
 // Clear previous Pokemon data if an error occurs
 //återställer vid catch Err alla html element med data till tomma strängar.
 pokemonNamn.textContent = "";
 document.querySelector('.pokemon-bild').src = "";
 pokemonTyp.textContent = "";
 förmågor.textContent = "";

throw new Error ('Pokemon existerar ej');


};



}
