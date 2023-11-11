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
          let tb_regimes_tr = document.querySelector('.tb_regimes_tr')                                
          tb_regimes_tr.classList.remove('hidden-class');               

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

function loadForms(){
  let botaoinscrever = document.querySelector('#bt_inscrever')
  botaoinscrever.classList.add('hidden-class')
  let section = document.querySelector("#section_form")
  section.classList.remove('hidden-class')
}

function incluirRegime(_data){
  $.ajax({
      type:'POST',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },
      data:JSON.stringify(_data) ,
      success: function(data){
          alert('Regime incluído com sucesso!');
                  
          var id_regime = data.name;

          console.log(id_regime);
          
          incluirAlunoRegime(id_regime);
      },
      error: function(data){
          console.log(data);            
      }
  })   
}

function incluirAlunoRegime(id_regime){

  var selectTurno = document.getElementById('periodo');
  var turno = selectTurno.options[selectTurno.selectedIndex].text;

  _data = {
      "contato": document.getElementById('contato').value,
      "data": new Date(),
      "nome": document.getElementById('nome').value,
      "registro_academico": document.getElementById('ra').value,
      "semestre": document.getElementById('semestre').value,
      "turno": turno
  }

  console.log(_data);

  $.ajax({
      type:'POST',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+id_regime+'/alunos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },
      data:JSON.stringify(_data) ,
      success: function(data){
          alert('aluno incluido no regime');
          console.log(data);
          location.reload();
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

$('#enviar_botao').click(
  function (){
      console.log('Novo Regime');
      
      var selectCursos = document.getElementById('curso'); 
      var selectDisciplina = document.getElementById('disciplina'); 

      data = {
          "curso": selectCursos.options[selectCursos.selectedIndex].text,
          "id_curso" : selectCursos.options[selectCursos.selectedIndex].value,
          "data": new Date(),
          "disciplina": selectDisciplina.options[selectDisciplina.selectedIndex].text,
          "id_disciplina": selectDisciplina.options[selectDisciplina.selectedIndex].value,
          "realizado": false
      }

      console.log(data);

      incluirRegime(data);
  }
)