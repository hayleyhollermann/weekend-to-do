$(document).ready(onReady);

function onReady(){
    console.log('js and jq are ready');
    $('#submitButton').on('click', addNewTask);
    $('#showTasks').on('click', '.delete', handleDelete);
    $('#showTasks').on('click', '.completeInput', handleCheckbox);
    $('#showTasks').on('click', '.notCompleteInput', handleCheckbox);
    tasksToTable();
}


function loopTasks(array){
    console.log('in loop');
    $('#showTasks').empty();
    for (taskToDo of array){
        $('#showTasks').append(`
          <tr data-id="${taskToDo.id}">
          <td>${taskToDo.task}</td>
          <td>${checkIfComplete(taskToDo)}</td>
          <td><button class="delete">Delete</button></td>
        </tr>`
        )}
}

function checkIfComplete(object){
    if (object.complete){
        return `<input type="checkbox" class="completeInput" checked>`; 
    }
    else {
        return `<input type="checkbox" class="notCompleteInput">`;
    }
}

// GET
function tasksToTable(){
    console.log('getting tasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
      }).then(function(response){
        loopTasks(response);
      })
}

// POST
function addNewTask(){
    console.log('adding task')
    let taskToSend = {
        task: $('#taskInput').val(),
      };
      $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
          task: taskToSend.task
        }
      }).then(function(){
        tasksToTable();
      })
};

// DELETE 
function handleDelete(){
    console.log('delete!!');
    let id = $(this).closest('tr').data().id;
    console.log(id);
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${id}`
    }).then(function() {
      tasksToTable();
    })
  }

  // PUT 
  function handleCheckbox(){
    console.log('changing checkbox!');

    let id = $(this).closest('tr').data().id;
    console.log(id);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${id}`
    }).then(function() {
      tasksToTable();
    })
  }