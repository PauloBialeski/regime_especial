$.support.cors = true;
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
  loadRegimes(disciplinas.options[disciplinas.selectedIndex].value);
}

function loadRegimes(_id_disciplina){    
  _id_disciplina = disciplinas.options[disciplinas.selectedIndex].value;
  $('#regimes').empty();
  $.ajax({
      type:'GET',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI&orderBy="id_disciplina"&equalTo="'+_id_disciplina+'"',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },        
      success: function(data){
          Object.keys(data).forEach(
              function(item){                                
                  $('#regimes').append(
                    '<div class="col-4">'+
                        '<div class="card mb-3">'+
                            '<div class="card-body">'+
                              '<h5 class="card-title mb-3 text-center">'+data[item].disciplina+'</h5>'+
                              '<h6 class="card-subtitle mb-3 text-body-secondary">Responsavel: Gilberto Junior</h6>'+
                              '<div id="content-alunos">'+

                                '<div class="collapse" id="collapse-'+item+'">'+
                                  '<ul id="ul-alunos-'+item+'" class="list-group list-group-flush">'+
                                  '</ul>'+
                                '</div>'+                                                     
                              '</div>'+

                              '<div class="card-links">'+
                                    '<button class="card-link card-btn" id="btn-arrow-'+item+'" data-bs-toggle="collapse" data-bs-target="#collapse-'+item+'" aria-expanded="false" aria-controls="collapseExample" id="'+item+'">'+
                                      '<ion-icon name="chevron-down-outline"></ion-icon>'+
                                    '</button>'+
                                    '<button class="card-link card-btn" data-bs-toggle="modal" data-bs-target="#increver-regime" onclick="inscreverRegime('+item+')">'+
                                      '<ion-icon name="add-outline"></ion-icon>'+
                                    '</button>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                    '</div>'
                  );
                ObterAlunosRegime(item)                                           
              }
          )
        
      },
      error: function(data){
          console.log(data);            
      }
  })             
}

function ObterAlunosRegime(_id_regime){
  console.log("Obter Alunos do Regime");
  $('#btn-arrow-'+_id_regime+'').click(
    function () {
      $('#btn-arrow-'+_id_regime+'').toggleClass('btn-rotate');
    }  
  );
  $.ajax({
      type:'GET',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+_id_regime+'.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },        
      success: function(data){   
          $('#collapse-'+_id_regime+'').prepend(
              '<h6 class="card-text">Alunos cadastrados neste regime: '+Object.keys(data.alunos).length+'/10</h6>'
          );
          
          Object.keys(data.alunos).forEach(
              function(item){         
                  
                  $('#ul-alunos-'+_id_regime+'').append(
                      '<li class="list-group-item">'+data.alunos[item].nome+'</li>'                      
                  );                         
              }
          )    
      },
      error: function(data){
          console.log(data);            
      }
  })  
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

  var selectTurno = document.getElementById('periodo-novo-rgm');
  var turno = selectTurno.options[selectTurno.selectedIndex].text;

  _data = {
      "contato": document.getElementById('contato-novo-rgm').value,
      "data": new Date(),
      "nome": document.getElementById('nome-novo-rgm').value,
      "registro_academico": document.getElementById('ra-novo-rgm').value,
      "semestre": document.getElementById('semestre-novo-rgm').value,
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

$('#btn-insc-nv-rgm').click(
  function (){
      console.log('Novo Regime');
      
      var selectCursos = document.querySelector('#curso'); 
      var selectDisciplina = document.querySelector('#disciplina');
      console.log(selectCursos);
      console.log(selectDisciplina);

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