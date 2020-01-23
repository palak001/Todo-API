$(document).ready(function(){
   
    //to get all todos
   $.getJSON('/api/todo')
   .then(disTodos)
  
   //to post new todos
   $("#todoInput").keypress(event => {
    if(event.which == 13){
       createTodo();
    } 
   });
   
   $(".list").on("click",'span', function(e){
        e.stopPropagation();
       removeTodo($(this).parent());
   });

   $(".list").on('click','li', function(){
        updateTodo($(this));
   });
});

function disTodos(todos){
    todos.forEach(function(todo){
        disTodo(todo);
    });
}

function disTodo(todo){
    var newTodo = $('<li class = "task">' + todo.name + '<span> X </span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo(){
    var usrInput = $('#todoInput').val();
    $.post('/api/todo',{name: usrInput})
    .then(function(newTodo){
        $('#todoInput').val("");
        disTodo(newTodo);
        // console.log(newTodo);
    })
    .catch(err => {console.log(err);});
}


function removeTodo(todo){
    var clickedId = todo.data('id');
    var removeUrl = "/api/todo/" + clickedId;
    $.ajax({
        method: 'DELETE',
        url: removeUrl
    })
    .then(message => {
        todo.remove();
    })
    .catch(err => {console.log(err);});
}

function updateTodo(todo){
    var updateUrl = "/api/todo/" + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method:"PUT",
        url : updateUrl,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass("done");
        todo.data('completed', isDone);
          
    });
}


