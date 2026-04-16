const BASE_URL = 'https://superheroapi.com/api.php/';
const API_KEY = '9fe283d9374dc764c879de3efbf856fa';

var minhasCartas = [12, 33, 44]
var selecionada = 12;

window.onload = function(){
    this.getAndShowHero(getRandom);
}

function getRandom(){
    return Math.floor(Math.random() * 731) + 1;
}

function getAndShowHero(id){
    var url = BASE_URL + "/" + API_KEY + "/" + id;

    callAPI(url, function(status, data){
        let name = data.name;
        let intelligence = data.powerstats.intelligence;
        let strength = data.powerstats.strength;
        let speed = data.powerstats.speed;
        let durability = data.powerstats.durability;
        let power = data.powerstats.power;
        let combat = data.powerstats.combat;
        let image = data.image.url;

        document.getElementById("content").innerHTML += "<article> <img src='" + image + "'/>"+
        "<h1>" + name + "</h1>" +
        "<p>Intelligence: <span style='width:" + intelligence + "%; background-color: #F9B32F'></span></p>" +
        "<p>Strength:     <span style='width:" + strength + "%; background-color: #FF76CC'></span></p>" +
        "<p>Speed:        <span style='width:" + speed + "%; background-color: #22A7F0'></span></p>" +
        "<p>Durability:   <span style='width:" + durability + "%; background-color: #3EDC81'></span></p>" +
        "<p>Power:        <span style='width:" + power + "%; background-color: #AB69C6'></span></p>" +
        "<p>Combat:       <span style='width:" + combat + "%; background-color: #9CAAB9'></span></p>" +
        "</article>";
    });
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
