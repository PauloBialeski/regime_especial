//https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos
let pegarcurso = document.querySelector("#pegarcurso")
// let xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
//   xhttp.send();

function getCursos() {
  fetch('https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI', {
    method: 'GET',
    headers: {

    }
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

