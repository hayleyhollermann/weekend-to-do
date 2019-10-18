$(document).ready(onReady);

function onReady(){
    console.log('js and jq are ready');
    $('#submitButton').on('click', addNewTask);
    tasksToTable();
}

function loopTasks(array){
    console.log('in loop');
    $('#showTasks').empty();
    for (taskToDo of array){
        $('#showTasks').append(`
          <tr data-id="${taskToDo.id}">
          <td>${taskToDo.task}</td>
          <td>${taskToDo.complete}</td>
          <td><button class="delete">Delete</button></td>
        </tr>`
        )}
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