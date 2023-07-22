import React, { useState, useEffect, useRef } from 'react';


function Tasks(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='Task'>
      {props.edit ? (
        <>
          <input
            placeholder='Update task'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='updateTasks'
          />
          <button onClick={handleSubmit} className='updateTask'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='New Task'
            value={input}
            onChange={handleChange}
            name='text'
            className='addTasks'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='addTask'>
            Add Task
          </button>
        </>
      )}
    </form>
  );
}

export default Tasks;




