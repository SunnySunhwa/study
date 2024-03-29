(function(){
  let todos;
  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');

  const getTodo = function(){
    todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }];
    console.log('[get]\n', todos);
  };
  
  const render = function () {
    let html = '';

    todos.forEach(({ id, content, completed }) => {
      const checked = completed ? 'checked' : '';
      html += `<li class="list-group-item"> 
        <div class="hover-anchor"> 
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}"></span>
          </a>
          <label class="i-checks" for="${id}">
            <input type="checkbox" id="${id}" ${checked}><i></i>
            <span>${content}</span>
          </label>
        </div>
      </li>`;
    });
    todoList.innerHTML = html;
  };
  
  const toggle = function (id) {
    todos = todos.map(todo => (todo.id === (+id) ?
      Object.assign({}, todo, { completed: !todo.completed }) : todo));
    console.log('[toggle]\n', todos);
  };
  
  const addTodo = function(){
    const content = inputTodo.value;
    inputTodo.value = '';
    if (!todos) { todos = [{ id: 1, content, completed: false }]
    } else { todos = [{id: maxID(), content, completed: false}, ...todos]}
    render();
    console.log('[addTodo]\n', todos);
  };

  const maxID = function(){
    return todos ? Math.max(...todos.map(({id}) => id)) + 1 : 1;
  };

  const removeTodo = function(id){
    todos = todos.filter(todo => todo.id !== (+id));
    render();
    console.log('[removedTodo]\n', todos);
  };


  window.addEventListener('load', function(){
    getTodo();
    render();
  });

  inputTodo.addEventListener('keyup', (e) => {
    if(inputTodo.value !== '' && e.keyCode === 13){
      addTodo();
    };
  });

  todoList.addEventListener('change', (e) => {
    toggle(e.target.id);
    render();
  });


  todoList.addEventListener('click', (e) => {
    if(e.target.nodeName !== 'SPAN'|| e.target.parentNode === 'LABEL') return;
    removeTodo(e.target.dataset.id);
  });
}());