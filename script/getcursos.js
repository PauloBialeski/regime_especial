$.support.cors = true;
let cursos = document.querySelector("#curso");
let disciplinas = document.querySelector("#disciplina");

async function getCursos() {
  $(cursos).empty();

  const response = await fetch("https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/cursos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI");
  
  let data = await response.json();

  data = Object.keys(data).forEach((item) => {
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
                      '<div class="col-12 col-md-6 col-xl-4">'+
                          '<div class="card mb-3">'+
                              '<div class="card-body">'+
                                  '<h5 class="card-title mb-3 text-center">'+data[item].disciplina+'</h5>'+
                                  '<h6 class="card-subtitle mb-2 text-body-secondary" id="resp-'+item+'"></h6>'+
                                  '<h6 class="card-subtitle mb-1 text-body-secondary" id="contato-resp-'+item+'"></h6>'+
                                  '<h6 class="mb-3 text-body-secondary">Alunos cadastrados neste regime: '+Object.keys(data[item].alunos).length+'/10</h6>'+
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
                                      '<div class="btns-options">'+
                                        '<button class="card-link card-btn-finalizar col-6" data-bs-toggle="modal" data-bs-target="#finalizar-regime" onclick="finalizarRegime('+"'"+item+"'"+')">'+
                                          'Finalizar'+
                                        '</button>'+
                                        '<button class="card-link card-btn-insc col-6" data-bs-toggle="modal" data-bs-target="#increver-regime" onclick="inscreverRegime('+"'"+item+"'"+')">'+
                                          'Inscrever-se'+
                                        '</button>'+
                                      '</div>'+ 
                                  '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'
                      );
                    $('#regimes-pdf').append(
                      '<div id="regimes-pdf-'+item+'" class="hide">'+
                        '<h2 class="text-center">Regime Especial</h2>'+
                        '<h4 class="">'+data[item].curso+'</h4>'+
                        '<h5 class="">'+data[item].disciplina+'</h5>'+
                        '<table id="regimes-pdf-table-'+item+'" class="table table-striped">'+
                          '<tr>'+
                            '<th>RA</th>'+
                            '<th>Nome</th>'+
                            '<th>Contato</th>'+
                            '<th>Semestre</th>'+
                            '<th>Periodo</th>'+
                          '</tr>'+
                        '</table>'+
                      '</div>'
                    )
                  ObterAlunosRegime(item)                                           
                })
                if ($('#regimes').is(':empty')) {
                  $('#regimes').append(
                    '<h3 class="text-center">Não há regimes nesta disciplina.</h3>'+
                    '<p class="text-center">Clique em "Novo Regime" para criar um novo regime.</p>'
                  )
                }
          
        },
        error: function(data){
            console.log(data);            
        }
      })
               
}

function ObterAlunosRegime(_id_regime){
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
          $('#resp-'+_id_regime+'').html(
            '<em class="text-dark">Responsável</em>: '+Object.values(data.alunos)[0].nome
          )
          $('#contato-resp-'+_id_regime+'').html(
              '<em class="text-dark">Contato</em>: '+Object.values(data.alunos)[0].contato
          )


          Object.keys(data.alunos).forEach(
              function(item){          
                  $('#ul-alunos-'+_id_regime+'').append(
                      '<li class="list-group-item">'+data.alunos[item].nome+'</li>'                      
                  );
                  $('#regimes-pdf-table-'+_id_regime+'').append(
                      '<tr>'+
                        '<td>'+data.alunos[item].registro_academico+'</td>'+
                        '<td>'+data.alunos[item].nome+'</td>'+
                        '<td>'+data.alunos[item].contato+'</td>'+
                        '<td>'+data.alunos[item].semestre+'</td>'+
                        '<td>'+data.alunos[item].turno+'</td>'+
                      '</tr>'
                  )              
              })
      },
      error: function(data){
          console.log(data);            
      }
  })
    
}

function incluirRegime(_data){
  if($("#ra-novo-rgm").val() === ""){
    alert("Por favor, preencha seu registro academico!")
  }else if($("#nome-novo-rgm").val() === ""){
    alert("Por favor, preencha seu nome!")
  }else if($("#contato-novo-rgm").val() === ""){
    alert("Por favor, preencha seu contato!")
  }else if($("#semestre-novo-rgm").val() === ""){
    alert("Por favor, preencha seu semestre!")
  }else {
    $.ajax({
        type:'POST',
        url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
        contentType: "application/json",
        crossDomain: true,
        headers:{
        
        },
        data:JSON.stringify(_data) ,
        success: function(data){
              var id_regime = data.name;
              alert('Regime incluído com sucesso!');
              incluirAlunoRegime(id_regime);   
        },
        error: function(data){
            console.log(data);            
        }
    })
  }   
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
          alert('Aluno incluido no regime');
          console.log(data);
          location.reload();
      },
      error: function(data){
          console.log(data);            
      }

      
  })   
  
}

function inscreverRegime(__id_regime){
    $.ajax({
      type:'GET',
      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+__id_regime+'.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
      contentType: "application/json",
      crossDomain: true,
      headers:{
      
      },        
      success: function(data){
            if (Object.keys(data.alunos).length < 10) {   
              $('#insc-rgm').click(
                function () {
  
                  var selectTurno = document.getElementById('periodo-novo-rgm');
                  var turno = selectTurno.options[selectTurno.selectedIndex].text;
                  __data = {
                    "contato": document.getElementById('contato').value,
                    "data": new Date(),
                    "nome": document.getElementById('nome').value,
                    "registro_academico": document.getElementById('ra').value,
                    "semestre": document.getElementById('semestre').value,
                    "turno": turno
                  }
                  

                  if($("#ra").val() === ""){
                    alert("Por favor, preencha seu registro academico!")
                  }else if($("#nome").val() === ""){
                    alert("Por favor, preencha seu nome!")
                  }else if($("#contato").val() === ""){
                    alert("Por favor, preencha seu contato!")
                  }else if($("#semestre").val() === ""){
                    alert("Por favor, preencha seu semestre!")
                  }else {
                    $.ajax({
                      type:'POST',
                      url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+__id_regime+'/alunos.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
                      contentType: "application/json",
                      crossDomain: true,
                      headers:{
                      
                      },
                      data:JSON.stringify(__data) ,
                      success: function(data){
                          alert('Aluno incluido no regime');
                          console.log(data);
                          location.reload();    
                      },
                      error: function(data){
                          console.log(data);            
                      }
                    })
                  }
                }
              )
            }else{
              alert('Este regime atingiu o limite de alunos. Tente outro regime')
            }
      },
      error: function(data){
          console.log(data);            
      }
    })
    
}

function finalizarRegime(_id__regime) {
  $.ajax({
    type:'GET',
    url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+_id__regime+'.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
    contentType: "application/json",
    crossDomain: true,
    headers:{
    
    },        
    success: function(data){
        $('#final-rgm').click(
          function () {
            // VERIFICAÇÃO DE RA
            if($('#ra-finalizar').val() == Object.values(data.alunos)[0].registro_academico){
                  $.ajax({
                    type:'POST',
                    url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimesfinalizados.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
                    contentType: "application/json",
                    crossDomain: true,
                    headers:{
                    
                    },
                    data:JSON.stringify(data) ,
                    success: function(data){
                      alert('Regime Finalizado!')
                      // function gerarPDF() {
                      //   var $conteudo = document.querySelector('#regimes-pdf-'+_id__regime+'');

                      //   const options = {
                      //    margin: [10, 10, 10, 10],
                      //    filename: "meu-regime.pdf",
                      //    html2canvas: { scale: 2},
                      //    jsPDF: {unit: "mm", format: "a4", orientation: "portrait"},
                      //    pagebreak: { mode: 'avoid-all', before: '#page2el' }
                      //   };
                      
                      //   html2pdf().set(options).from($conteudo).save();
                      // }
                      // gerarPDF()
                      function imprimirDiv() {
                        $('#regimes-pdf-'+_id__regime+'').removeClass('hide')
                        window.print();
                      }
                      imprimirDiv()
                      function deleteRegime(){
                        $.ajax({
                          type:'DELETE',
                          url:'https://regime-especial-default-rtdb.firebaseio.com/regimeespecial/regimes/'+_id__regime+'.json?auth=wZhwSeRHtyRJnrabzlBBpbfoPplj7BtXZ4tFUgAI',
                          contentType: "application/json",
                          crossDomain: true,
                          headers:{
                          
                          },
                          success: function(data){
                              console.log(data);
                              location.reload();
                          },
                          error: function(data){
                              console.log(data);            
                          }    
                        })
                      }
                      deleteRegime();
                    },
                    error: function(data){
                        console.log(data);            
                    }    
                  })
            }else{
              alert("RA Inválido!")
            }
          })
        
    },
    error: function(data){
        console.log(data);            
    }
  })
}

$(document).ready(function(){
  getCursos();
  $('#ra').mask('000000');
  $('#contato').mask('(00) 00000-0000');
  $('#semestre').mask('00');
  $('#ra-novo-rgm').mask('000000');
  $('#contato-novo-rgm').mask('(00) 00000-0000');
  $('#semestre-novo-rgm').mask('00');
  $('#ra-finalizar').mask('000000');
}
  
  
);

$('.btn-nv-rgm').click(
  function (){
    $('.nv-rgm-curso-disc').empty();
    var selectCursos = document.querySelector('#curso'); 
    var selectDisciplina = document.querySelector('#disciplina');
    $('.nv-rgm-curso-disc').prepend(
      '<h6 class="nv-rgm-curso">'+selectCursos.options[selectCursos.selectedIndex].text+'</h6>'+
      '<p class="nv-rgm-disciplina">'+selectDisciplina.options[selectDisciplina.selectedIndex].text+'</p>'
    );
  }
)

$('#btn-insc-nv-rgm').click(
  function (){
      var selectCursos = document.querySelector('#curso'); 
      var selectDisciplina = document.querySelector('#disciplina');

      data = {
          "curso": selectCursos.options[selectCursos.selectedIndex].text,
          "id_curso" : selectCursos.options[selectCursos.selectedIndex].value,
          "data": new Date(),
          "disciplina": selectDisciplina.options[selectDisciplina.selectedIndex].text,
          "id_disciplina": selectDisciplina.options[selectDisciplina.selectedIndex].value,
          "realizado": false
      }

      incluirRegime(data);
  }
)
