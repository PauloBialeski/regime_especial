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
// async function getDisciplinas() {
//   const response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos/"+ cursoid +"disciplinas.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
  
//   let data = await response.json();

//   console.log(data);
// }

getCursos();