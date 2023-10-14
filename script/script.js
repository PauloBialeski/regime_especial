let ra =  document.querySelector("#ra")
let nome = document.querySelector("#nome")
let contato = document.querySelector("#contato")
let semestre =  document.querySelector("#semestre")
let periodo = document.querySelector("#periodo")
let form = document.querySelector("#form")

form.addEventListener("submit", function(event){
    event.preventDefault();

    let dados = {
        ra: ra.value,
        nome: nome.value,
        contato: contato.value,
        semestre: semestre.value,
        periodo: periodo.value
    };
        
})


var httpRequest;
if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

httpRequest.open('GET', 'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI', true);

httpRequest.setRequestHeader('Content-Type', 'application/json');
httpRequest.send(dados);