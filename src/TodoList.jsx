import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
  });

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-5 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTask}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => handleFilterChange('all')}
            className={`p-2 mx-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('incomplete')}
            className={`p-2 mx-1 rounded ${filter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Incomplete
          </button>
          <button
            onClick={() => handleFilterChange('completed')}
            className={`p-2 mx-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Completed
          </button>
        </div>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
                className="mr-2"
              />
              <span
                className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="p-1 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
