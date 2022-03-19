import { useRef, useState, useCallback, useEffect } from 'react';

import { fetchAuthAPI } from '../utils/api';

function Todos({ auth }) {
  const input = useRef();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const response = await fetchAuthAPI('/api/todos', auth);
    setTodos(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>

  return (
    <ul>
      <li>
        <input ref={input} placeholder='New todo' />
        <button onClick={async () => {
          setLoading(true);
          await fetchAuthAPI('/api/todos', auth, {
            method: 'POST',
            body: JSON.stringify({
              data: {
                content: input.current.value,
                completed: false,
              },
            }),
          });
          fetchTodos();
        }}>
          Create
        </button>
      </li>
      { todos.map(todo => <li key={todo.id}>
        <input type='checkbox' checked={todo.attributes.completed} onChange={async event => {
          setLoading(true);
          await fetchAuthAPI(`/api/todos/${todo.id}`, auth, {
            method: 'PUT',
            body: JSON.stringify({
              data: {
                completed: event.target.checked,
              },
            }),
          });

          fetchTodos();
        }} />
        { todo.attributes.content }
        { todo.attributes.completed && <button onClick={async () => {
          setLoading(true);
          await fetchAuthAPI(`/api/todos/${todo.id}`, auth, {
            method: 'DELETE',
          });

          fetchTodos();
        }}>
          🗑️
        </button> }
      </li>) }
    </ul>
  );
}

export default Todos;
