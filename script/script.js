let ra = document.querySelector("#ra");
let nome = document.querySelector("#nome");
let semestre = document.querySelector("#semestre");
let periodo = document.querySelector("#periodo");
let form = document.querySelector("#form")

form.addEventListener("submit", function(event){
    event.preventDefault();

    let dados = {
        ra: ra.value,
        nome: nome.value,
        semestre: semestre.value,
        periodo: periodo.value
    };

    fetch('https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI', {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        alert("Suas informações foram enviadas!")
    })
})

