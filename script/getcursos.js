$.support.cors = true;
//https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos
let pegarcurso = document.querySelector("#pegarcurso");
let cursos = document.querySelector("#curso");
let disciplinas = document.querySelector("#disciplina");


async function getCursos() {
  $(cursos).empty();

  const response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
  
  let data = await response.json();

  data = Object.keys(data).forEach((item) => {
    console.log(item);
    let option = document.createElement("option");
    option.setAttribute("value", item);
    option.innerText = data[item].nome
    cursos.appendChild(option);
  })
    
  getDisciplinas();
  
}
async function getDisciplinas() {
  $(disciplinas).empty();

  if (cursos.options.length != 0){
    let id = cursos.options[cursos.selectedIndex].value;
    let response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos/"+ id +".json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
  
    let data = await response.json();
    data = Object.keys(data.disciplinas).forEach((item) => {
      let option = document.createElement("option");
      option.setAttribute("value", item);
      option.innerText = data.disciplinas[item].nome;
      disciplinas.appendChild(option);
    });
      
    
  }
}

function loadRegimes(_id_disciplina){    
  console.log('loadRegimes');
  $.ajax({
      type:'GET',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI&orderBy="id_disciplina"&equalTo="'+_id_disciplina+'"',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },        
      success: function(data){                                    
          $('#tb_regimes').append(
              '<tr  class="tb_regimes_tr">'+
              '<td class="tb_regimes_td"><b class="paragrafo_regimes">Nome da Disciplina</b></td>'+ 
              '<td class="tb_regimes_td"><b class="paragrafo_regimes">Opções</b></td>'+                            
              '</tr>'
          );                   

          Object.keys(data).forEach(
              function(item){                                 
                  $('#tb_regimes').append(
                      '<tr class="tb_regimes_tr">'+
                      '<td class="tb_regimes_tr_td">'+data[item].disciplina+'</td>'+ 
                      '<td class="tb_regimes_tr_td"><button class="botao_regimes" id="'+item+'" onclick="ObterAlunosRegime('+"'"+item+"'"+')">Ver Alunos</button></td>'+
                      '<td class="tb_regimes_tr_td"><button class="botao_regimes" onclick="InscreverRegime()">Me Inscrever</button></td>'+
                      '</tr>'
                  );                        
              }
          )
      },
      error: function(data){
          console.log(data);            
      }
  })             
}





$(document).ready(
  getCursos()
);

$('#p_list_regimes').click(
  function (){
      var selectDisciplina = document.getElementById('disciplina'); 
      loadRegimes(selectDisciplina.options[selectDisciplina.selectedIndex].value);
  }    
)