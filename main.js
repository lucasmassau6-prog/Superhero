const BASE_URL = 'https://superheroapi.com/api.php/';
const API_KEY = '9fe283d9374dc764c879de3efbf856fa';

window.onload = function(){
    startBattle();
}

// gera ID aleatório
function getRandom(){
    return Math.floor(Math.random() * 731) + 1;
}

// inicia a batalha
function startBattle(){
    document.getElementById("content").innerHTML = "";

    let id1 = getRandom();
    let id2 = getRandom();

    getAndCompareHeroes(id1, id2);
}

// busca os dois heróis
function getAndCompareHeroes(id1, id2){
    let hero1, hero2;

    let url1 = BASE_URL + "/" + API_KEY + "/" + id1;
    let url2 = BASE_URL + "/" + API_KEY + "/" + id2;

    callAPI(url1, function(status, data1){
        hero1 = data1;

        callAPI(url2, function(status, data2){
            hero2 = data2;

            showBattle(hero1, hero2);
        });
    });
}

// soma os poderes
function getTotalPower(hero){
    let stats = hero.powerstats;

    return Number(stats.intelligence) +
           Number(stats.strength) +
           Number(stats.speed) +
           Number(stats.durability) +
           Number(stats.power) +
           Number(stats.combat);
}

// mostra batalha e vencedor
function showBattle(hero1, hero2){
    let total1 = getTotalPower(hero1);
    let total2 = getTotalPower(hero2);

    let winner;

    if(total1 > total2){
        winner = hero1.name;
    } else if(total2 > total1){
        winner = hero2.name;
    } else {
        winner = "Empate!";
    }

    // mostra os dois heróis
    showHero(hero1);
    showHero(hero2);

    // mostra vencedor
    document.getElementById("content").innerHTML += 
        "<h2>Vencedor: " + winner + "</h2>";
}

// exibe o herói na tela
function showHero(data){
    console.log(data.image.url);
    let name = data.name;
    let intelligence = data.powerstats.intelligence;
    let strength = data.powerstats.strength;
    let speed = data.powerstats.speed;
    let durability = data.powerstats.durability;
    let power = data.powerstats.power;
    let combat = data.powerstats.combat;
    let image = data.image.url;

    document.getElementById("content").innerHTML += 
        "<article> <img src='" + image + "'/>"+
        "<h1>" + name + "</h1>" +
        "<p>Intelligence: <span style='display:inline-block; width:" + intelligence + "%; background-color: #F9B32F'>&nbsp;</span></p>" +
        "<p>Strength:     <span style='display:inline-block; width:" + strength + "%; background-color: #FF76CC'>&nbsp;</span></p>" +
        "<p>Speed:        <span style='display:inline-block; width:" + speed + "%; background-color: #22A7F0'>&nbsp;</span></p>" +
        "<p>Durability:   <span style='display:inline-block; width:" + durability + "%; background-color: #3EDC81'>&nbsp;</span></p>" +
        "<p>Power:        <span style='display:inline-block; width:" + power + "%; background-color: #AB69C6'>&nbsp;</span></p>" +
        "<p>Combat:       <span style='display:inline-block; width:" + combat + "%; background-color: #9CAAB9'>&nbsp;</span></p>" +
        "</article>";
}

function callAPI(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(xhr.status, xhr.response);
        } else {
            alert("Problemas ao conectar com o servidor.");
        }
    }
    xhr.send();
}
