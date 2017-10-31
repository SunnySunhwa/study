(function () {
  let todos;
  const todoList = document.getElementById('todo-list');
  const input = document.getElementById('input-todo');

  const getTodos = function () {
    todos = [
      { id: 3, content: 'CSS', completed: false },
      { id: 2, content: 'Javascript', completed: true},
      { id: 1, content: 'HTML', completed: false }
    ];
  };

  const maxId = function () {
    return todos.length === 0 ?
      1 : Math.max.apply(null, todos.map(todo => todo.id)) + 1;
  };

  const toggle = function (id) {
    todos.forEach(todo => {
      todo.completed = todo.id === id ? !todo.completed : todo.completed;
    });
  };

  const addTodo = function () {
    return [{ id: maxId(), content: input.value, completed: false }, ...todos];
  };

  const removeTodo = function (id) {
    return todos.filter(todo => todo.id !== id);
  };

  const render = function () {
    let html = '';
    let checked;
    todos.forEach(todo => {
      checked = todo.completed ? 'checked' : '';
      html += `<li class="list-group-item">
  <div class="hover-anchor">
    <a class="hover-action text-muted">
      <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span>
    </a>
    <label class="i-checks" for="${todo.id}">
      <input type="checkbox" id="${todo.id}" ${checked}>
      <i></i>
      <span>${todo.content}</span>
    </label>
  </div>
</li>`;
    });
    todoList.innerHTML = html;
  };

  window.addEventListener('load', function () {
    getTodos();
    render();
  });

  input.addEventListener('keyup', function (e) {
    if (this.value !== '' && e.keyCode === 13) {
      todos = addTodo();
      render();
      this.value = '';
    }
  });

  todoList.addEventListener('click', function (e) {
    if (e.target.nodeName === 'SPAN' &&
      e.target.parentNode.nodeName !== 'LABEL') {
      todos = removeTodo(+e.target.dataset.id);
      render();
    }
  });
}());
