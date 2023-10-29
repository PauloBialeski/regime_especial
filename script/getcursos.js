//https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos
let pegarcurso = document.querySelector("#pegarcurso");
let cursos = document.querySelector("#curso");
let disciplinas = document.querySelector("#disciplina");


async function getCursos() {
  const response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");

  
  let data = await response.json();



  data = Object.keys(data).map((array) => data[array]).map((curso) => {
    let option = document.createElement("option");
    option.setAttribute("value", `C${cursos.length}`);
    option.innerText = curso.nome
    cursos.appendChild(option);
  });

  
}
async function getDisciplinas() {
  

  let response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
  
  let data = await response.json();
  for(var id in data){

    let urlDisc = "https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos/"+ id +"/disciplinas.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI"

    let response = await fetch(urlDisc);
    let urlDiscData = await response.json();
    urlDiscData = Object.keys(urlDiscData).map((array) => urlDiscData[array]).map((disciplina) => {
      let option = document.createElement("option");
      option.setAttribute("value", `C${disciplinas.length}`);
      option.innerText = disciplina.nome
      disciplinas.appendChild(option);
    });
  }

}
getCursos();
getDisciplinas();