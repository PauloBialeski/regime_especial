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
                console.log(item);                            
                  $('#regimes').append(
                    '<div class="col-4">'+
                        '<div class="card mb-3">'+
                            '<div class="card-body">'+
                              '<h5 class="card-title mb-3 text-center">'+data[item].disciplina+'</h5>'+
                              '<h6 class="card-subtitle mb-3 text-body-secondary">Responsavel: Gilberto Junior</h6>'+
                              '<div id="content-alunos">'+
                              '<ul id="ul-alunos" class="list-group list-group-flush">'+                        
                              '</ul>'+                             
                              '</div>'+

                              '<div class="card-links">'+
                                    '<button class="card-link card-btn back-btn" id="'+item+'" onclick="ObterAlunosRegime('+"'"+item+"'"+')">'+
                                    '<svg xmlns="http://www.w3.org/2000/svg" color="#33A457" width="30" height="30" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">'+
                                      '<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>'+
                                    '</svg>'+
                                    '</button>'+
                                    '<button class="card-link card-btn" data-bs-toggle="modal" data-bs-target="#increver-regime" onclick="inscreverRegime('+item+')">'+
                                        '<svg xmlns="http://www.w3.org/2000/svg" color="#33A457" width="30" height="30" fill="currentColor" class="bi bi-patch-plus-fill" viewBox="0 0 16 16">'+
                                            '<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>'+
                                        '</svg>'+
                                    '</button>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                    '</div>'
                  );                        
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

  $.ajax({
      type:'GET',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+_id_regime+'.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },        
      success: function(data){   
          $('#content-alunos').prepend(
              '<h6 class="card-text">Alunos cadastrados neste regime: '+Object.keys(data.alunos).length+'/10</h6>'
          );
          
          Object.keys(data.alunos).forEach(
              function(item){         
                  
                  $('#ul-alunos').append(
                      '<li class="list-group-item">'+data.alunos[item].nome+'</li>'                      
                  );                        
              }
          )
        $('.back-btn').replaceWith(
          '<button class="card-link card-btn back-btn back-alunos" id="'+_id_regime+'" onclick="backAlunos('+"'"+_id_regime+"'"+')">'+
            '<svg xmlns="http://www.w3.org/2000/svg" color="#33A457" width="30" height="30" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">'+
              '<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>'+
            '</svg>'+
          '</button>'
        );
      },
      error: function(data){
          console.log(data);            
      }
  })  
}


function backAlunos(__id_regime){
  console.log("Back Alunos");
    $('#content-alunos').empty();
    $('#'+__id_regime+'').replaceWith(
      '<button class="card-link card-btn back-btn" id="'+__id_regime+'" onclick="ObterAlunosRegime('+"'"+__id_regime+"'"+')">'+
        '<svg xmlns="http://www.w3.org/2000/svg" color="#33A457" width="30" height="30" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">'+
          '<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>'+
        '</svg>'+
      '</button>'
    )
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