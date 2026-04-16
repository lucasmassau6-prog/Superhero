const BaseURL = 'https://superheroapi.com/api/'+ '9fe283d9374dc764c879de3efbf856fa';

var url = BaseURL + "/69";

callAPI(url, function(status, response){
    console.log(response);
})
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