let ra =  document.querySelector("#ra")
let nome = document.querySelector("#nome")
let contato = document.querySelector("#contato")
let semestre =  document.querySelector("#semestre")
let periodo = document.querySelector("#periodo")
let form = document.querySelector("#form")
let data = new Date()

let dia = data.getDate();
let mes = data.getMonth() + 1;
let ano = data.getFullYear();
let dataAtual = `${ano}-${mes}-${dia}`;


function postDados(){
    form.addEventListener("submit", function(event){
        event.preventDefault();
    
        let dados = {
            registro_academico: ra.value,
            nome: nome.value,
            data: dataAtual,
            contato: contato.value,
            semestre: semestre.value,
            turno: periodo.value
        };
    
        fetch('https://regime-especial-default-rtdb.firebaseio.com/regimeespecial.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI', {
        method: 'POST',
        body: JSON.stringify(dados)
        })      
    })
}


