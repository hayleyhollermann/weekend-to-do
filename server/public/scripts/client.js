$(document).ready(onReady);

function onReady(){
    console.log('js and jq are ready');
    // set up event listeners
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
        // appends tasks to table
        $('#showTasks').append(`
          <tr data-id="${taskToDo.id}" data-status="${taskToDo.complete}">
          <td>${taskToDo.task}</td>
          <td class="checkBoxColumn">${checkIfComplete(taskToDo)}</td>
          <td class="deleteButtonColumn"><button class="delete">Delete</button></td>
        </tr>`
        )}
}

function checkIfComplete(object){
    // checks if complete to determine if box should be checked
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
        $('#taskInput').val('');
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
    let currentStatus = $(this).closest('tr').data().status;
    console.log(currentStatus);
    
    console.log(id);
    $.ajax({
      method: 'PUT',
      url: `/tasks/${id}`,
      data: {
          changeComplete: !currentStatus
      }
    }).then(function() {
      tasksToTable();
    })
  }